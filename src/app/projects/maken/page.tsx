import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { personalInfo } from '@/lib/data'

const LIVE_URL = 'https://fitness-goal-coach.vercel.app'

export const metadata: Metadata = {
  title: 'Maken — Weight-Cut SaaS | Case Study | Aleksandrs Drozdovs',
  description:
    'Maken is a live AI weight-cut SaaS for judo and BJJ athletes. Weight-class-aware cut protocols, AI training plans, and weekly check-ins. Next.js 16, Supabase, Groq, Resend, and an offline PWA.',
}

const METRICS = [
  { label: 'Status', value: 'Live' },
  { label: 'Built for', value: 'Judo / BJJ' },
  { label: 'Framework', value: 'Next 16' },
  { label: 'Auth + data', value: 'Supabase' },
  { label: 'AI', value: 'Groq' },
  { label: 'Email', value: 'Resend' },
]

export default function MakenCaseStudy() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="px-[clamp(16px,4vw,32px)] py-20 md:py-24">
          <div className="mx-auto max-w-[900px]">
            <Link
              href="/#featured-work"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase text-text-muted transition-colors hover:text-proof"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to work
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase text-proof">Case Study / Live SaaS</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
                <span className="text-proof">Maken</span>
              </h1>
              <p className="mt-2 font-mono text-sm text-text-muted">Make weight, fight fresh.</p>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                An AI weight-cut platform for judo and BJJ athletes. It plans the cut around the athlete, their weight
                class, and their tournament date, generates training, and keeps them on track with weekly check-ins.
                Built by a 16-year judo black belt for his own sport, and live with real alpha users.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
                <span className="rounded-md border border-border bg-surface px-2 py-1">Next.js 16</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Supabase + RLS</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Groq AI</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Resend</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">PWA</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Tailwind</span>
              </div>
            </header>

            <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-lg border border-border bg-surface p-4">
                  <p className="font-display text-xl font-bold tabular-nums text-proof">{m.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-text-muted">{m.label}</p>
                </div>
              ))}
            </div>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">The problem</h2>
              <p className="leading-relaxed text-text-secondary">
                Combat-sport weight cuts are high stakes and full of bad advice. Cutting too hard wrecks performance and
                can be dangerous; cutting too little means missing the class. Athletes deserve a plan built around their
                body, their class, and their tournament date, not a generic spreadsheet.
              </p>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">What it does</h2>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-3"><span className="text-proof">+</span>Weight-class-aware cut protocols anchored to the tournament date.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>AI-generated training and nutrition plans tailored to the athlete.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Weekly check-ins that keep the cut on schedule and flag drift early.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Installable as an offline PWA, so it works at the gym and the venue.</li>
              </ul>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">Under the hood</h2>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-3"><span className="text-proof">+</span>Next.js 16 App Router on Vercel, with Tailwind v4 and Framer Motion.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Supabase auth and PostgreSQL with Row-Level Security on every table.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Streaming AI estimates and plans via Groq running Llama 3.3.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Resend email automation and scheduled cron jobs, with Redis-backed rate limiting.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>GDPR-compliant data export and deletion, plus full technical SEO with JSON-LD and sitemaps.</li>
              </ul>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">The personal angle</h2>
              <p className="leading-relaxed text-text-secondary">
                I have spent sixteen years in judo and made plenty of cuts myself. Maken is the product I wanted as a
                competitor: opinionated, safe, and built by someone who actually trains. Building for a community I am
                part of keeps the feedback loop honest.
              </p>
            </section>

            <section className="border-t border-border pt-10">
              <div className="flex flex-wrap gap-3">
                <Link href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary active:scale-[0.97]">
                  View live demo
                </Link>
                <Link href="/#featured-work" className="btn-secondary active:scale-[0.97]">
                  Back to portfolio
                </Link>
              </div>
              <p className="mt-5 font-mono text-xs text-text-muted">
                Source code is private.{' '}
                <a
                  href={`mailto:${personalInfo.email}?subject=Code%20access%3A%20Maken`}
                  className="text-proof underline-offset-4 hover:underline"
                >
                  Available on request
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
