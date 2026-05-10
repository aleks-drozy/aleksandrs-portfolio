'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { proofItems } from '@/lib/data'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { RealEquityCurve } from '@/components/ui/RealEquityCurve'

const EASE = [0.23, 1, 0.32, 1] as const

export function FeaturedWork() {
  return (
    <section id="featured-work" className="px-[clamp(16px,4vw,32px)] py-28 md:py-24 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          eyebrow="Best proof"
          title="Three pieces of proof, one direction."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="grid gap-4">
            {proofItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }}
                className="proof-panel group relative grid gap-5 overflow-hidden rounded-md p-5 transition-colors duration-200 hover:border-border-strong md:grid-cols-[170px_1fr]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-proof/0 transition-colors duration-300 group-hover:bg-proof/70" aria-hidden />
                <div>
                  <p className="font-mono text-[11px] uppercase text-proof">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-mono text-xs uppercase text-text-muted">{item.label}</p>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-black leading-tight text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
                    {item.description}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border">
                    {item.meta.map((metric) => (
                      <div key={metric.label} className="bg-background/55 p-3">
                        <p className="font-display text-xl font-black tabular-nums text-proof">{metric.value}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase text-text-muted">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={item.href}
                    className="mt-5 inline-flex text-sm font-semibold text-accent transition-colors duration-200 hover:text-proof"
                  >
                    Open case study
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="proof-panel self-start rounded-md p-4 lg:sticky lg:top-24"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase text-text-muted">FYP equity curve</p>
              <p className="font-mono text-xs text-proof">+$28.4K</p>
            </div>
            <RealEquityCurve className="h-[320px]" />
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
