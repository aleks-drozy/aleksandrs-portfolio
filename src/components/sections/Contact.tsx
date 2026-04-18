'use client'
import { motion } from 'framer-motion'
import { personalInfo, socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'

const EASE = [0.23, 1, 0.32, 1] as const

export function Contact() {
  return (
    <section id="contact" className="px-[clamp(16px,4vw,32px)] py-32 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">Get in touch</p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s <span className="text-accent">connect.</span>
            </h2>
            <p className="mt-3 max-w-md text-text-secondary">
              Open to new graduate software engineering and quantitative developer roles for 2026.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <SocialLink key={s.name} social={s} className="h-6 w-6" />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
          className="mt-10 border-t border-border pt-10"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-8 py-4 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent/50 hover:bg-surface-elevated active:scale-[0.98]"
          >
            <svg
              className="h-5 w-5 text-text-muted transition-colors duration-200 group-hover:text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
            {personalInfo.email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
