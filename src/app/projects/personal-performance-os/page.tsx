import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { personalInfo } from '@/lib/data'

const LIVE_URL = 'https://personal-performance-os.vercel.app'

export const metadata: Metadata = {
  title: 'Personal Performance OS | Case Study | Aleksandrs Drozdovs',
  description:
    'A live full-stack performance OS on Next.js, TypeScript, and Supabase. 25-table Postgres schema with RLS on every table, Groq Llama 3.3 AI coaching, 94 Vitest + 6/6 Playwright tests, and CI/CD.',
}

const METRICS = [
  { label: 'Postgres tables', value: '25' },
  { label: 'Migrations', value: '12' },
  { label: 'Vitest tests', value: '94' },
  { label: 'Playwright E2E', value: '6/6' },
  { label: 'AI model', value: 'Llama 3.3' },
  { label: 'Status', value: 'Live' },
]

const MODULES: [string, string][] = [
  ['Morning check-in', 'A readiness engine that turns a quick check-in into the shape of the day.'],
  ['Training programming', 'Automatic program generation with load and volume analytics over time.'],
  ['Fridge + AI recipes', 'Inventory-aware recipe generation from what is actually in the kitchen.'],
  ['Habits', 'Streaks and follow-through tracking that feeds back into the readiness engine.'],
  ['Tasks', 'A Plan my day / Fix my day planner that reshuffles the day on demand.'],
  ['Ideas inbox', 'Capture first, then AI evaluation to decide what is worth acting on.'],
  ['Wardrobe', 'Weather-aware outfit suggestions from a tagged wardrobe.'],
]

export default function PerformanceOsCaseStudy() {
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
              <p className="mb-3 font-mono text-[11px] uppercase text-proof">Case Study / Full-Stack SaaS</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
                Personal Performance <span className="text-proof">OS</span>
              </h1>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                A production operating system for the person running it: training, food, habits, tasks, and ideas in
                one place, so the day becomes something you execute instead of constantly re-plan. Designed, built, and
                shipped solo.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
                <span className="rounded-md border border-border bg-surface px-2 py-1">Next.js</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">TypeScript</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Supabase</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">PostgreSQL + RLS</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Groq AI</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Vitest + Playwright</span>
              </div>
            </header>

            <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-lg border border-border bg-surface p-4">
                  <p className="font-display text-2xl font-bold tabular-nums text-proof">{m.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-text-muted">{m.label}</p>
                </div>
              ))}
            </div>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">What it is</h2>
              <div className="space-y-4 leading-relaxed text-text-secondary">
                <p>
                  Personal Performance OS is a single place to plan and run a life: training, food, habits, tasks, and
                  ideas, with an AI layer that turns scattered inputs into a concrete plan for the day. It is live in
                  production and used daily.
                </p>
                <p>
                  The goal was not another note app. It was a system with real data integrity, real auth boundaries,
                  and enough test coverage that I can change it without fear.
                </p>
              </div>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">Architecture and data</h2>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-3"><span className="text-proof">+</span>Supabase email and password auth, with the session boundary enforced server-side.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>A 25-table PostgreSQL schema, evolved through 12 reviewed migrations.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Row-Level Security on every single table, so access is enforced by the database, not just the UI.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>A typed data layer end to end, from Postgres to the React components.</li>
              </ul>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">The AI layer</h2>
              <div className="space-y-4 leading-relaxed text-text-secondary">
                <p>
                  Groq running Llama 3.3 70B powers recipe generation, coaching, the weekly review, day planning, and
                  idea evaluation. The model is given structured context and asked for structured output the app can
                  act on.
                </p>
                <p>
                  Because the AI sees user-controlled text, it is hardened against prompt injection, and every AI route
                  sits behind persistent rate limiting so a single user cannot exhaust the budget.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">Modules</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {MODULES.map(([title, body]) => (
                  <div key={title} className="rounded-lg border border-border bg-surface p-4">
                    <p className="font-display text-base font-semibold text-text-primary">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">Quality and delivery</h2>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-3"><span className="text-proof">+</span>94 Vitest unit tests plus a 6/6 Playwright end-to-end suite.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>ESLint and Prettier enforced, with light and dark theming.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Deployed on Vercel with CI running on every push.</li>
              </ul>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">Why it matters</h2>
              <p className="leading-relaxed text-text-secondary">
                This is the clearest proof that I can own a product end to end: schema design, auth and security, an AI
                integration that does not fall over on hostile input, a real test suite, and a deployment pipeline.
                Built and maintained solo, in production.
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
                  href={`mailto:${personalInfo.email}?subject=Code%20access%3A%20Personal%20Performance%20OS`}
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
