import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const REPO_URL = 'https://github.com/aleks-drozy/jarvis'
const TRAILER_URL = 'https://github.com/aleks-drozy/jarvis/blob/master/docs/media/trailer.mp4'

export const metadata: Metadata = {
  title: 'JARVIS — Voice-Controlled AI Butler | Case Study | Aleksandrs Drozdovs',
  description:
    'JARVIS is a voice-controlled AI agent that runs my mornings unattended: local whisper.cpp speech-to-text, a Claude agent brain with hard-coded safety rules, an Iron-Man-style Electron HUD, and a scheduled 08:30 briefing pipeline.',
}

const METRICS = [
  { label: 'Voice', value: 'Local STT' },
  { label: 'Brain', value: 'Claude' },
  { label: 'HUD', value: 'Electron' },
  { label: 'Briefing', value: '08:30' },
  { label: 'Speech→reply', value: '~12s' },
  { label: 'Source', value: 'Public' },
]

export default function JarvisCaseStudy() {
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
              <p className="mb-3 font-mono text-[11px] uppercase text-proof">Case Study / AI Agent</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
                <span className="text-proof">JARVIS</span>
              </h1>
              <p className="mt-2 font-mono text-sm text-text-muted">A butler, not a chatbot.</p>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                A voice-controlled AI butler that runs my mornings without me touching anything. He reads my git
                history and cites commit hashes, sweeps Dublin job boards overnight, coaches my budget, and emails
                me a briefing at 08:30 before I wake. Press a hotkey anywhere, speak, and he answers out loud —
                my voice never leaves the laptop.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
                <span className="rounded-md border border-border bg-surface px-2 py-1">Electron</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">whisper.cpp</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Claude agent skill</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">edge-tts</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">PowerShell collectors</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Obsidian memory</span>
              </div>
            </header>

            <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-lg border border-border bg-surface p-4">
                  <p className="font-display text-xl font-bold tabular-nums text-proof">{m.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-text-muted">{m.label}</p>
                </div>
              ))}
            </div>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">What he does, unattended</h2>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-3"><span className="text-proof">+</span>Emails a morning briefing at 08:30 via a scheduled headless pipeline — projects, calendar, inbox, job search, budget — before I&apos;m awake.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Voice in, voice out: hotkey → orb turns amber and listens → local whisper.cpp transcription → Claude agent acts → spoken reply. Speech never leaves the machine.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Grounds every claim in a source: commit hashes, tracker rows, file names. If he can&apos;t cite it, he says &quot;unavailable&quot; instead of inventing it.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>Tracks my job applications and follow-up deadlines from real inbox signals, and coaches my weekly budget from a ledger he maintains himself.</li>
              </ul>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">Trust engineering</h2>
              <p className="leading-relaxed text-text-secondary">
                An agent that acts unattended needs rules it cannot talk itself out of. Jarvis can never move money —
                finance is read-and-advise only. He can physically only email me: the recipient is hard-coded in the
                send script. Anything outward-facing (applications, posts, messages) is drafted to files stamped
                &quot;REVIEW — NOT SENT&quot; for me to send myself. Credentials live DPAPI-encrypted outside the
                repo, and the inbox reader records sender and subject only, never message bodies.
              </p>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">Battle scars (real bugs, shipped and fixed)</h2>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-3"><span className="text-proof">+</span>The &quot;warm&quot; chat session was silently dead for two days — one missing CLI flag, hidden because stderr was never captured. Found by analysing a broken demo recording frame by frame. Replies went from ~30s to ~3s.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>The 08:30 briefing skipped a morning: the laptop was asleep and Windows&apos; default DisallowStartIfOnBatteries blocked the catch-up run. Both battery conditions now stripped at registration.</li>
                <li className="flex gap-3"><span className="text-proof">+</span>The trailer&apos;s arc-reactor cold open isn&apos;t stock footage — it&apos;s the app&apos;s own UI rendered deterministically frame-by-frame, because the screen recorder stuttered under compositing load.</li>
              </ul>
            </section>

            <section className="mb-16 space-y-4">
              <h2 className="font-display text-2xl font-bold text-text-primary">Why it matters</h2>
              <p className="leading-relaxed text-text-secondary">
                Writing an agent skill is a strange kind of programming: behaviour, boundaries, and judgment defined
                in prose, then scaffolding engineered so the agent can act on it safely without supervision. Prompt
                engineering meets systems engineering — scheduled headless runs, encrypted credentials, failure
                alarms so a silent crash can&apos;t pretend to be a quiet day. Built in public, with the demo videos
                and the battle scars in the README.
              </p>
            </section>

            <section className="border-t border-border pt-10">
              <div className="flex flex-wrap gap-3">
                <Link href={REPO_URL} target="_blank" rel="noopener noreferrer" className="btn-primary active:scale-[0.97]">
                  View the repo
                </Link>
                <Link href={TRAILER_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary active:scale-[0.97]">
                  Watch the trailer
                </Link>
                <Link href="/#featured-work" className="btn-ghost active:scale-[0.97]">
                  Back to portfolio
                </Link>
              </div>
              <p className="mt-5 font-mono text-xs text-text-muted">
                Source is public — voice pipeline, agent skill, HUD, and the scheduled briefing system.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
