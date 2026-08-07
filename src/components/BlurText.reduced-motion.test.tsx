import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import BlurText from './BlurText'
import { mockMatchMedia } from '@/test/setup'

// Kept separate from any other BlurText test on purpose: framer-motion reads
// matchMedia('(prefers-reduced-motion)') once, on the first motion component
// mount, and caches the result globally. The mock therefore has to be in
// place before ANY motion component renders — which only a fresh test file
// (vitest isolates module graphs per file) can guarantee.

describe('BlurText with prefers-reduced-motion', () => {
  it('renders the final text immediately instead of animating per word', () => {
    // the boolean form is the exact query framer-motion passes to matchMedia
    mockMatchMedia(['(prefers-reduced-motion)'])
    const { container } = render(<BlurText text="Software engineer" />)
    expect(container.textContent).toBe('Software engineer')
    // reduce → single text node, no per-word motion spans
    expect(container.querySelector('.blur-text')!.querySelectorAll('span').length).toBe(0)
  })
})
