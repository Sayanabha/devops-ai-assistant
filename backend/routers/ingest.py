from fastapi import APIRouter, UploadFile, File, Form
from models.schemas import IngestURLRequest, PasteIngestRequest
from services.ingestion import parse_pdf, parse_txt, parse_docx, parse_url, parse_paste, chunk_text
from services.vectorstore import add_documents

router = APIRouter()

@router.post("/file")
async def ingest_file(file: UploadFile = File(...), doc_type: str = Form("runbook")):
    content = await file.read()
    name = file.filename.lower()

    if name.endswith(".pdf"):
        text = parse_pdf(content)
    elif name.endswith(".docx"):
        text = parse_docx(content)
    else:
        text = parse_txt(content)

    chunks = chunk_text(text)
    add_documents(chunks, {"filename": file.filename, "doc_type": doc_type})
    return {"message": f"Ingested {len(chunks)} chunks from {file.filename}"}

@router.post("/url")
async def ingest_url(req: IngestURLRequest):
    text = parse_url(req.url)
    chunks = chunk_text(text)
    add_documents(chunks, {"filename": req.url, "doc_type": req.doc_type})
    return {"message": f"Ingested {len(chunks)} chunks from {req.url}"}

@router.post("/paste")
async def ingest_paste(req: PasteIngestRequest):
    text = parse_paste(req.content)
    chunks = chunk_text(text)
    add_documents(chunks, {"filename": req.filename, "doc_type": req.doc_type})
    return {"message": f"Ingested {len(chunks)} chunks from paste: {req.filename}"}