# ⚙️ DevOps AI Assistant

An AI-powered web app that triages pipeline logs, answers questions about your runbooks, and generates test cases from plain English requirements. Built with FastAPI, React, and Gemini 2.5 Flash.

No more staring at 500 lines of logs at 2am wondering what went wrong.

---

## What It Does

**Log Triage** — Paste a broken CI/CD log. Get back the root cause, affected component, severity level, and a suggested fix. Powered by RAG so it can reference your own runbooks while diagnosing.

**Document Q&A** — Upload your runbooks, SOPs, or any internal docs. Ask questions in plain English. Get answers grounded in your actual documentation, not generic internet knowledge.

**Test Case Generator** — Paste plain text requirements. Get back structured, ready-to-use test cases with steps, preconditions, priorities, and expected results. JSON format, no fluff.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite, TailwindCSS |
| Backend | FastAPI (Python 3.11+) |
| LLM | Gemini 2.5 Flash |
| Embeddings | Gemini Embedding API (`models/gemini-embedding-001`) |
| Vector DB | ChromaDB (local, persistent) |
| Chat History | SQLite via SQLAlchemy |
| Doc Parsing | PyPDF2, python-docx, BeautifulSoup4 |

The core architecture is RAG (Retrieval Augmented Generation). Your documents get chunked, embedded, and stored in ChromaDB. When you ask a question, the most relevant chunks get retrieved and handed to Gemini as context. This is why it answers from YOUR docs instead of making things up.

---

## Project Structure

```
devops-ai-assistant/
├── backend/
│   ├── main.py                 # FastAPI entry point
│   ├── .env                    # API keys and config (not committed)
│   ├── routers/
│   │   ├── chat.py             # /api/chat
│   │   ├── ingest.py           # /api/ingest
│   │   └── testgen.py          # /api/testgen
│   ├── services/
│   │   ├── llm.py              # Gemini 2.5 Flash client
│   │   ├── vectorstore.py      # ChromaDB + custom embeddings
│   │   ├── ingestion.py        # PDF / TXT / URL / paste parsers
│   │   └── prompts.py          # All prompt templates
│   ├── models/
│   │   └── schemas.py          # Pydantic request/response models
│   └── db/
│       └── sqlite.py           # Chat history persistence
└── frontend/
    └── src/
        ├── api/                # Axios API calls
        ├── hooks/              # useChat hook
        ├── components/         # Chat, Sidebar, Ingestion UI
        └── pages/              # Triage, DocQA, TestGen pages
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/devops-ai-assistant.git
cd devops-ai-assistant
```

### 2. Backend setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
CHROMA_PERSIST_DIR=./chroma_db
SQLITE_DB_PATH=./chat_history.db
```

Start the backend:

```bash
uvicorn main:app --reload --port 8000
```

API docs available at `http://localhost:8000/docs`

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## How to Use It

### Ingest your docs first

Go to **Ingest Docs** in the sidebar. You can:
- Upload a PDF or TXT file
- Paste raw text (logs, runbooks, requirements)
- Scrape a URL

Tag each document with a type: `runbook`, `log`, or `requirement`.

### Then use the chat modes

**Log Triage** works best when you paste raw pipeline output. The longer and messier the log, the better it performs.

**Doc Q&A** only knows what you've ingested. If you haven't uploaded anything yet, it will say so honestly.

**Test Gen** does not need ingested docs. Just paste requirements directly into the text box and hit generate.

---

## How RAG Works (the short version)

```
Your document
     → chunked into ~800 char pieces
     → each chunk embedded into a vector (768 numbers)
     → stored in ChromaDB on disk

Your question
     → embedded into a vector
     → ChromaDB finds the 4 most similar chunks
     → chunks + question sent to Gemini as context
     → Gemini answers based on your actual documents
```

This is the same pattern used by GitHub Copilot Chat, Notion AI, and most enterprise AI assistants. The difference here is you own the whole stack.

---

## Sample Inputs to Try

**Log Triage:**
```
ERROR 2024-03-15 14:23:11 [Pipeline: deploy-prod] Stage: Docker Build FAILED
npm ERR! code ECONNREFUSED
npm ERR! network request to https://registry.npmjs.org/react failed
npm ERR! network This is a problem related to network connectivity.
Error: Process completed with exit code 1
```

**Test Gen:**
```
Users must register with a valid email and password of at least 8 characters.
Login should fail after 3 consecutive incorrect attempts and lock the account for 15 minutes.
Authenticated sessions must expire after 24 hours of inactivity.
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google AI Studio API key |
| `CHROMA_PERSIST_DIR` | Where ChromaDB stores vectors on disk |
| `SQLITE_DB_PATH` | Where chat history is saved |

---

## What's Not Included (yet)

- Docker Compose setup
- Streaming responses
- Auth / multi-user support
- Export test cases to CSV or PDF
- Ingestion history / document management UI

PRs welcome.

---

## License

MIT