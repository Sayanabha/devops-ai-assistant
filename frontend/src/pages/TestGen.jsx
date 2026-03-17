import { useState } from 'react'
import { generateTests } from '../api'
import toast from 'react-hot-toast'
import { TestTube2 } from 'lucide-react'

export default function TestGen() {
  const [requirements, setRequirements] = useState('')
  const [testCases, setTestCases] = useState([])
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!requirements.trim()) return
    setLoading(true)
    try {
      const res = await generateTests(requirements)
      setTestCases(res.data.test_cases)
      toast.success(`Generated ${res.data.test_cases.length} test cases`)
    } catch {
      toast.error('Test generation failed')
    } finally {
      setLoading(false)
    }
  }

  const priorityColor = { High: 'text-red-400', Medium: 'text-yellow-400', Low: 'text-green-400' }

  return (
    <div className="flex flex-col h-screen overflow-y-auto p-6">
      <h2 className="text-xl font-semibold text-white mb-1">🧪 Test Case Generator</h2>
      <p className="text-sm text-slate-500 mb-6">Paste plain-text requirements. Get structured test cases.</p>

      <textarea
        rows={6}
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        placeholder="e.g. The login page must validate email format. Failed logins after 3 attempts should lock the account for 5 minutes..."
        className="w-full bg-[#1e2130] border border-[#2a2d3e] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-indigo-500 mb-4"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !requirements.trim()}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors mb-8 w-fit"
      >
        <TestTube2 size={16} />
        {loading ? 'Generating...' : 'Generate Test Cases'}
      </button>

      {testCases.length > 0 && (
        <div className="flex flex-col gap-4">
          {testCases.map((tc, i) => (
            <div key={i} className="bg-[#1e2130] border border-[#2a2d3e] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-mono">{tc.id}</span>
                <div className="flex gap-2">
                  <span className={`text-xs font-medium ${priorityColor[tc.priority] || 'text-slate-400'}`}>
                    {tc.priority}
                  </span>
                  <span className="text-xs text-slate-500 bg-[#0f1117] px-2 py-0.5 rounded">{tc.type}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{tc.title}</h3>
              <p className="text-xs text-slate-500 mb-3"><span className="text-slate-400">Preconditions:</span> {tc.preconditions}</p>
              <div className="mb-3">
                <p className="text-xs text-slate-400 mb-1">Steps:</p>
                <ol className="list-decimal list-inside space-y-1">
                  {tc.steps.map((step, j) => (
                    <li key={j} className="text-xs text-slate-300">{step}</li>
                  ))}
                </ol>
              </div>
              <p className="text-xs"><span className="text-slate-400">Expected:</span> <span className="text-green-400">{tc.expected_result}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}