import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Trading Analytics Dashboard | Aleksandrs Drozdovs',
  description: 'Full-stack trading research dashboard with a Next.js + TypeScript frontend, Python analytics workflow, tests, and Vercel deployment.',
}

const FEATURES = [
  { title: 'Largest public build', body: '228 GitHub commits across frontend, backend, tests, schemas, documentation, and deployment config. This is the portfolio project with the most visible build depth.' },
  { title: 'Correct product surface', body: 'The deploy now points at the root Next.js Trade Journal app: landing page, auth, dashboard, trade log, trade forms, and analytics routes.' },
  { title: 'Python analytics workflow', body: 'Separate Python layer handles data fetching and processing, keeping market logic decoupled from the UI.' },
  { title: 'Code quality pipeline', body: 'Husky pre-commit hooks run ESLint and Prettier via lint-staged on every commit. Vitest covers the frontend logic.' },
  { title: 'Deployment shape', body: 'The Vercel project is configured to build the root Next.js app, not the older Vite dashboard folder, so the public link opens the correct Trade Journal product.' },
]

const STACK = ['TypeScript', 'Next.js', 'Python', 'Vitest', 'ESLint', 'Prettier', 'Husky', 'Vercel', 'Render', '228 commits']

export default function TradingDashboardPage() {
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
              Back to proof
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase text-proof">Project / Full-Stack Trading Tool</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
                Trading Analytics <span className="text-proof">Dashboard</span>
              </h1>
              <p className="mt-4 max-w-[680px] text-lg leading-relaxed text-text-secondary">
                A full-stack trade journal and market research app built around a Next.js dashboard, authenticated trade
                logging, analytics routes, reusable schemas, tests, pre-commit hooks, documentation, and deployment
                configuration. This is the strongest pure software-engineering proof on the site because it shows product
                depth rather than just a visual dashboard.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {STACK.map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <section className="mb-16 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="proof-panel rounded-md p-5">
                  <p className="mb-2 font-display text-base font-semibold text-text-primary">{f.title}</p>
                  <p className="text-sm leading-relaxed text-text-secondary">{f.body}</p>
                </div>
              ))}
            </section>

            <section className="mb-16">
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Architecture</h2>
              <div className="rounded-xl border border-border bg-surface p-6 font-mono text-sm leading-relaxed text-text-secondary">
                <p className="mb-3 text-proof">Trading_Dashboard/</p>
                <p className="ml-4">app/ <span className="text-text-muted">Next.js landing, auth, dashboard, trade journal, and API routes</span></p>
                <p className="ml-4">components/ <span className="text-text-muted">Reusable landing, auth, dashboard, and trade-entry UI</span></p>
                <p className="ml-4">backend/ <span className="text-text-muted">Python analytics service</span></p>
                <p className="ml-4">schemas/ <span className="text-text-muted">Shared data contracts</span></p>
                <p className="ml-4">__tests__/ <span className="text-text-muted">Vitest test suite</span></p>
                <p className="ml-4">.husky/ <span className="text-text-muted">Pre-commit hooks</span></p>
                <p className="ml-4">render.yaml <span className="text-text-muted">Render deployment config</span></p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://tradingdashboard-one.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary active:scale-[0.97]"
                >
                  Open Live App
                </Link>
                <Link
                  href="https://github.com/aleks-drozy/Trading_Dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary active:scale-[0.97]"
                >
                  View on GitHub
                </Link>
                <span className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-muted">
                  Dashboard routes are protected by login
                </span>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
