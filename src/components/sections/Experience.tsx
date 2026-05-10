'use client'
import { motion } from 'framer-motion'
import { experience } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

export function Experience() {
  return (
    <section id="experience" className="bg-surface/25 px-[clamp(16px,4vw,32px)] py-28 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="Experience" title="Real work, research, and pressure-tested reliability." />

        <div className="divide-y divide-border border-y border-border">
          {experience.map((entry, i) => (
            <motion.article
              key={`${entry.company}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              className="grid gap-5 py-8 md:grid-cols-[260px_1fr]"
            >
              <div>
                <p className="font-mono text-xs uppercase text-accent">{entry.period}</p>
                {entry.location && <p className="mt-1 font-mono text-xs text-text-muted">{entry.location}</p>}
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-black text-text-primary">{entry.role}</h3>
                  <span className="font-mono text-xs uppercase text-text-muted">{entry.company}</span>
                </div>

                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="border-l border-accent/60 pl-4 text-sm leading-7 text-text-secondary">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
