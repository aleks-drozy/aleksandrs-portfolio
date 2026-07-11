'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FYP_EQUITY_POINTS, FYP_RESULTS } from '@/lib/fyp-data'

// real 16:9 coordinate space — uniform scaling, no stretching
const W = 720
const H = 405
const PX = 8 // horizontal padding
const PT = 26 // top padding
const PB = 30 // bottom padding

export function EquityCurve() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  const pnls = FYP_EQUITY_POINTS.map((p) => p.pnl)
  const minPnl = Math.min(0, ...pnls)
  const maxPnl = Math.max(...pnls)
  const range = maxPnl - minPnl || 1
  const n = FYP_EQUITY_POINTS.length

  const xAt = (i: number) => PX + (i / (n - 1)) * (W - PX * 2)
  const yAt = (v: number) => PT + (1 - (v - minPnl) / range) * (H - PT - PB)

  const pts = FYP_EQUITY_POINTS.map((p, i) => [xAt(i), yAt(p.pnl)] as const)
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${xAt(n - 1).toFixed(1)} ${H - PB} L${xAt(0).toFixed(1)} ${H - PB} Z`
  const zeroY = yAt(0)
  const [endX, endY] = pts[pts.length - 1]

  const vLines = Array.from({ length: 7 }, (_, k) => PX + (k / 6) * (W - PX * 2))
  const hLines = Array.from({ length: 4 }, (_, k) => PT + (k / 3) * (H - PT - PB))

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
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          role="img"
          aria-label="Cumulative profit and loss across 72 trades, January 2025 to February 2026, ending at plus 28,400 dollars"
        >
          <defs>
            <linearGradient id="eqFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-cobalt)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-cobalt)" stopOpacity="0" />
            </linearGradient>
            <clipPath id="eqReveal">
              <motion.rect
                x="0"
                y="0"
                height={H}
                initial={{ width: reduce ? W : 0 }}
                animate={{ width: reduce || inView ? W : 0 }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              />
            </clipPath>
          </defs>

          {/* static grid */}
          <g stroke="var(--color-hair-2)" strokeWidth="1">
            {vLines.map((x, i) => (
              <line key={`v${i}`} x1={x} y1={PT} x2={x} y2={H - PB} />
            ))}
            {hLines.map((y, i) => (
              <line key={`h${i}`} x1={PX} y1={y} x2={W - PX} y2={y} />
            ))}
          </g>

          {/* zero baseline */}
          <line x1={PX} y1={zeroY} x2={W - PX} y2={zeroY} stroke="var(--color-ink-3)" strokeWidth="1" strokeDasharray="4 5" />

          {/* revealed area + line (solid — clip does the animation) */}
          <g clipPath="url(#eqReveal)">
            <path d={area} fill="url(#eqFill)" />
            <path d={line} fill="none" stroke="var(--color-cobalt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* endpoint marker */}
          <motion.circle
            cx={endX}
            cy={endY}
            r="4.5"
            fill="var(--color-cobalt)"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: reduce || inView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 1.35 }}
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
