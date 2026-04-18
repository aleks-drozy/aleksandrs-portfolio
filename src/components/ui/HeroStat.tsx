'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

type Props = { value: string; label: string; delay?: number }

function parseTarget(raw: string): { prefix: string; number: number; suffix: string; decimals: number } {
  const match = raw.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return { prefix: '', number: 0, suffix: raw, decimals: 0 }
  const prefix = match[1] ?? ''
  const rawNum = (match[2] ?? '0').replace(/,/g, '')
  const number = parseFloat(rawNum)
  const decimalPart = rawNum.split('.')[1]
  const decimals = decimalPart ? decimalPart.length : 0
  const suffix = match[3] ?? ''
  return { prefix, number, suffix, decimals }
}

function formatNumber(n: number, decimals: number): string {
  const fixed = n.toFixed(decimals)
  const [intPart, decPart] = fixed.split('.')
  const withCommas = (intPart ?? '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${withCommas}.${decPart}` : withCommas
}

export function HeroStat({ value, label, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const { prefix, number, suffix, decimals } = parseTarget(value)

  // Always start at zero for SSR/client consistency — no useReducedMotion in render path
  const [display, setDisplay] = useState(`${prefix}${formatNumber(0, decimals)}${suffix}`)
  const mv = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    // Check reduced motion preference client-side only, inside effect
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    const controls = animate(mv, number, {
      duration: 0.9,
      delay,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (latest) => setDisplay(`${prefix}${formatNumber(latest, decimals)}${suffix}`),
    })
    return () => controls.stop()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-border-strong"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="font-display text-4xl font-bold tracking-tight text-text-primary tabular-nums md:text-5xl">
        {display}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-text-muted">{label}</p>
    </div>
  )
}
