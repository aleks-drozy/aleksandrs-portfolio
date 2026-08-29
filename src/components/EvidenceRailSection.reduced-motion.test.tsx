import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { EvidenceRailSection } from './EvidenceRailSection'
import { mockMatchMedia } from '@/test/setup'

// Kept separate from EvidenceRailSection.test.tsx on purpose: framer-motion
// reads matchMedia('(prefers-reduced-motion)') once, on the first motion
// component mount, and caches the result globally. The mock therefore has to
// be in place before ANY motion component renders — which only a fresh test
// file (vitest isolates module graphs per file) can guarantee. Same pattern
// as EquityCurve.reduced-motion.test.tsx / MetricValue.reduced-motion.test.tsx.

describe('EvidenceRailSection with prefers-reduced-motion', () => {
  it('renders the plain Ledger Table instead of the 3D corridor', () => {
    mockMatchMedia(['(prefers-reduced-motion)'])
    const { container } = render(<EvidenceRailSection />)
    expect(container.querySelector('table')).not.toBeNull()
    expect(container.querySelector('canvas')).toBeNull()
    // the interactive corridor's tabIndex=0 group role should not be present
    // at all under reduced motion — the table is the whole experience, not a
    // degraded companion to a hidden canvas.
    expect(container.querySelector('[role="group"]')).toBeNull()
  })
})
