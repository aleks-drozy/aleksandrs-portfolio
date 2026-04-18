'use client'
import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { beyondPanels } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

const ICONS: Record<string, ReactElement> = {
  judo: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  chart: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
}

export function BeyondTheCode() {
  return (
    <section id="beyond" className="px-[clamp(16px,4vw,32px)] py-32 md:py-24 sm:py-20 bg-surface/20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="The full picture" title="Beyond" accent="the Code" />

        <div className="grid gap-6 md:grid-cols-2">
          {beyondPanels.map((panel, i) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors duration-200 hover:border-border-strong"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-accent">
                {ICONS[panel.icon] ?? <span className="text-2xl">{panel.icon}</span>}
              </div>
              <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-text-primary">
                {panel.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{panel.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
