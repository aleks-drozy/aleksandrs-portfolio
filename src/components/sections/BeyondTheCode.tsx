'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { beyondPanels } from '@/lib/data'

function Panel({ panel, index }: { panel: typeof beyondPanels[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 20 : -20, index % 2 === 0 ? -20 : 20])
  return (
    <motion.div ref={ref} style={{ y, borderTopColor: '#6366f1' }} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-surface border border-border border-t-2 rounded-2xl p-8 flex flex-col items-center text-center">
      <span className="text-5xl mb-4" role="img" aria-label={panel.title}>{panel.icon}</span>
      <h3 className="font-display text-xl font-bold mb-3 text-text-primary">{panel.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{panel.copy}</p>
    </motion.div>
  )
}

export function BeyondTheCode() {
  return (
    <section id="beyond" className="py-24 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-text-muted text-sm font-mono tracking-widest uppercase mb-2">The full picture</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Beyond <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>the Code</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {beyondPanels.map((panel, i) => <Panel key={panel.title} panel={panel} index={i}/>)}
        </div>
      </div>
    </section>
  )
}
