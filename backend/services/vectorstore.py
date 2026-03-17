import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings
from google import genai

load_dotenv()

CHROMA_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

EMBED_MODEL = "models/gemini-embedding-001"

class GeminiEmbeddings(Embeddings):
    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        all_embeddings = []
        for text in texts:
            result = client.models.embed_content(
                model=EMBED_MODEL,
                contents=text
            )
            all_embeddings.append(result.embeddings[0].values)
        return all_embeddings

    def embed_query(self, text: str) -> list[float]:
        result = client.models.embed_content(
            model=EMBED_MODEL,
            contents=text
        )
        return result.embeddings[0].values

def get_vectorstore():
    return Chroma(
        persist_directory=CHROMA_DIR,
        embedding_function=GeminiEmbeddings()
    )

def add_documents(chunks: list[str], metadata: dict):
    db = get_vectorstore()
    docs = [Document(page_content=chunk, metadata=metadata) for chunk in chunks]
    db.add_documents(docs)

def retrieve(query: str, k: int = 4) -> tuple[list[str], list[str]]:
    try:
        db = get_vectorstore()
        results = db.similarity_search(query, k=k)
        texts = [r.page_content for r in results]
        sources = list(set([r.metadata.get("filename", "unknown") for r in results]))
        return texts, sources
    except Exception:
        return [], []