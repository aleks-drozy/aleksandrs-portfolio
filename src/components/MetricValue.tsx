'use client'

import { useReducedMotion } from 'motion/react'
import CountUp from '@/components/CountUp'

type MetricValueProps = {
  value: string
  className?: string
  duration?: number
  delay?: number
}

// Deliberately strict: prefix/suffix groups forbid digits, so anything that
// packs digits into more than one place (7/7, 2.84e-14, 0.0100 / 0.1506,
// 13.6-15.9%) fails to match and falls back to static text. A metric can
// never display a wrong or half-animated representation of a value we
// cannot parse losslessly back into prefix + number + suffix. Beyond shape,
// the numeric core also has to round-trip through Number() unchanged, so
// trailing-zero decimals like '1.000' or '0.0100' fall back too.
const MATCH = /^([^0-9]*?)(\d{1,3}(?:,\d{3})*(?:\.\d+)?)([^0-9]*)$/

export function MetricValue({ value, className, duration = 1.2, delay = 0 }: MetricValueProps) {
  const shouldReduceMotion = useReducedMotion()

  const match = value.match(MATCH)
  if (!match) {
    return <span className={className}>{value}</span>
  }

  const [, prefix, core, suffix] = match
  const to = Number(core.replace(/,/g, ''))

  // Number() must reproduce the authored digits exactly: '1.000' -> 1 -> '1'
  // and '0.0100' -> 0.01 -> '0.01' would silently drop stated precision,
  // because CountUp re-derives its decimal count from to.toString().
  if (String(to) !== core.replace(/,/g, '')) {
    return <span className={className}>{value}</span>
  }

  if (shouldReduceMotion) {
    return <span className={className}>{value}</span>
  }

  return (
    <span className={className}>
      {prefix}
      <CountUp
        to={to}
        from={0}
        duration={duration}
        delay={delay}
        separator={core.includes(',') ? ',' : ''}
      />
      {suffix}
    </span>
  )
}
