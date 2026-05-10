'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: ReactNode; accent?: ReactNode; className?: string }

export function SectionHeader({ eyebrow, title, accent, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={`mb-12 max-w-3xl ${className}`}
    >
      <p className="mb-3 font-mono text-xs uppercase text-proof">{eyebrow}</p>
      <h2 className="font-display text-3xl font-black leading-tight md:text-5xl">
        {title}
        {accent ? <> <span className="text-proof">{accent}</span></> : null}
      </h2>
    </motion.div>
  )
}
