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
// cannot parse losslessly back into prefix + number + suffix.
const MATCH = /^([^0-9]*?)(\d{1,3}(?:,\d{3})*(?:\.\d+)?)([^0-9]*)$/

// Exported both ways: existing call sites on this branch import this
// component as both a default and a named export (src/app/page.tsx uses
// default, src/app/projects/[slug]/page.tsx uses named). Both are kept in
// sync rather than picking one and breaking the other file.
export default function MetricValue({ value, className, duration = 1.2, delay = 0 }: MetricValueProps) {
  const shouldReduceMotion = useReducedMotion()

  const match = value.match(MATCH)
  if (!match) {
    return <span className={className}>{value}</span>
  }

  if (shouldReduceMotion) {
    return <span className={className}>{value}</span>
  }

  const [, prefix, core, suffix] = match

  return (
    <span className={className}>
      {prefix}
      <CountUp
        to={Number(core.replace(/,/g, ''))}
        from={0}
        duration={duration}
        delay={delay}
        separator={core.includes(',') ? ',' : ''}
      />
      {suffix}
    </span>
  )
}

export { MetricValue }
