import { Bot, FileSearch, TestTube2, Upload } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/triage', label: 'Log Triage', icon: FileSearch },
  { to: '/docqa', label: 'Doc Q&A', icon: Bot },
  { to: '/testgen', label: 'Test Gen', icon: TestTube2 },
  { to: '/ingest', label: 'Ingest Docs', icon: Upload },
]

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-[#151823] border-r border-[#2a2d3e] flex flex-col px-4 py-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">⚙️ DevOps AI</h1>
        <p className="text-xs text-slate-500 mt-1">Powered by Gemini 2.5 Flash</p>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-[#1e2130] hover:text-white'}`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto text-xs text-slate-600 text-center">
        v1.0.0 · Local Mode
      </div>
    </aside>
  )
}