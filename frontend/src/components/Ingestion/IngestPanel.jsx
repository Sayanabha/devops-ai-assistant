import { useState } from 'react'
import { ingestFile, ingestURL, ingestPaste } from '../../api'
import toast from 'react-hot-toast'
import { Upload, Link, ClipboardPaste } from 'lucide-react'

const DOC_TYPES = ['runbook', 'log', 'requirement']

export default function IngestPanel() {
  const [tab, setTab] = useState('file')
  const [docType, setDocType] = useState('runbook')
  const [url, setUrl] = useState('')
  const [paste, setPaste] = useState('')
  const [pasteName, setPasteName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    try {
      const res = await ingestFile(file, docType)
      toast.success(res.data.message)
    } catch {
      toast.error('File ingestion failed')
    } finally {
      setLoading(false)
    }
  }

  const handleURL = async () => {
    if (!url.trim()) return
    setLoading(true)
    try {
      const res = await ingestURL(url, docType)
      toast.success(res.data.message)
      setUrl('')
    } catch {
      toast.error('URL ingestion failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = async () => {
    if (!paste.trim() || !pasteName.trim()) return
    setLoading(true)
    try {
      const res = await ingestPaste(paste, pasteName, docType)
      toast.success(res.data.message)
      setPaste('')
      setPasteName('')
    } catch {
      toast.error('Paste ingestion failed')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'file', label: 'File Upload', icon: Upload },
    { id: 'url', label: 'URL', icon: Link },
    { id: 'paste', label: 'Paste Text', icon: ClipboardPaste },
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-white mb-1">Ingest Documents</h2>
      <p className="text-sm text-slate-500 mb-6">Add logs, runbooks, or requirements to the knowledge base.</p>

      {/* Doc Type */}
      <div className="mb-6">
        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Document Type</label>
        <div className="flex gap-2">
          {DOC_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setDocType(t)}
              className={`px-4 py-1.5 rounded-lg text-sm capitalize transition-colors
                ${docType === t ? 'bg-indigo-600 text-white' : 'bg-[#1e2130] text-slate-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors
              ${tab === id ? 'bg-[#1e2130] text-white border border-indigo-500' : 'text-slate-500 hover:text-white'}`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* File Upload */}
      {tab === 'file' && (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#2a2d3e] rounded-xl cursor-pointer hover:border-indigo-500 transition-colors">
          <Upload size={24} className="text-slate-500 mb-2" />
          <p className="text-sm text-slate-400">Click to upload PDF or TXT</p>
          <p className="text-xs text-slate-600 mt-1">Max 10MB</p>
          <input type="file" accept=".pdf,.txt,.docx" className="hidden" onChange={handleFile} disabled={loading} />
        </label>
      )}

      {/* URL */}
      {tab === 'url' && (
        <div className="flex gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-runbook-url.com"
            className="flex-1 bg-[#1e2130] border border-[#2a2d3e] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleURL}
            disabled={loading || !url.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-5 py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? 'Ingesting...' : 'Ingest'}
          </button>
        </div>
      )}

      {/* Paste */}
      {tab === 'paste' && (
        <div className="flex flex-col gap-3">
          <input
            value={pasteName}
            onChange={(e) => setPasteName(e.target.value)}
            placeholder="Document name (e.g. deploy-runbook)"
            className="bg-[#1e2130] border border-[#2a2d3e] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          />
          <textarea
            rows={6}
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder="Paste your log, runbook, or requirement here..."
            className="bg-[#1e2130] border border-[#2a2d3e] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handlePaste}
            disabled={loading || !paste.trim() || !pasteName.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-5 py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? 'Ingesting...' : 'Ingest Text'}
          </button>
        </div>
      )}
    </div>
  )
}