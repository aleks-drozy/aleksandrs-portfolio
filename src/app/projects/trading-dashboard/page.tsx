import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Trading Dashboard | Aleksandrs Drozdovs',
  description: 'Full-stack trading dashboard with a Next.js + TypeScript frontend and Python data backend.',
}

const FEATURES = [
  { title: 'TypeScript frontend', body: 'Next.js app with full type coverage across components, API calls, and data schemas. Strict mode enabled.' },
  { title: 'Python data backend', body: 'Separate Python service handles data fetching, processing, and serving — decoupled from the UI layer via a proxy.' },
  { title: 'Code quality pipeline', body: 'Husky pre-commit hooks run ESLint and Prettier via lint-staged on every commit. Vitest covers the frontend logic.' },
  { title: 'Multi-platform deployment', body: 'Frontend deployed on Vercel, backend configured for Render via render.yaml. Both services linked through an API proxy layer.' },
]

const STACK = ['TypeScript', 'Next.js', 'Python', 'Vitest', 'ESLint', 'Prettier', 'Husky', 'Vercel', 'Render']

export default function TradingDashboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="px-[clamp(16px,4vw,32px)] py-20 md:py-24">
          <div className="mx-auto max-w-[900px]">
            <Link
              href="/#projects"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to projects
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-accent">Project / Full-Stack</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                Trading <span className="text-accent">Dashboard</span>
              </h1>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                A full-stack market dashboard combining a Next.js + TypeScript frontend with a Python data backend.
                Built with a professional-grade code quality pipeline: pre-commit hooks, strict linting, Vitest
                coverage, and dual deployment on Vercel and Render.
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
                <div key={f.title} className="rounded-xl border border-border bg-surface p-5">
                  <p className="mb-2 font-display text-base font-semibold text-text-primary">{f.title}</p>
                  <p className="text-sm leading-relaxed text-text-secondary">{f.body}</p>
                </div>
              ))}
            </section>

            <section className="mb-16">
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Architecture</h2>
              <div className="rounded-xl border border-border bg-surface p-6 font-mono text-sm text-text-secondary leading-relaxed">
                <p className="text-accent mb-3">Trading_Dashboard/</p>
                <p className="ml-4">frontend/          <span className="text-text-muted">Next.js + TypeScript UI</span></p>
                <p className="ml-4">backend/           <span className="text-text-muted">Python data service</span></p>
                <p className="ml-4">proxy.ts           <span className="text-text-muted">API proxy layer</span></p>
                <p className="ml-4">__tests__/         <span className="text-text-muted">Vitest test suite</span></p>
                <p className="ml-4">.husky/            <span className="text-text-muted">Pre-commit hooks</span></p>
                <p className="ml-4">render.yaml        <span className="text-text-muted">Render deployment config</span></p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://tradingdashboard-one.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent/90 active:scale-[0.97]"
                >
                  Live Demo
                </Link>
                <Link
                  href="https://github.com/aleks-drozy/Trading_Dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary active:scale-[0.97]"
                >
                  View on GitHub
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
