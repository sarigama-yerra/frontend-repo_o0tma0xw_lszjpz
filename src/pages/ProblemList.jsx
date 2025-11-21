import { useEffect, useState } from 'react'
import { getProblems } from '../services/problemService'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const color = { Easy: 'text-emerald-400', Medium: 'text-amber-400', Hard: 'text-rose-400' }

export default function ProblemList() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await getProblems()
        setProblems(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Problems</h1>
        <div className="mt-6 rounded-xl border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 bg-slate-900/80">
            <div className="col-span-7">Title</div>
            <div className="col-span-3">Difficulty</div>
            <div className="col-span-2 text-right">Action</div>
          </div>
          {loading ? (
            <div className="p-6 text-slate-400">Loading...</div>
          ) : problems.length === 0 ? (
            <div className="p-6 text-slate-400">No problems yet.</div>
          ) : (
            problems.map((p, i) => (
              <motion.div key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="grid grid-cols-12 px-4 py-3 border-t border-slate-800">
                <div className="col-span-7">{p.title}</div>
                <div className={`col-span-3 font-medium ${color[p.difficulty]}`}>{p.difficulty}</div>
                <div className="col-span-2 text-right">
                  <Link to={`/problems/${p._id}`} className="px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-sm font-semibold">Solve</Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
