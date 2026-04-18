'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EquityCurve } from '@/components/ui/EquityCurve'

const EASE = [0.23, 1, 0.32, 1] as const

export function FeaturedWork() {
  const featured = projects.find((p) => p.featured)
  if (!featured) return null

  return (
    <section id="featured-work" className="px-[clamp(16px,4vw,32px)] py-32 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow="Featured case study" title="NASDAQ-100 Algo" accent="Strategy" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-border-strong"
        >
          {/* Accent top bar */}
          <div className="h-[2px] w-full bg-accent" />

          <div className="grid gap-0 md:grid-cols-[1fr_45%]">
            {/* Left: content */}
            <div className="flex flex-col gap-6 p-8 md:p-10">
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-accent">Featured Case Study</p>
                <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                  {featured.title}
                </h3>
              </div>

              <p className="leading-relaxed text-text-secondary">{featured.description}</p>

              {/* Metric strip */}
              {featured.metrics && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {featured.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-border bg-background p-3 text-center"
                    >
                      <p className="font-display text-xl font-bold tabular-nums text-text-primary">{m.value}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/projects/fyp-trading-strategy"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent/80"
                >
                  Read case study
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </Link>
              </div>
            </div>

            {/* Right: equity curve */}
            <div className="flex items-center justify-center border-t border-border p-6 md:border-l md:border-t-0 md:p-8">
              <EquityCurve className="aspect-[4/3] w-full max-w-xs" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
