import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { EquityCurve } from './EquityCurve'
import { mockMatchMedia } from '@/test/setup'

// Kept separate from EquityCurve.test.tsx on purpose: framer-motion reads
// matchMedia('(prefers-reduced-motion)') once, on the first motion component
// mount, and caches the result globally. The mock therefore has to be in
// place before ANY motion component renders — which only a fresh test file
// (vitest isolates module graphs per file) can guarantee.

describe('EquityCurve with prefers-reduced-motion', () => {
  it('reveals the full curve immediately instead of animating', () => {
    // the boolean form is the exact query framer-motion passes to matchMedia
    mockMatchMedia(['(prefers-reduced-motion)'])
    const { container } = render(<EquityCurve />)
    const clipRect = container.querySelector('clipPath rect')
    expect(clipRect).not.toBeNull()
    // reduce → initial clip width is the full viewBox width (720), not 0
    // (framer-motion serializes the attribute with a px suffix)
    expect(parseFloat(clipRect!.getAttribute('width')!)).toBe(720)
  })
})
