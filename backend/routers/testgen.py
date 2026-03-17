import json
from fastapi import APIRouter
from models.schemas import TestGenRequest, TestGenResponse
from services.llm import generate
from services.prompts import testgen_prompt

router = APIRouter()

@router.post("/", response_model=TestGenResponse)
async def generate_tests(req: TestGenRequest):
    prompt = testgen_prompt(req.requirements)
    raw = generate(prompt)

    try:
        clean = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        test_cases = json.loads(clean)
    except Exception:
        test_cases = []

    return TestGenResponse(test_cases=test_cases, raw=raw)