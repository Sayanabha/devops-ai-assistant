from pydantic import BaseModel
from typing import Optional, List

class IngestURLRequest(BaseModel):
    url: str
    doc_type: str = "runbook"  # runbook | log | requirement

class PasteIngestRequest(BaseModel):
    content: str
    filename: str
    doc_type: str = "runbook"

class ChatRequest(BaseModel):
    message: str
    mode: str  # triage | docqa | testgen
    session_id: Optional[str] = "default"

class ChatResponse(BaseModel):
    response: str
    session_id: str
    sources: Optional[List[str]] = []

class TestGenRequest(BaseModel):
    requirements: str
    format: str = "json"  # json | markdown

class TestGenResponse(BaseModel):
    test_cases: list
    raw: str