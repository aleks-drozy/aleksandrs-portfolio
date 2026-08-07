import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import BlurText from './BlurText'

// Deliberately no mockMatchMedia here: src/test/setup.ts stubs matchMedia as
// non-matching, so this file exercises the animated (per-word span) branch.
// Kept separate from BlurText.reduced-motion.test.tsx because motion caches
// the reduced-motion matchMedia result per module graph on first mount.

describe('BlurText animated branch', () => {
  it('emits textContent byte-identical to the source text', () => {
    const { container } = render(<BlurText text="Software engineer" animateBy="words" />)
    // must be a plain U+0020 space, not U+00A0, matching the reduced-motion branch
    expect(container.textContent).toBe('Software engineer')
  })

  it('preserves consecutive spaces verbatim', () => {
    const { container } = render(<BlurText text="a  b" animateBy="words" />)
    expect(container.textContent).toBe('a  b')
  })
})
