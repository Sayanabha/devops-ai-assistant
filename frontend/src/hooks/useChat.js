import { useState } from 'react'
import { sendChat } from '../api'

export function useChat(mode) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const send = async (text) => {
    if (!text.trim()) return

    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await sendChat(text, mode)
      const botMsg = {
        role: 'assistant',
        content: res.data.response,
        sources: res.data.sources || [],
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '❌ Error: ' + (err.response?.data?.detail || err.message) },
      ])
    } finally {
      setLoading(false)
    }
  }

  const clear = () => setMessages([])

  return { messages, loading, send, clear }
}