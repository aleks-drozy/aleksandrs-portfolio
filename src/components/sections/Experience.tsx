'use client'
import { motion } from 'framer-motion'
import { experience } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

export function Experience() {
  return (
    <section id="experience" className="px-[clamp(16px,4vw,32px)] py-32 md:py-24 sm:py-20 bg-surface/20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="Background" title="Where I've" accent="worked." />

        <div className="relative flex flex-col gap-0">
          {/* Vertical rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-[11px]" />

          {experience.map((entry, i) => (
            <motion.div
              key={`${entry.company}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              className="relative flex gap-6 pb-10 pl-6 last:pb-0 md:pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-background md:h-[22px] md:w-[22px]">
                <div className="h-1.5 w-1.5 rounded-full bg-accent md:h-2 md:w-2" />
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="font-display text-lg font-bold tracking-tight text-text-primary">{entry.role}</h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                      {entry.company}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                    <span className="font-mono text-xs text-text-muted">{entry.period}</span>
                    {entry.location && (
                      <span className="font-mono text-xs text-text-muted/60">· {entry.location}</span>
                    )}
                  </div>
                </div>

                <ul className="flex flex-col gap-2">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
                      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
