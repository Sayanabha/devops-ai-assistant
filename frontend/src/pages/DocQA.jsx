import ChatWindow from '../components/Chat/ChatWindow'
import { useChat } from '../hooks/useChat'

export default function DocQA() {
  return (
    <div className="flex flex-col h-screen">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-semibold text-white">📚 Document Q&A</h2>
        <p className="text-sm text-slate-500">Ask questions about ingested runbooks and knowledge base articles.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatWindow
          mode="docqa"
          placeholder="Ask about your runbooks or documentation..."
          useChat={useChat}
        />
      </div>
    </div>
  )
}