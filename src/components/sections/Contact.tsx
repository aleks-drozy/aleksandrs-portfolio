'use client'
import { motion } from 'framer-motion'
import { personalInfo, socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'

const EASE = [0.23, 1, 0.32, 1] as const

export function Contact() {
  return (
    <section id="contact" className="px-[clamp(16px,4vw,32px)] py-28 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="border-y border-border py-10"
        >
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase text-text-muted">Get in touch</p>
              <h2 className="max-w-3xl font-display text-4xl font-black leading-tight md:text-6xl">
                Hiring for 2026? I&apos;d like to talk.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
                Open to graduate software engineering, full-stack, frontend, data tooling, and quantitative developer
                roles. Best next step is email or LinkedIn.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <SocialLink key={s.name} social={s} className="h-6 w-6" />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent/90 active:scale-[0.98]"
            >
              {personalInfo.email}
            </a>
            <a
              href={personalInfo.cvUrl}
              download
              className="rounded-md border border-border bg-surface/70 px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent/60 hover:text-accent active:scale-[0.98]"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
