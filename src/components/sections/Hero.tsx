import { hireSignals, personalInfo, heroStats } from '@/lib/data'
import { HeroStat } from '@/components/ui/HeroStat'
import { StatusPill } from '@/components/ui/StatusPill'

// Entrance is pure CSS (globals.css .rise) — the hero ships visible in the HTML and
// animates without waiting for hydration. No JS, no blank first paint on slow networks.
export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden px-[clamp(16px,4vw,32px)] py-16">
      <div className="signal-field" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex max-w-3xl flex-col gap-7">
            <div className="rise rise-1 flex flex-wrap items-center gap-3">
              <StatusPill label={personalInfo.status} />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-muted">{personalInfo.location}</span>
            </div>

            <p className="rise rise-2 font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
              {personalInfo.eyebrow}
            </p>

            <h1 className="rise rise-3 max-w-[820px] font-display text-[clamp(3.3rem,8vw,6.8rem)] font-black leading-[0.94]">
              {personalInfo.headline}{' '}
              <span className="text-proof">{personalInfo.headlineAccent}</span>
            </h1>

            <p className="rise rise-4 max-w-[650px] text-lg leading-8 text-text-secondary md:text-xl">
              {personalInfo.subline}
            </p>

            <div className="rise rise-5 grid gap-3 sm:max-w-2xl sm:grid-cols-3">
              {heroStats.map((stat, i) => (
                <HeroStat key={stat.label} value={stat.value} label={stat.label} delay={0.05 * i} />
              ))}
            </div>

            <div className="rise rise-6 flex flex-wrap gap-3">
              <a href="#featured-work" className="btn-primary active:scale-[0.98]">
                See the proof
              </a>
              <a href={`mailto:${personalInfo.email}`} className="btn-secondary active:scale-[0.98]">
                Email me
              </a>
              <a href={personalInfo.cvUrl} download className="btn-ghost active:scale-[0.98]">
                Download CV
              </a>
            </div>
          </div>

          <aside
            className="rise rise-4 proof-panel hud-corners relative overflow-hidden rounded-md p-6"
            aria-label="Hiring snapshot"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-proof/70" aria-hidden />
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-proof">Hiring snapshot</p>
            <dl className="divide-y divide-border">
              {hireSignals.map((signal) => (
                <div key={signal.label} className="grid grid-cols-[120px_1fr] gap-5 py-4">
                  <dt className="font-mono text-[11px] uppercase text-text-muted">{signal.label}</dt>
                  <dd className="text-sm leading-6 text-text-primary">{signal.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-sm text-sm leading-6 text-text-secondary">
              I am not trying to look like every other junior dev portfolio. The pitch is simple: I can build,
              test, explain, and keep my head when the numbers matter.
            </p>
          </aside>
        </div>
      </div>

      <div
        className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-proof md:flex"
        aria-hidden
      >
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-transparent via-proof/80 to-transparent" />
        <span className="h-1.5 w-1.5 rounded-full bg-proof" />
      </div>
    </section>
  )
}
