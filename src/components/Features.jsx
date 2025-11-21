import { motion } from 'framer-motion'
import { Code2, ShieldCheck, Settings, Rocket } from 'lucide-react'

const features = [
  { icon: Code2, title: 'Monaco Editor', desc: 'VS Code-grade editing with syntax highlighting for JS and Python.' },
  { icon: ShieldCheck, title: 'JWT Auth', desc: 'Secure auth with protected routes and admin-only tools.' },
  { icon: Settings, title: 'Custom Test Runs', desc: 'Run against sample tests or submit for full evaluation.' },
  { icon: Rocket, title: 'Fast & Smooth', desc: 'Framer Motion transitions and a modern, minimal theme.' },
]

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Everything you need to practice</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-5">
              <f.icon className="w-6 h-6 text-violet-400" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
