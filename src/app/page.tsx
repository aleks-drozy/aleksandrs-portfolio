import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SiteNav } from '@/components/SiteNav'
import { Reveal } from '@/components/Reveal'
import { EquityCurve } from '@/components/EquityCurve'
import { OptionSurfacePanel } from '@/components/OptionSurfacePanel'
import { VolSmilePanel } from '@/components/VolSmilePanel'
import BlurText from '@/components/BlurText'
import { MetricValue } from '@/components/MetricValue'
import { Disclosure } from '@/components/Disclosure'
import {
  site,
  heroMetrics,
  exhibits,
  alsoShipped,
  ossIntro,
  ossContributions,
  ossUnderReview,
  experience,
  education,
  skillGroups,
  character,
} from '@/lib/data'
import { getCaseStudy } from '@/lib/case-studies'

const CONTAINER = 'mx-auto w-full max-w-[1180px] px-6 sm:px-8'

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Software Engineer',
  email: `mailto:${site.email}`,
  url: 'https://aleksandrs-portfolio.vercel.app',
  address: { '@type': 'PostalAddress', addressLocality: 'Dublin', addressCountry: 'IE' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Maynooth University' },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ['Software Engineering', 'Full-stack development', 'AI agents', 'Quantitative trading', 'Next.js', 'TypeScript'],
}

function SectionHeader({ eyebrow, title, index }: { eyebrow: string; title: string; index: string }) {
  return (
    <div className="mb-11 flex items-end justify-between gap-6">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3.5 max-w-[20ch] text-balance font-serif text-[clamp(1.6rem,3.4vw,2.35rem)] font-medium leading-[1.1] tracking-[-0.015em]">
          {title}
        </h2>
      </div>
      <span className="hidden shrink-0 font-mono text-xs tracking-[0.1em] text-ink-3 sm:block">{index}</span>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <SiteNav />

      <main id="top">
        {/* ---------- HERO ---------- */}
        <header className="border-b border-hair">
          <div className={`${CONTAINER} grid grid-cols-1 items-center gap-14 pb-16 pt-20 md:pt-24 lg:grid-cols-[1.05fr_0.95fr]`}>
            <div>
              <div className="mb-6 flex items-center gap-4">
                <Image
                  src="/headshot.png"
                  alt="Aleksandrs Drozdovs"
                  width={88}
                  height={88}
                  priority
                  className="h-[68px] w-[68px] rounded-full border border-hair object-cover shadow-[0_8px_22px_-10px_rgba(18,21,28,0.45)] ring-1 ring-cobalt/10 sm:h-[76px] sm:w-[76px]"
                />
                <div className="leading-tight">
                  <div className="font-serif text-lg text-ink">{site.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">Dublin · Maynooth 2026</div>
                </div>
              </div>
              <span className="eyebrow">
                {site.status} · {site.location}
              </span>
              <h1 className="mt-5 text-balance font-serif text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                <BlurText
                  as="span"
                  text={site.headline}
                  animateBy="words"
                  delay={90}
                  stepDuration={0.5}
                  easing={[0.23, 1, 0.32, 1]}
                  animationFrom={{ filter: 'blur(8px)', opacity: 0, y: 12 }}
                  animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
                />
                <BlurText
                  as="span"
                  className="italic text-cobalt"
                  text={site.headlineAccent}
                  animateBy="words"
                  delay={90}
                  stepDuration={0.5}
                  easing={[0.23, 1, 0.32, 1]}
                  animationFrom={{ filter: 'blur(8px)', opacity: 0, y: 12 }}
                  animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
                />
              </h1>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-2">{site.lede}</p>

              <dl className="mt-9 flex flex-wrap gap-9">
                {heroMetrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-serif text-[1.9rem] leading-none tracking-[-0.01em] text-cobalt">
                      <MetricValue value={m.value} duration={1.2} />
                    </dd>
                    <dt className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                      <a href={m.href} className="border-b border-transparent transition-colors hover:border-cobalt hover:text-cobalt">
                        {m.label} ↓
                      </a>
                    </dt>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3.5">
                <a href="#work" className="btn btn-primary">
                  See the proof →
                </a>
                <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Download CV
                </a>
              </div>
            </div>

            <Reveal>
              <EquityCurve />
            </Reveal>
          </div>
        </header>

        {/* ---------- SELECTED WORK ---------- */}
        <section id="work">
          <div className={`${CONTAINER} py-20 md:py-28`}>
            <SectionHeader eyebrow="Selected work" title="Nine exhibits, one direction." index="02 / EVIDENCE" />

            <div>
              {exhibits.map((ex, i) => {
                const caseLinks = getCaseStudy(ex.slug)?.links ?? []
                const githubLink = caseLinks.find((l) => l.label === 'GitHub')
                const liveLink = caseLinks.find((l) => l.label.startsWith('Live'))
                return (
                <Fragment key={ex.slug}>
                <Reveal
                  as="article"
                  className={`grid grid-cols-1 items-start gap-7 py-7 md:grid-cols-[100px_1fr_auto] ${
                    i === 0 ? 'border-t border-ink' : 'border-t border-hair'
                  }`}
                >
                  <div className="pt-1 font-mono text-xs tracking-[0.06em] text-cobalt">
                    {ex.fig}
                    <span className="mt-1.5 block text-[10px] uppercase tracking-[0.12em] text-ink-3">{ex.kicker}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-[1.45rem] font-medium leading-tight tracking-[-0.01em]">
                      <Link href={`/projects/${ex.slug}`} className="transition-colors hover:text-cobalt">
                        {ex.title}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">{ex.blurb}</p>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {ex.tags.map((t) => (
                        <span key={t} className="rounded-sm border border-hair px-2.5 py-1 font-mono text-[11px] text-ink-3">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/projects/${ex.slug}`}
                        className="font-mono text-xs text-cobalt hover:underline"
                      >
                        Open case study →
                      </Link>
                      {githubLink && (
                        <a
                          href={githubLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-ink-3 hover:text-cobalt"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {liveLink && (
                        <a
                          href={liveLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-ink-3 hover:text-cobalt"
                        >
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {ex.stats && (
                    <div className="flex gap-6 md:flex-col md:gap-4 md:pt-1 md:text-right">
                      {ex.stats.map((s) => (
                        <div key={s.label}>
                          <div className="font-serif text-[1.35rem] leading-none tracking-[-0.01em] text-ink">
                            <MetricValue value={s.value} duration={1.2} />
                          </div>
                          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>
                {ex.slug === 'options-pricing-engine' && (
                  <div className="mb-2 md:ml-[128px]">
                    <Disclosure label="Fig. 02a · Live Black-Scholes price surface" hint="Interactive · WebGL">
                      <OptionSurfacePanel />
                    </Disclosure>
                    <Disclosure label="Fig. 02b · SPY implied-volatility smile" hint="Real chain snapshot · WebGL">
                      <VolSmilePanel />
                    </Disclosure>
                  </div>
                )}
                </Fragment>
                )
              })}
            </div>

          </div>
        </section>

        {/* ---------- OPEN SOURCE ---------- */}
        <section id="open-source" className="border-t border-hair">
          <div className={`${CONTAINER} py-20 md:py-28`}>
            <SectionHeader eyebrow="Open source" title="Merged upstream, under other people's review." index="03 / UPSTREAM" />

            <Reveal>
              <p className="-mt-4 mb-10 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">{ossIntro}</p>
            </Reveal>

            <div>
              {ossContributions.map((c, i) => (
                <Reveal
                  as="article"
                  key={c.prUrl}
                  className={`grid grid-cols-1 items-start gap-4 py-6 md:grid-cols-[180px_1fr_auto] md:gap-7 ${
                    i === 0 ? 'border-t border-ink' : 'border-t border-hair'
                  }`}
                >
                  <div className="pt-0.5 font-mono text-xs tracking-[0.06em] text-cobalt">
                    {c.repo}
                    <span className="mt-1.5 block text-[10px] uppercase tracking-[0.12em] text-ink-3">{c.org}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-ink-3">
                      Merged {c.merged}
                    </span>
                  </div>
                  <p className="max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">{c.summary}</p>
                  <a
                    href={c.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-cobalt hover:underline md:pt-0.5"
                  >
                    PR {c.prNumber} ↗
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.02em] text-ink-3">{ossUnderReview}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- ALSO SHIPPED ---------- */}
        <section id="also-shipped" className="border-t border-hair">
          <div className={`${CONTAINER} py-20 md:py-28`}>
            <SectionHeader eyebrow="Also shipped" title="The rest of the ledger." index="04 / ARCHIVE" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {alsoShipped.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60} className="border-t border-hair pt-4">
                  <h4 className="mb-1.5 mt-2 font-semibold">
                    <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-cobalt">
                      {p.title}
                    </Link>
                  </h4>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-2">{p.blurb}</p>
                  <div className="mt-3 flex gap-4 font-mono text-[11px]">
                    <Link href={`/projects/${p.slug}`} className="text-cobalt hover:underline">
                      Details →
                    </Link>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-ink-3 hover:text-cobalt">
                        GitHub ↗
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-ink-3 hover:text-cobalt">
                        Live ↗
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- EXPERIENCE & EDUCATION ---------- */}
        <section id="experience" className="border-t border-hair">
          <div className={`${CONTAINER} py-20 md:py-28`}>
            <SectionHeader eyebrow="Track record" title="Real work, research, and pressure." index="05 / RECORD" />

            <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
              <div>
                {experience.map((e, i) => (
                  <Reveal key={e.org} className={`py-5 ${i === 0 ? '' : 'border-t border-hair'}`}>
                    <div className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
                      {e.when} · {e.location}
                    </div>
                    <h4 className="mt-1.5 font-semibold">{e.role}</h4>
                    <div className="text-sm text-cobalt">{e.org}</div>
                    <ul className="mt-3 flex flex-col gap-2">
                      {e.bullets.map((b, bi) => (
                        <li key={bi} className="pl-4 text-sm leading-relaxed text-ink-2 [text-indent:-1rem]">
                          <span className="mr-2 text-cobalt">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>

              <div>
                <Reveal className="py-5">
                  <div className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
                    {education.when} · {education.location}
                  </div>
                  <h4 className="mt-1.5 font-semibold">
                    {education.degree} – {education.honours}
                  </h4>
                  <div className="text-sm text-cobalt">{education.org}</div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    Two live full-stack SaaS products on Next.js, TypeScript, and Supabase, backed by 790+ automated
                    tests, CI/CD, and Row-Level Security on every table. Final-year project: an automated NASDAQ-100
                    futures strategy, followed by a six-phase, pre-registered research program that honestly
                    disproved its backtest edge. Industrial placement: DLT Capital.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {education.coursework.map((c) => (
                      <span key={c} className="rounded-sm border border-hair px-2.5 py-1 font-mono text-[11px] text-ink-3">
                        {c}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal className="border-t border-hair py-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">Certifications</div>
                  <ul className="mt-2.5 flex flex-col gap-1.5">
                    {education.certifications.map((c) => (
                      <li key={c} className="text-sm text-ink-2">
                        {c}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- SKILLS ---------- */}
        <section id="skills" className="border-t border-hair">
          <div className={`${CONTAINER} py-20 md:py-28`}>
            <SectionHeader eyebrow="Toolbox" title="The stack I can actually work in." index="06 / STACK" />

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {skillGroups.map((g, i) => (
                <Reveal key={g.name} delay={i * 60}>
                  <h5 className="mb-3.5 border-b border-hair pb-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                    {g.name}
                  </h5>
                  <ul className="flex flex-col gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="text-sm text-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CHARACTER ---------- */}
        <section id="character" className="border-t border-hair">
          <div className={`${CONTAINER} py-20 md:py-28`}>
            <SectionHeader
              eyebrow="The stuff that changes how I work"
              title="Composure, tested three ways."
              index="07 / CHARACTER"
            />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {character.map((c, i) => (
                <Reveal key={c.title} delay={i * 80} className="border-t border-ink pt-5">
                  <div className="font-mono text-xs tracking-[0.06em] text-cobalt">0{i + 1}</div>
                  <h4 className="mb-2.5 mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">{c.title}</h4>
                  <p className="text-[0.95rem] leading-relaxed text-ink-2">{c.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="border-t border-hair">
          <div className={`${CONTAINER} py-20 md:py-28`}>
            <span className="eyebrow">Get in touch</span>
            <h2 className="mt-3.5 max-w-[16ch] text-balance font-serif text-[clamp(1.9rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              Hiring a graduate engineer? <em className="italic text-cobalt">Let&rsquo;s talk.</em>
            </h2>
            <p className="mt-5 max-w-[52ch] text-ink-2">
              Available now in Dublin, or remote across the EU and UK. Graduate software engineering, quantitative
              development, AI, fintech, and data-tooling roles. Best next step is email or LinkedIn.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block border-b border-cobalt/25 font-serif text-[clamp(1.25rem,3vw,1.9rem)] text-cobalt transition-colors hover:border-cobalt"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-6 font-mono text-[13px] text-ink-2">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt">
                LinkedIn ↗
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt">
                GitHub ↗
              </a>
              <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt">
                Download CV ↗
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-hair">
          <div className={`${CONTAINER} flex flex-col items-center justify-between gap-3 py-9 font-mono text-[11px] tracking-[0.04em] text-ink-3 sm:flex-row`}>
            <span>© 2026 Aleksandrs Drozdovs</span>
            <span>Built with Next.js · Tailwind · Deployed on Vercel</span>
          </div>
        </footer>
      </main>
    </>
  )
}
