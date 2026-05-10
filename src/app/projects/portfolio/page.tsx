import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'This Portfolio | Aleksandrs Drozdovs',
  description: 'Personal portfolio built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.',
}

const FEATURES = [
  { title: 'Hiring-first content system', body: 'The homepage is organized around proof recruiters can scan quickly: dashboard, backtest engine, FYP strategy, DLT Capital experience, and contact paths.' },
  { title: 'Tailwind CSS v4 design tokens', body: 'OKLCH colors, surface, border, text, and accent scales live in a single @theme block. The site avoids one-note template colors.' },
  { title: 'SSR-safe animations', body: 'Framer Motion count-ups and reveals avoid hydration mismatch paths while respecting reduced motion preferences.' },
  { title: 'Real equity curve', body: 'The FYP proof section renders a real SVG equity curve from 72 trade data points. The chart is evidence, not decoration.' },
  { title: 'Active section tracking', body: 'Navbar highlights the current section using an IntersectionObserver hook. Smooth and cheap, without scroll-event spam.' },
  { title: 'Static build', body: 'Project data is statically imported at build time. Pages deploy as static content with zero runtime API dependency.' },
]

const STACK = ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Vercel']

const DECISIONS = [
  { label: 'Positioning', value: 'Graduate SWE with quant instincts, backed by DLT Capital, a trading dashboard, Python backtesting, and FYP research' },
  { label: 'Color', value: 'OKLCH-tinted dark neutrals with cyan/green accent and restrained warm highlights' },
  { label: 'Typography', value: 'Geist Sans display, Inter body, Geist Mono for labels and numbers' },
  { label: 'Motion', value: 'Expo-out reveal motion, no bounce, no layout animation' },
  { label: 'Layout', value: 'Proof-led sections with dividers and data surfaces instead of endless identical cards' },
]

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="px-[clamp(16px,4vw,32px)] py-20 md:py-24">
          <div className="mx-auto max-w-[900px]">
            <Link
              href="/#projects"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase text-text-muted transition-colors hover:text-proof"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to projects
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase text-proof">Project / Frontend Engineering</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
                This <span className="text-proof">Portfolio</span>
              </h1>
              <p className="mt-4 max-w-[680px] text-lg leading-relaxed text-text-secondary">
                Built to make the strongest work obvious: full-stack trading software, Python research tooling,
                quant strategy validation, and enough craft to show I can ship usable interfaces.
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
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Design decisions</h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {DECISIONS.map((d) => (
                      <tr key={d.label} className="border-b border-border/50 last:border-0 odd:bg-surface/40">
                        <td className="whitespace-nowrap p-3 font-mono text-[11px] uppercase text-text-muted">{d.label}</td>
                        <td className="p-3 text-text-secondary">{d.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/aleks-drozy/aleksandrs-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary active:scale-[0.97]"
                >
                  View on GitHub
                </Link>
                <Link
                  href="/"
                  className="btn-secondary active:scale-[0.97]"
                >
                  Back to home
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
