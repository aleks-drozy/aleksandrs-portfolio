'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useInView, useReducedMotion } from 'framer-motion'
import { evidenceStations } from '@/lib/evidence-rail'
import { getCaseStudy } from '@/lib/case-studies'
import { EvidenceLedgerTable } from './EvidenceLedgerTable'
import type { EvidenceRailCommand } from './EvidenceRailScene'

const EvidenceRailScene = dynamic(() => import('./EvidenceRailScene').then((m) => m.EvidenceRailScene), {
  ssr: false,
  loading: () => <EvidenceLedgerTable />,
})

const N = evidenceStations.length

function DetailPanel({ index }: { index: number }) {
  const station = evidenceStations[index]
  const caseStudy = getCaseStudy(station.slug)

  return (
    <div className="flex h-full flex-col justify-between border border-hair bg-surface p-5">
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-cobalt">
          {station.fig} · {station.kicker}
        </div>
        <h3 className="mt-2 font-serif text-xl font-medium leading-tight tracking-[-0.01em]">{station.title}</h3>
        <span
          className={`mt-2.5 inline-block rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${
            station.verdict === 'pos' ? 'bg-pos/10 text-pos' : 'bg-neg/10 text-neg'
          }`}
        >
          {station.verdict === 'pos' ? 'Verified' : 'Not proven / pending'}
        </span>
        <dl className="mt-4 flex flex-col gap-2">
          {station.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline justify-between gap-3 border-t border-hair pt-2">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">{m.label}</dt>
              <dd className="font-mono text-sm text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 border-t border-hair pt-4 font-mono text-xs">
        <Link href={station.href} className="text-cobalt hover:underline">
          Case study →
        </Link>
        {caseStudy?.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith('/') ? undefined : '_blank'}
            rel={l.href.startsWith('/') ? undefined : 'noopener noreferrer'}
            className="text-ink-3 hover:text-cobalt"
          >
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  )
}

export function EvidenceRailSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '200px' })
  const reduce = useReducedMotion()
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [command, setCommand] = useState<EvidenceRailCommand | null>(null)
  const nonceRef = useRef(0)

  const sendCommand = (type: EvidenceRailCommand['type'], value: number) => {
    nonceRef.current += 1
    setCommand({ type, value, nonce: nonceRef.current })
  }

  // Derived, not stateful: the aria-live announcement is a pure function of
  // focusedIndex, so it is computed during render rather than mirrored into
  // its own state via an effect.
  const focusedStation = evidenceStations[focusedIndex]
  const announcement = `Station ${focusedIndex + 1} of ${N}. ${focusedStation.fig}, ${focusedStation.title}. ${
    focusedStation.metrics[0] ? `${focusedStation.metrics[0].value} ${focusedStation.metrics[0].label}.` : ''
  } Ranked number ${focusedIndex + 1} of ${N} by evidence score.`

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      sendCommand('step', -1)
      setFocusedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      sendCommand('step', 1)
      setFocusedIndex((i) => Math.min(i + 1, N - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      sendCommand('goTo', 0)
      setFocusedIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      sendCommand('goTo', N - 1)
      setFocusedIndex(N - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      window.location.href = evidenceStations[focusedIndex].href
    }
  }

  const step = (delta: number) => {
    sendCommand('step', delta)
    setFocusedIndex((i) => Math.min(Math.max(i + delta, 0), N - 1))
  }

  return (
    <div className="mb-14">
      {/* Screen-reader-first index: the entire rail is traversable without
          ever engaging the 3D view. */}
      <ol className="sr-only">
        {evidenceStations.map((s) => (
          <li key={s.slug}>
            <Link href={s.href}>
              {s.fig} — {s.title}, score {s.score} of {N}, {s.verdict === 'pos' ? 'verified' : 'not proven or pending'}
            </Link>
          </li>
        ))}
      </ol>

      {reduce ? (
        <EvidenceLedgerTable />
      ) : (
        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]"
        >
          <div className="flex flex-col gap-3">
            <div
              tabIndex={0}
              role="group"
              aria-label="Interactive corridor of nine exhibits ordered by evidence score. Use left and right arrow keys to move between stations, Home and End to jump to the first or last, and Enter to open the focused case study."
              onKeyDown={handleKeyDown}
              className="relative aspect-[16/10] w-full overflow-hidden border border-hair bg-surface sm:aspect-[16/8]"
            >
              {inView ? (
                <EvidenceRailScene focusedIndex={focusedIndex} onFocusChange={setFocusedIndex} command={command} />
              ) : (
                <EvidenceLedgerTable />
              )}
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-ink-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={focusedIndex === 0}
                  aria-label="Previous exhibit"
                  className="rounded-sm border border-hair px-2.5 py-1 hover:border-cobalt hover:text-cobalt disabled:opacity-30"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={focusedIndex === N - 1}
                  aria-label="Next exhibit"
                  className="rounded-sm border border-hair px-2.5 py-1 hover:border-cobalt hover:text-cobalt disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
              <span>Drag to walk the row · Station {focusedIndex + 1} / {N}</span>
            </div>

            <div aria-live="polite" className="sr-only">
              {announcement}
            </div>
          </div>

          <DetailPanel index={focusedIndex} />
        </div>
      )}
    </div>
  )
}
