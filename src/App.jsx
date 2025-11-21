import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import Login from './pages/Login'
import ProblemList from './pages/ProblemList'
import ProblemWorkspace from './pages/ProblemWorkspace'
import Admin from './pages/Admin'

function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur border-b border-slate-800 bg-slate-950/70">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14 text-white">
        <Link to="/" className="font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-sky-400">CodeForge</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/problems" className="hover:text-violet-400">Problems</Link>
          <Link to="/admin" className="hover:text-violet-400">Admin</Link>
          <Link to="/login" className="px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-500 font-semibold">Login</Link>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="py-10 text-center text-slate-400 bg-slate-950 border-t border-slate-800">Built with love • Practice daily</div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:id" element={<ProblemWorkspace />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
