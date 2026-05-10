'use client'
import { motion } from 'framer-motion'
import { hireSignals, personalInfo, heroStats } from '@/lib/data'
import { HeroStat } from '@/components/ui/HeroStat'
import { StatusPill } from '@/components/ui/StatusPill'

const EASE = [0.23, 1, 0.32, 1] as const
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden px-[clamp(16px,4vw,32px)] py-16">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-[1200px]"
      >
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex max-w-3xl flex-col gap-7">
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <StatusPill label={personalInfo.status} />
              <span className="font-mono text-xs uppercase text-text-muted">{personalInfo.location}</span>
            </motion.div>

            <motion.p variants={item} className="font-mono text-xs uppercase text-text-muted">
              {personalInfo.eyebrow}
            </motion.p>

            <motion.h1
              variants={item}
              className="max-w-[820px] font-display text-[clamp(3.3rem,8vw,6.8rem)] font-black leading-[0.94]"
            >
              {personalInfo.headline}{' '}
              <span className="text-accent">{personalInfo.headlineAccent}</span>
            </motion.h1>

            <motion.p variants={item} className="max-w-[650px] text-lg leading-8 text-text-secondary md:text-xl">
              {personalInfo.subline}
            </motion.p>

            <motion.div variants={item} className="grid gap-3 sm:grid-cols-3 sm:max-w-2xl">
              {heroStats.map((stat, i) => (
                <HeroStat key={stat.label} value={stat.value} label={stat.label} delay={0.05 * i} />
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a
                href="#featured-work"
                className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent/90 active:scale-[0.98]"
              >
                See the proof
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="rounded-md border border-border bg-surface/70 px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent/60 hover:text-accent active:scale-[0.98]"
              >
                Email me
              </a>
              <a
                href={personalInfo.cvUrl}
                download
                className="rounded-md px-6 py-3 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                Download CV
              </a>
            </motion.div>
          </div>

          <motion.aside
            variants={item}
            className="border-y border-border bg-background/55 py-6 lg:border-l lg:border-y-0 lg:pl-8"
            aria-label="Hiring snapshot"
          >
            <p className="mb-5 font-mono text-xs uppercase text-warm">Hiring snapshot</p>
            <dl className="divide-y divide-border">
              {hireSignals.map((signal) => (
                <div key={signal.label} className="grid grid-cols-[120px_1fr] gap-5 py-4">
                  <dt className="font-mono text-[11px] uppercase text-text-muted">{signal.label}</dt>
                  <dd className="text-sm leading-6 text-text-primary">{signal.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-sm text-sm leading-6 text-text-secondary">
              I am not trying to look like every other junior dev portfolio. The pitch is simple: I can build,
              test, explain, and keep my head when the numbers matter.
            </p>
          </motion.aside>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-accent md:flex"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="mx-auto h-8 w-px bg-accent/60" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
          <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
