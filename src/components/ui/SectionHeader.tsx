'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: ReactNode; accent?: ReactNode; className?: string }

export function SectionHeader({ eyebrow, title, accent, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={`mb-12 max-w-3xl ${className}`}
    >
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
        <span className="inline-block h-px w-6 bg-accent/70" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-light leading-tight tracking-[-0.01em] md:text-5xl">
        {title}
        {accent ? <> <span className="font-medium text-accent">{accent}</span></> : null}
      </h2>
    </motion.div>
  )
}
