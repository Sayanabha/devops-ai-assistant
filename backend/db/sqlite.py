import os
from sqlalchemy import create_engine, Column, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

DB_PATH = os.getenv("SQLITE_DB_PATH", "./chat_history.db")
engine = create_engine(f"sqlite:///{DB_PATH}")
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(String, primary_key=True)
    session_id = Column(String, index=True)
    role = Column(String)       # user | assistant
    content = Column(Text)
    mode = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(engine)

def save_message(session_id: str, role: str, content: str, mode: str):
    import uuid
    db = SessionLocal()
    msg = ChatMessage(
        id=str(uuid.uuid4()),
        session_id=session_id,
        role=role,
        content=content,
        mode=mode
    )
    db.add(msg)
    db.commit()
    db.close()

def get_history(session_id: str):
    db = SessionLocal()
    msgs = db.query(ChatMessage).filter_by(session_id=session_id).order_by(ChatMessage.created_at).all()
    db.close()
    return [{"role": m.role, "content": m.content} for m in msgs]