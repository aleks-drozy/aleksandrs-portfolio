'use client'
import { motion } from 'framer-motion'
import { beyondPanels } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

export function BeyondTheCode() {
  return (
    <section id="beyond" className="bg-surface/25 px-[clamp(16px,4vw,32px)] py-28 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="Character" title="The stuff that changes how I work." />

        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
          {beyondPanels.map((panel, i) => (
            <motion.article
              key={panel.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
              className="bg-background/80 p-7 md:p-8"
            >
              <p className="mb-4 font-mono text-xs uppercase text-warm">{panel.title}</p>
              <p className="text-base leading-8 text-text-secondary">{panel.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
