export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? 'bg-indigo-600 text-white rounded-br-sm'
            : 'bg-[#1e2130] text-slate-200 rounded-bl-sm border border-[#2a2d3e]'}`}
      >
        {message.content}
        {message.sources?.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[#2a2d3e]">
            <p className="text-xs text-slate-500">📎 Sources:</p>
            {message.sources.map((s, i) => (
              <p key={i} className="text-xs text-indigo-400 truncate">{s}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}