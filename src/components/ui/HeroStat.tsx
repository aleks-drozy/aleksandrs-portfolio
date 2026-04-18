'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion'

type Props = { value: string; label: string; delay?: number; size?: 'lg' | 'md' }

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
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${withCommas}.${decPart}` : withCommas
}

export function HeroStat({ value, label, delay = 0, size = 'lg' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()
  const { prefix, number, suffix, decimals } = parseTarget(value)
  const mv = useMotionValue(0)
  const [animatedDisplay, setAnimatedDisplay] = useState(`${prefix}${formatNumber(0, decimals)}${suffix}`)
  const display = shouldReduceMotion ? value : animatedDisplay

  useEffect(() => {
    if (!inView || shouldReduceMotion) return
    const controls = animate(mv, number, {
      duration: 0.9,
      delay,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (latest) => setAnimatedDisplay(`${prefix}${formatNumber(latest, decimals)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, number, prefix, suffix, decimals, delay, mv, shouldReduceMotion])

  const valueSize = size === 'lg' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-border-strong"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className={`font-display font-bold tracking-tight text-text-primary tabular-nums ${valueSize}`}>
        {display}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-text-muted">{label}</p>
    </div>
  )
}
