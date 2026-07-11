import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudy } from '@/lib/case-studies'
import { EquityCurve } from '@/components/EquityCurve'
import { site } from '@/lib/data'

const CONTAINER = 'mx-auto w-full max-w-[820px] px-6 sm:px-8'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) return { title: 'Case study not found' }
  const description = cs.summary ?? cs.sections[0]?.paragraphs?.[0] ?? cs.title
  return {
    title: `${cs.title} — Aleksandrs Drozdovs`,
    description,
    openGraph: { title: `${cs.title} — Aleksandrs Drozdovs`, description, type: 'article' },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  return (
    <main>
      {/* slim top bar */}
      <div className="sticky top-0 z-40 border-b border-hair bg-paper/80 backdrop-blur-md backdrop-saturate-150">
        <div className={`${CONTAINER} !max-w-[1180px] flex h-16 items-center justify-between`}>
          <Link href="/" className="font-mono text-[13px] font-semibold tracking-[0.04em] text-ink">
            A<span className="text-cobalt">·</span>DROZDOVS
          </Link>
          <Link href="/#work" className="font-mono text-xs uppercase tracking-[0.05em] text-ink-3 hover:text-cobalt">
            ← All work
          </Link>
        </div>
      </div>

      <article className={`${CONTAINER} py-16 md:py-20`}>
        <span className="eyebrow">{cs.kicker}</span>
        <h1 className="mt-4 text-balance font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">
          {cs.title}
        </h1>

        {/* meta strip */}
        <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-y border-hair py-5 font-mono text-[11px] uppercase tracking-[0.08em]">
          <div>
            <dt className="text-ink-3">Year</dt>
            <dd className="mt-1 text-ink">{cs.year}</dd>
          </div>
          {cs.role && (
            <div>
              <dt className="text-ink-3">Role</dt>
              <dd className="mt-1 text-ink">{cs.role}</dd>
            </div>
          )}
          {cs.timeline && (
            <div>
              <dt className="text-ink-3">Status</dt>
              <dd className="mt-1 text-ink">{cs.timeline}</dd>
            </div>
          )}
        </dl>

        {/* stack + links */}
        <div className="mt-6 flex flex-wrap gap-2">
          {cs.stack.map((s) => (
            <span key={s} className="rounded-sm border border-hair px-2.5 py-1 font-mono text-[11px] text-ink-3">
              {s}
            </span>
          ))}
        </div>
        {cs.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3.5">
            {cs.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}

        {/* metrics */}
        {cs.metrics && (
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-hair bg-hair sm:grid-cols-4">
            {cs.metrics.map((m) => (
              <div key={m.label} className="bg-surface px-4 py-5">
                <div className="font-serif text-[1.6rem] leading-none tracking-[-0.01em] text-cobalt">{m.value}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* equity curve */}
        {cs.hasEquityCurve && (
          <div className="mt-10">
            <EquityCurve />
          </div>
        )}

        {/* sections */}
        <div className="mt-14 flex flex-col gap-12">
          {cs.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-serif text-[1.5rem] font-medium tracking-[-0.01em]">{s.heading}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-ink-2">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 flex flex-col gap-2.5">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="pl-5 leading-relaxed text-ink-2 [text-indent:-1.25rem]">
                      <span className="mr-2.5 text-cobalt">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* footer nav */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-8">
          <Link href="/#work" className="font-mono text-xs uppercase tracking-[0.05em] text-cobalt hover:underline">
            ← Back to all work
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            Get in touch →
          </a>
        </div>
      </article>

      <footer className="border-t border-hair">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-3 px-6 py-9 font-mono text-[11px] tracking-[0.04em] text-ink-3 sm:flex-row sm:px-8">
          <span>© 2026 Aleksandrs Drozdovs</span>
          <Link href="/" className="hover:text-cobalt">
            aleksandrs-portfolio.vercel.app
          </Link>
        </div>
      </footer>
    </main>
  )
}
