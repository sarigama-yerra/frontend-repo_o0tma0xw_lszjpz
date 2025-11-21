import { useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { createProblem } from '../services/problemService'

function AdminInner() {
  const [form, setForm] = useState({ title: '', difficulty: 'Easy', description: '', starter_code: '' })
  const [cases, setCases] = useState([{ input: '', output: '', hidden: false }])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const addRow = () => setCases([...cases, { input: '', output: '', hidden: false }])
  const removeRow = (i) => setCases(cases.filter((_, idx) => idx !== i))

  const submit = async (e) => {
    e.preventDefault(); setMsg(''); setLoading(true)
    try {
      const payload = { ...form, test_cases: cases }
      await createProblem(payload)
      setMsg('Problem created!')
      setForm({ title: '', difficulty: 'Easy', description: '', starter_code: '' })
      setCases([{ input: '', output: '', hidden: false }])
    } catch (e) {
      setMsg(e?.response?.data?.detail || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Admin • Create Problem</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
          <select className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2" value={form.difficulty} onChange={e=>setForm({...form, difficulty:e.target.value})}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <textarea className="w-full h-40 bg-slate-900 border border-slate-800 rounded px-3 py-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <textarea className="w-full h-40 bg-slate-900 border border-slate-800 rounded px-3 py-2" placeholder="Starter Code" value={form.starter_code} onChange={e=>setForm({...form, starter_code:e.target.value})} />

          <div className="rounded border border-slate-800 p-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Test Cases</h3>
              <button type="button" onClick={addRow} className="text-sm px-2 py-1 rounded bg-slate-800">Add</button>
            </div>
            <div className="mt-3 space-y-3">
              {cases.map((c, i) => (
                <div key={i} className="grid md:grid-cols-2 gap-3 border border-slate-800 rounded p-3">
                  <div>
                    <div className="text-xs text-slate-400">Input</div>
                    <textarea className="w-full h-24 bg-slate-900 border border-slate-800 rounded px-2 py-1" value={c.input} onChange={e=>setCases(cases.map((x, idx)=> idx===i? { ...x, input:e.target.value } : x))} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Output</div>
                    <textarea className="w-full h-24 bg-slate-900 border border-slate-800 rounded px-2 py-1" value={c.output} onChange={e=>setCases(cases.map((x, idx)=> idx===i? { ...x, output:e.target.value } : x))} />
                  </div>
                  <label className="text-sm flex items-center gap-2">
                    <input type="checkbox" checked={c.hidden} onChange={e=>setCases(cases.map((x, idx)=> idx===i? { ...x, hidden:e.target.checked } : x))} /> Hidden
                  </label>
                  <div className="text-right">
                    <button type="button" onClick={()=>removeRow(i)} className="text-sm text-rose-400">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {msg && <div className="text-sm text-slate-300">{msg}</div>}
          <button disabled={loading} className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-500">{loading? 'Saving...' : 'Create Problem'}</button>
        </form>
      </div>
    </div>
  )
}

export default function Admin() {
  return (
    <ProtectedRoute adminOnly>
      <AdminInner />
    </ProtectedRoute>
  )
}
