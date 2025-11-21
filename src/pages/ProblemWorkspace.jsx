import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProblemById } from '../services/problemService'
import { runCode, submitCode } from '../services/submissionService'
import Editor from '@monaco-editor/react'

export default function ProblemWorkspace() {
  const { id } = useParams()
  const [problem, setProblem] = useState(null)
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('')
  const [tab, setTab] = useState('output')
  const [result, setResult] = useState({ status: '', stdout: '', stderr: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const p = await getProblemById(id)
      setProblem(p)
      setCode(p.starter_code || '')
    })()
  }, [id])

  const run = async () => {
    setLoading(true)
    try {
      const res = await runCode({ problem_id: id, language, code })
      setResult(res)
      setTab('output')
    } finally {
      setLoading(false)
    }
  }

  const submit = async () => {
    setLoading(true)
    try {
      const res = await submitCode({ problem_id: id, language, code })
      setResult(res)
      setTab('output')
    } finally {
      setLoading(false)
    }
  }

  if (!problem) return <div className="min-h-screen bg-slate-950 text-white p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white grid md:grid-cols-2">
      <div className="p-6 border-r border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded bg-slate-800`}>{problem.difficulty}</span>
          </div>
        </div>
        <div className="prose prose-invert max-w-none mt-6 whitespace-pre-wrap">{problem.description}</div>
        {problem.test_cases?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Examples</h3>
            <div className="mt-2 space-y-2">
              {problem.test_cases.map((t, i) => (
                <div key={i} className="rounded border border-slate-800 p-3">
                  <div className="text-xs text-slate-400">Input</div>
                  <pre className="text-sm">{t.input}</pre>
                  <div className="text-xs text-slate-400 mt-2">Output</div>
                  <pre className="text-sm">{t.output}</pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <select value={language} onChange={e=>setLanguage(e.target.value)} className="bg-slate-900 border border-slate-800 rounded px-2 py-1">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <button onClick={run} disabled={loading} className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700">{loading? 'Running...' : 'Run'}</button>
          <button onClick={submit} disabled={loading} className="px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-500">{loading? 'Submitting...' : 'Submit'}</button>
        </div>
        <div className="mt-3 border border-slate-800 rounded overflow-hidden">
          <Editor height="50vh" defaultLanguage="javascript" language={language} theme="vs-dark" value={code} onChange={setCode} options={{ fontSize: 14, minimap: { enabled: false } }} />
        </div>
        <div className="mt-3">
          <div className="flex gap-4 text-sm">
            <button className={`pb-1 border-b-2 ${tab==='output'? 'border-violet-500' : 'border-transparent'} `} onClick={()=>setTab('output')}>Output</button>
          </div>
          <div className="mt-2 rounded border border-slate-800 p-3 text-sm bg-slate-900">
            <div className={`font-semibold ${result.status==='Accepted' ? 'text-emerald-400' : result.status==='Wrong Answer' ? 'text-rose-400' : 'text-slate-300'}`}>{result.status}</div>
            {result.stdout && (
              <pre className="mt-2 text-slate-300 whitespace-pre-wrap">{result.stdout}</pre>
            )}
            {result.stderr && (
              <pre className="mt-2 text-rose-300 whitespace-pre-wrap">{result.stderr}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
