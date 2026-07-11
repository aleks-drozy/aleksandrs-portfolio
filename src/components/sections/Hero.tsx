import { hireSignals, personalInfo, heroStats } from '@/lib/data'
import { HeroStat } from '@/components/ui/HeroStat'
import { StatusPill } from '@/components/ui/StatusPill'

// Entrance is pure CSS (globals.css .rise) — the hero ships visible in the HTML and
// animates without waiting for hydration. The orb is the app's own arc reactor, CSS-only.
export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden px-[clamp(16px,4vw,32px)] py-16">
      <div className="signal-field" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="flex max-w-3xl flex-col gap-7">
            <div className="rise rise-1 flex flex-wrap items-center gap-3">
              <StatusPill label={personalInfo.status} />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-muted">{personalInfo.location}</span>
            </div>

            <p className="rise rise-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
              <span className="inline-block h-px w-6 bg-accent/60" aria-hidden />
              {personalInfo.eyebrow}
            </p>

            <h1 className="rise rise-3 max-w-[820px] font-display text-[clamp(3rem,7vw,5.8rem)] font-light leading-[1.02] tracking-[-0.01em]">
              {personalInfo.headline}{' '}
              <span className="font-medium text-accent [text-shadow:0_0_28px_color-mix(in_oklch,var(--color-accent)_38%,transparent)]">
                {personalInfo.headlineAccent}
              </span>
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

          <div className="rise rise-4 hidden flex-col items-center gap-10 lg:flex">
            <div className="orb-wrap" aria-hidden>
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" strokeWidth="1.5" strokeOpacity="0.9" strokeDasharray="2 4" />
                <circle className="orb-r2" cx="60" cy="60" r="44" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="30 14 6 14" />
                <circle className="orb-r3" cx="60" cy="60" r="34" strokeWidth="3" strokeOpacity="0.25" strokeDasharray="1 7" />
              </svg>
              <div className="orb-core" />
            </div>

            <aside
              className="hud-corners relative w-full border-y border-border/60 px-6 py-5"
              aria-label="Hiring snapshot"
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-accent">Hiring snapshot</p>
              <dl className="divide-y divide-border/60">
                {hireSignals.map((signal) => (
                  <div key={signal.label} className="grid grid-cols-[110px_1fr] gap-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">{signal.label}</dt>
                    <dd className="text-sm leading-6 text-text-primary">{signal.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </div>

      <div
        className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-accent md:flex"
        aria-hidden
      >
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-transparent via-accent/80 to-transparent" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
    </section>
  )
}
