import ChatWindow from '../components/Chat/ChatWindow'
import { useChat } from '../hooks/useChat'

export default function Triage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-semibold text-white">🔍 Log Triage</h2>
        <p className="text-sm text-slate-500">Paste a pipeline log or error. Get root cause + fix.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatWindow
          mode="triage"
          placeholder="Paste a CI/CD log or error message..."
          useChat={useChat}
        />
      </div>
    </div>
  )
}