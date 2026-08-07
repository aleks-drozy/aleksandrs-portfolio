import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { MetricValue } from './MetricValue'
import { mockMatchMedia } from '@/test/setup'

// Kept separate from MetricValue.test.tsx on purpose: framer-motion reads
// matchMedia('(prefers-reduced-motion)') once, on the first motion component
// mount, and caches the result globally. The mock therefore has to be in
// place before ANY motion component renders — which only a fresh test file
// (vitest isolates module graphs per file) can guarantee.

describe('MetricValue with prefers-reduced-motion', () => {
  it('renders the final value immediately instead of counting up', () => {
    // the boolean form is the exact query framer-motion passes to matchMedia
    mockMatchMedia(['(prefers-reduced-motion)'])
    const { container } = render(<MetricValue value="790+" />)
    expect(container.textContent).toBe('790+')
  })

  it('renders a formatted final value immediately as well', () => {
    const { container } = render(<MetricValue value="~$15K" />)
    expect(container.textContent).toBe('~$15K')
  })
})
