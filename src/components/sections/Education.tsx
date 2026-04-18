'use client'
import { motion } from 'framer-motion'
import { education } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'

const EASE = [0.23, 1, 0.32, 1] as const

export function Education() {
  return (
    <section id="education" className="px-[clamp(16px,4vw,32px)] py-32 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="Credentials" title="Education" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="h-[2px] w-full bg-accent" />
          <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:gap-12 md:p-10">
            {/* Left: institution info */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary">
                    {education.institution}
                  </h3>
                  <p className="mt-1 text-base text-text-secondary">{education.degree}</p>
                </div>
                <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                  {education.gpa}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-muted">
                <span>{education.period}</span>
                <span className="text-text-muted/50">·</span>
                <span>{education.location}</span>
              </div>
            </div>
          </div>

          {/* Coursework chips */}
          <div className="border-t border-border px-8 py-6 md:px-10">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">Relevant coursework</p>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {education.coursework.map((course) => (
                <motion.span
                  key={course}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
                  }}
                  className="rounded-md border border-border bg-surface-elevated px-2.5 py-1 font-mono text-xs text-text-secondary"
                >
                  {course}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
