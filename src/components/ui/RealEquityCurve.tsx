'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FYP_EQUITY_POINTS } from '@/lib/fyp-data'

export function RealEquityCurve({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const minPnl = Math.min(0, ...FYP_EQUITY_POINTS.map((p) => p.pnl))
  const maxPnl = Math.max(...FYP_EQUITY_POINTS.map((p) => p.pnl))
  const range = maxPnl - minPnl
  const n = FYP_EQUITY_POINTS.length

  const toXY = (pnl: number, i: number): [number, number] => {
    const x = (i / (n - 1)) * 100
    const y = 95 - ((pnl - minPnl) / range) * 90
    return [x, y]
  }

  const points = FYP_EQUITY_POINTS.map((p, i) => toXY(p.pnl, i))
  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
  const area = `${path} L 100 100 L 0 100 Z`

  const zeroY = 95 - ((0 - minPnl) / range) * 90

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-label="Cumulative P&L across 72 trades, Jan 2025 to Feb 2026"
      >
        <defs>
          <linearGradient id="realEqFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
          <pattern id="realEqGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#realEqGrid)" />

        <line
          x1="0"
          y1={zeroY}
          x2="100"
          y2={zeroY}
          stroke="var(--color-text-muted)"
          strokeWidth="0.3"
          strokeDasharray="1 1"
          vectorEffect="non-scaling-stroke"
        />

        <motion.path
          d={area}
          fill="url(#realEqFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />

        <motion.path
          d={path}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="pointer-events-none absolute left-3 top-2 font-mono text-[10px] uppercase text-text-muted">
        Cumulative P&L USD
      </div>
      <div className="pointer-events-none absolute right-3 top-2 font-mono text-[10px] text-accent">
        +$28,400
      </div>
      <div className="pointer-events-none absolute bottom-2 left-3 font-mono text-[10px] text-text-muted">
        Jan 2025
      </div>
      <div className="pointer-events-none absolute bottom-2 right-3 font-mono text-[10px] text-text-muted">
        Feb 2026
      </div>
    </div>
  )
}
