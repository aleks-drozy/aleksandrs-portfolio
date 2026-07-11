'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FYP_EQUITY_POINTS, FYP_RESULTS } from '@/lib/fyp-data'

export function EquityCurve() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  const minPnl = Math.min(0, ...FYP_EQUITY_POINTS.map((p) => p.pnl))
  const maxPnl = Math.max(...FYP_EQUITY_POINTS.map((p) => p.pnl))
  const range = maxPnl - minPnl || 1
  const n = FYP_EQUITY_POINTS.length

  const toXY = (pnl: number, i: number): [number, number] => {
    const x = (i / (n - 1)) * 100
    const y = 94 - ((pnl - minPnl) / range) * 88
    return [x, y]
  }

  const pts = FYP_EQUITY_POINTS.map((p, i) => toXY(p.pnl, i))
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
  const area = `${line} L 100 100 L 0 100 Z`
  const zeroY = 94 - ((0 - minPnl) / range) * 88
  const [endX, endY] = pts[pts.length - 1]

  return (
    <figure className="m-0 border border-hair bg-surface p-5 shadow-[0_18px_40px_-28px_rgba(18,21,28,0.35)]">
      <figcaption className="mb-3 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
        <span>
          Fig. 01 — <span className="text-ink">NASDAQ-100 FYP strategy</span>
        </span>
        <span>Equity · in-sample</span>
      </figcaption>

      <div className="relative aspect-[16/9] w-full">
        <svg
          ref={ref}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
          role="img"
          aria-label="Cumulative profit and loss across 72 trades, January 2025 to February 2026, ending at plus 28,400 dollars"
        >
          <defs>
            <linearGradient id="eqFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-cobalt)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-cobalt)" stopOpacity="0" />
            </linearGradient>
            <pattern id="eqGrid" x="0" y="0" width="12.5" height="22" patternUnits="userSpaceOnUse">
              <path d="M 12.5 0 L 0 0 0 22" fill="none" stroke="var(--color-hair-2)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <rect width="100" height="100" fill="url(#eqGrid)" />

          <line
            x1="0"
            y1={zeroY}
            x2="100"
            y2={zeroY}
            stroke="var(--color-ink-3)"
            strokeWidth="0.4"
            strokeDasharray="1.2 1.4"
            vectorEffect="non-scaling-stroke"
          />

          <motion.path
            d={area}
            fill="url(#eqFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />

          <motion.path
            d={line}
            fill="none"
            stroke="var(--color-cobalt)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
            vectorEffect="non-scaling-stroke"
          />

          <motion.circle
            cx={endX}
            cy={endY}
            r="2"
            fill="var(--color-cobalt)"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
          />
        </svg>

        <span className="pointer-events-none absolute bottom-1.5 left-0 font-mono text-[10px] text-ink-3">Jan 2025</span>
        <span className="pointer-events-none absolute bottom-1.5 right-0 font-mono text-[10px] text-ink-3">Feb 2026</span>
      </div>

      <div className="mt-3.5 flex gap-6 border-t border-hair pt-3.5">
        <div className="font-mono text-[11px] text-ink-3">
          <span className="mb-0.5 block text-base tracking-[-0.01em] text-pos">{FYP_RESULTS.inSample.netPnl}</span>
          Net P&amp;L
        </div>
        <div className="font-mono text-[11px] text-ink-3">
          <span className="mb-0.5 block text-base tracking-[-0.01em] text-ink">{FYP_RESULTS.inSample.winRate}</span>
          Win rate
        </div>
        <div className="font-mono text-[11px] text-ink-3">
          <span className="mb-0.5 block text-base tracking-[-0.01em] text-ink">{FYP_RESULTS.inSample.profitFactor}</span>
          Profit factor
        </div>
      </div>
    </figure>
  )
}
