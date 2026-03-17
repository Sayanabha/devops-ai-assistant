from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse
from services.vectorstore import retrieve
from services.llm import generate
from services.prompts import triage_prompt, docqa_prompt
from db.sqlite import save_message

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(req: ChatRequest):
    texts, sources = retrieve(req.message)
    context = "\n\n".join(texts)

    if req.mode == "triage":
        prompt = triage_prompt(req.message, context)
    else:
        prompt = docqa_prompt(req.message, context)

    response = generate(prompt)

    save_message(req.session_id, "user", req.message, req.mode)
    save_message(req.session_id, "assistant", response, req.mode)

    return ChatResponse(response=response, session_id=req.session_id, sources=sources)