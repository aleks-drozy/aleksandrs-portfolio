import Link from 'next/link'
import Image from 'next/image'
import { SiteNav } from '@/components/SiteNav'
import { Reveal } from '@/components/Reveal'
import { EquityCurve } from '@/components/EquityCurve'
import {
  site,
  heroMetrics,
  exhibits,
  alsoShipped,
  experience,
  education,
  skillGroups,
  character,
} from '@/lib/data'

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
                {site.headline}
                <br />
                <em className="italic text-cobalt">{site.headlineAccent}</em>
              </h1>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-2">{site.lede}</p>

              <dl className="mt-9 flex flex-wrap gap-9">
                {heroMetrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-serif text-[1.9rem] leading-none tracking-[-0.01em] text-cobalt">{m.value}</dd>
                    <dt className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">{m.label}</dt>
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
            <SectionHeader eyebrow="Selected work" title="Six exhibits, one direction." index="02 / EVIDENCE" />

            <div>
              {exhibits.map((ex, i) => (
                <Reveal
                  key={ex.slug}
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
                    <Link
                      href={`/projects/${ex.slug}`}
                      className="mt-4 inline-block font-mono text-xs text-cobalt hover:underline"
                    >
                      Open case study →
                    </Link>
                  </div>

                  {ex.stats && (
                    <div className="flex gap-6 md:flex-col md:gap-4 md:pt-1 md:text-right">
                      {ex.stats.map((s) => (
                        <div key={s.label}>
                          <div className="font-serif text-[1.35rem] leading-none tracking-[-0.01em] text-ink">{s.value}</div>
                          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            {/* also shipped */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {alsoShipped.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60} className="border-t border-hair pt-4">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-cobalt">Also shipped</div>
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
            <SectionHeader eyebrow="Track record" title="Real work, research, and pressure." index="03 / RECORD" />

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
                    {education.degree} — {education.honours}
                  </h4>
                  <div className="text-sm text-cobalt">{education.org}</div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    Two live full-stack SaaS products on Next.js, TypeScript, and Supabase, backed by 790+ automated
                    tests, CI/CD, and Row-Level Security on every table. Final-year project: an automated NASDAQ-100
                    futures strategy — followed by a six-phase, pre-registered research program that honestly
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
            <SectionHeader eyebrow="Toolbox" title="The stack I can actually work in." index="04 / STACK" />

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
              title="Composure, tested twice over."
              index="05 / CHARACTER"
            />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {character.map((c, i) => (
                <Reveal key={c.title} delay={i * 80} className="border-l-2 border-cobalt pl-6">
                  <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt">{c.title}</h4>
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
              Hiring for 2026? <em className="italic text-cobalt">Let&rsquo;s talk.</em>
            </h2>
            <p className="mt-5 max-w-[52ch] text-ink-2">
              Open to graduate software engineering, full-stack, AI, fintech, and data-tooling roles. Best next step is
              email or LinkedIn.
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
