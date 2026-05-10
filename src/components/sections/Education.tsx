'use client'
import { motion } from 'framer-motion'
import { education } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

export function Education() {
  return (
    <section id="education" className="px-[clamp(16px,4vw,32px)] py-28 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="Education" title="Computer Science and Software Engineering." />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="proof-panel grid gap-8 rounded-md p-6 lg:grid-cols-[0.8fr_1.2fr] md:p-8"
        >
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-black text-text-primary">{education.institution}</h3>
                <p className="mt-2 max-w-md text-base leading-7 text-text-secondary">{education.degree}</p>
              </div>
              <span className="shrink-0 rounded-md border border-proof/40 bg-proof/10 px-3 py-1 font-mono text-xs text-proof">
                {education.gpa}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-muted">
              <span>{education.period}</span>
              <span>{education.location}</span>
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase text-text-muted">Relevant coursework</p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-sm border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-text-secondary"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
