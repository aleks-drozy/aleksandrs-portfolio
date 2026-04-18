'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { personalInfo, heroStats } from '@/lib/data'
import { HeroStat } from '@/components/ui/HeroStat'
import { StatusPill } from '@/components/ui/StatusPill'

const EASE = [0.23, 1, 0.32, 1] as const
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }

export function Hero() {
  const shouldReduce = useReducedMotion()
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-[clamp(16px,4vw,32px)]">
      {/* Subtle radial background — accent-only, no purple */}
      {!shouldReduce && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -right-24 bottom-1/4 h-[360px] w-[360px] rounded-full bg-accent-muted/5 blur-3xl" />
        </div>
      )}

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-[1200px]"
      >
        <div className="flex max-w-3xl flex-col gap-6">
          <motion.div variants={item}>
            <StatusPill label={personalInfo.status} />
          </motion.div>

          <motion.p variants={item} className="font-mono text-xs uppercase tracking-widest text-text-muted">
            {personalInfo.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {personalInfo.headline}{' '}
            <span className="text-accent">{personalInfo.headlineAccent}</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-[540px] text-lg leading-relaxed text-text-secondary">
            {personalInfo.subline}
          </motion.p>

          <motion.div variants={item} className="grid grid-cols-3 gap-3 sm:max-w-lg">
            {heroStats.map((stat, i) => (
              <HeroStat key={stat.label} value={stat.value} label={stat.label} delay={0.05 * i} />
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <a
              href="#featured-work"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent/90 active:scale-[0.97]"
            >
              View Work
            </a>
            <a
              href={personalInfo.cvUrl}
              download
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary active:scale-[0.97]"
            >
              Download CV
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
        animate={shouldReduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="mx-auto h-8 w-px bg-gradient-to-b from-accent/60 to-transparent" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
          <path d="M1 1L6 7L11 1" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
