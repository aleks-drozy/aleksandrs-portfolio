import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'This Portfolio | Aleksandrs Drozdovs',
  description: 'Personal portfolio built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.',
}

const FEATURES = [
  { title: 'Tailwind CSS v4 design system', body: 'All tokens defined in a single @theme block — background, surface, border, text, and accent scales. No config file; the design system lives in CSS.' },
  { title: 'SSR-safe animations', body: 'Framer Motion\'s useReducedMotion hook causes hydration mismatches when used in the render path. All motion preference checks moved into useEffect, keeping server and client HTML identical.' },
  { title: 'Count-up stat animations', body: 'Hero stats animate from zero using Framer Motion\'s useMotionValue and animate. Reduced motion handled client-side only — no server/client divergence.' },
  { title: 'Real equity curve', body: 'The FYP case study renders a real SVG equity curve from 72 actual trade data points, animated via pathLength. No third-party chart library needed.' },
  { title: 'Active section tracking', body: 'Navbar highlights the current section using an IntersectionObserver hook. Smooth, performant, no scroll event listeners.' },
  { title: 'Static build', body: 'All case study data is statically imported at build time. Zero runtime API calls — pages are fully static and deploy instantly on Vercel.' },
]

const STACK = ['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Vercel']

const DECISIONS = [
  { label: 'Accent colour', value: '#2dd4bf — teal signals data/finance without the overused blue' },
  { label: 'Font stack', value: 'Geist Sans (display), Inter (body), Geist Mono (numbers + labels)' },
  { label: 'Motion easing', value: 'cubic-bezier(0.23, 1, 0.32, 1) — expo out, snappy but not jarring' },
  { label: 'Max width', value: '1200px content, clamp(16px, 4vw, 32px) horizontal padding' },
  { label: 'Section rhythm', value: '128px / 96px / 80px top padding — desktop / tablet / mobile' },
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
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to projects
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-accent">Project / Frontend Engineering</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                This <span className="text-accent">Portfolio</span>
              </h1>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                Built to show design engineering taste alongside technical depth. Finance-tech hybrid visual system,
                SSR-safe Framer Motion animations, real equity curve data, and two full case study pages built from
                actual project output.
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
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Design decisions</h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {DECISIONS.map((d) => (
                      <tr key={d.label} className="border-b border-border/50 last:border-0 odd:bg-surface/40">
                        <td className="p-3 font-mono text-[11px] uppercase tracking-widest text-text-muted whitespace-nowrap">{d.label}</td>
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
                  className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent/90 active:scale-[0.97]"
                >
                  View on GitHub
                </Link>
                <Link
                  href="/"
                  className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary active:scale-[0.97]"
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
