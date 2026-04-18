'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const POINTS: [number, number][] = [
  [0, 85], [4, 82], [8, 88], [12, 80], [16, 75],
  [20, 78], [24, 72], [28, 68], [32, 62], [36, 66],
  [40, 58], [44, 50], [48, 54], [52, 45], [56, 40],
  [60, 44], [64, 36], [68, 30], [72, 34], [76, 26],
  [80, 22], [84, 18], [88, 22], [92, 14], [96, 10],
  [100, 6],
]

const path = POINTS.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
const area = `${path} L 100 100 L 0 100 Z`

export function EquityCurve({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const shouldReduceMotion = useReducedMotion()
  const startProgress = shouldReduceMotion ? 1 : inView ? 1 : 0

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-label="Equity curve showing strategy growth over the backtest period"
      >
        <defs>
          <linearGradient id="eqFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </linearGradient>
          <pattern id="eqGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#eqGrid)" />

        <motion.path
          d={area}
          fill="url(#eqFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: startProgress ? 1 : 0 }}
          transition={{ duration: 0.45, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />

        <motion.path
          d={path}
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: startProgress }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
          vectorEffect="non-scaling-stroke"
        />

        {POINTS.slice(-1).map(([x, y]) => (
          <motion.circle
            key={`end-${x}`}
            cx={x}
            cy={y}
            r="1.2"
            fill="#2dd4bf"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: startProgress ? 1 : 0, scale: startProgress ? 1 : 0.4 }}
            transition={{ duration: 0.35, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute left-2 top-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        Equity Curve <span className="ml-1 text-text-muted/60">· sample</span>
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-text-muted">
        Q1 → Q4
      </div>
    </div>
  )
}
