'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { evidenceStations, type EvidenceStation } from '@/lib/evidence-rail'

// The universal fallback for the Evidence Rail: a plain, sortable HTML
// table carrying the exact same data as the 3D corridor (one source of
// truth, src/lib/evidence-rail.ts). It is rendered for prefers-reduced-motion,
// while the 3D scene's dynamic import is still in flight, and on devices
// that fail the WebGL/low-end capability check — so it is never a degraded
// consolation prize, it is on-brand in the Chiang plain-ledger sense.

type SortKey = 'score' | 'fig' | 'title' | 'verdict'
type SortDir = 'asc' | 'desc'

function compare(a: EvidenceStation, b: EvidenceStation, key: SortKey): number {
  if (key === 'score') return a.score - b.score
  return String(a[key]).localeCompare(String(b[key]))
}

export function EvidenceLedgerTable() {
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const rows = useMemo(() => {
    const sorted = [...evidenceStations].sort((a, b) => compare(a, b, sortKey))
    return sortDir === 'asc' ? sorted : sorted.reverse()
  }, [sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const headerButton = (key: SortKey, label: string) => (
    <button
      type="button"
      onClick={() => toggleSort(key)}
      className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 hover:text-cobalt"
      aria-label={`Sort by ${label}${sortKey === key ? `, currently ${sortDir}ending` : ''}`}
    >
      {label}
      {sortKey === key && <span aria-hidden="true">{sortDir === 'asc' ? '↑' : '↓'}</span>}
    </button>
  )

  return (
    <figure className="m-0 border border-hair bg-surface p-5 shadow-[0_18px_40px_-28px_rgba(18,21,28,0.35)]">
      <figcaption className="mb-3 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
        <span>
          Fig. 00 — index <span className="text-ink">Nine exhibits, ranked</span>
        </span>
        <span>Ledger view</span>
      </figcaption>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Nine exhibits ranked by evidence score, with verdict and headline metric, each linking to its case study.
          </caption>
          <thead>
            <tr className="border-b border-hair">
              <th scope="col" className="py-2 pr-3">
                {headerButton('fig', 'Fig')}
              </th>
              <th scope="col" className="py-2 pr-3">
                {headerButton('title', 'Exhibit')}
              </th>
              <th scope="col" className="py-2 pr-3">
                {headerButton('score', 'Score')}
              </th>
              <th scope="col" className="py-2 pr-3">
                {headerButton('verdict', 'Verdict')}
              </th>
              <th scope="col" className="py-2 pr-3">
                Headline metric
              </th>
              <th scope="col" className="py-2">
                Case study
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-hair last:border-b-0">
                <td className="py-2.5 pr-3 font-mono text-xs text-cobalt">{r.fig}</td>
                <td className="py-2.5 pr-3 font-medium text-ink">{r.title}</td>
                <td className="py-2.5 pr-3 font-mono text-xs text-ink-2">{r.score}/{evidenceStations.length}</td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${
                      r.verdict === 'pos' ? 'bg-pos/10 text-pos' : 'bg-neg/10 text-neg'
                    }`}
                  >
                    {r.verdict === 'pos' ? 'Verified' : 'Not proven / pending'}
                  </span>
                </td>
                <td className="py-2.5 pr-3 font-mono text-xs text-ink-2">
                  {r.metrics[0] ? `${r.metrics[0].value} ${r.metrics[0].label}` : '—'}
                </td>
                <td className="py-2.5">
                  <Link href={r.href} className="font-mono text-xs text-cobalt hover:underline">
                    Open →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
