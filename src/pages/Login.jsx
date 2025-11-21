import { useState } from 'react'
import { login, register } from '../services/authService'
import { motion } from 'framer-motion'

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', isAdmin: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const user = isSignup
        ? await register({ name: form.name, email: form.email, password: form.password, isAdmin: form.isAdmin })
        : await login({ email: form.email, password: form.password })
      window.location.href = '/'
    } catch (err) {
      setError(err?.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold">{isSignup ? 'Create account' : 'Welcome back'}</h1>
        <p className="text-slate-400 text-sm mt-1">{isSignup ? 'Sign up to start solving' : 'Sign in to continue'}</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          {isSignup && (
            <input className="w-full bg-slate-800 rounded-lg px-3 py-2 outline-none" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          )}
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 outline-none" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input className="w-full bg-slate-800 rounded-lg px-3 py-2 outline-none" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          {isSignup && (
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={form.isAdmin} onChange={e=>setForm({...form, isAdmin:e.target.checked})} /> Register as admin
            </label>
          )}
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button disabled={loading} className="w-full rounded-lg bg-violet-600 hover:bg-violet-500 py-2 font-semibold disabled:opacity-60">{loading ? 'Please wait...' : (isSignup ? 'Sign up' : 'Sign in')}</button>
        </form>
        <button onClick={()=>setIsSignup(!isSignup)} className="mt-4 text-sm text-slate-300 hover:text-white">
          {isSignup ? 'Have an account? Sign in' : "New here? Create an account"}
        </button>
      </motion.div>
    </div>
  )
}
