import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar/Sidebar'
import Triage from './pages/Triage'
import DocQA from './pages/DocQA'
import TestGen from './pages/TestGen'
import IngestPanel from './components/Ingestion/IngestPanel'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e2130', color: '#e2e8f0', border: '1px solid #2a2d3e' } }} />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-[#0f1117]">
          <Routes>
            <Route path="/" element={<Navigate to="/triage" replace />} />
            <Route path="/triage" element={<Triage />} />
            <Route path="/docqa" element={<DocQA />} />
            <Route path="/testgen" element={<TestGen />} />
            <Route path="/ingest" element={<div className="overflow-y-auto h-full"><IngestPanel /></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}