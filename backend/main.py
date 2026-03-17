from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, ingest, testgen
from db.sqlite import init_db

app = FastAPI(title="DevOps AI Assistant", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(ingest.router, prefix="/api/ingest", tags=["Ingest"])
app.include_router(testgen.router, prefix="/api/testgen", tags=["TestGen"])

@app.get("/")
def root():
    return {"status": "DevOps AI Assistant is running"}