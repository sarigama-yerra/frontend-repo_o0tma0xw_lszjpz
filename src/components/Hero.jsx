import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="relative h-[60vh] md:h-[70vh]">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 flex items-end md:items-center justify-center pb-10 md:pb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400">
              Code. Test. Ace.
            </h1>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
              A sleek, developer-first playground to practice coding challenges with a blazing-fast editor and live judge.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="/problems" className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 transition font-semibold">Browse Problems</a>
              <a href="#features" className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition font-semibold">See Features</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
