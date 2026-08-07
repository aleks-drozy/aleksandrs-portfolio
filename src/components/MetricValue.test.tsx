import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { MetricValue } from './MetricValue'

// No reduced-motion mocking here on purpose: src/test/setup.ts already stubs
// matchMedia as non-matching and IntersectionObserver as a no-op, so CountUp
// never enters view and renders its `from` value (0). See
// MetricValue.reduced-motion.test.tsx for the prefers-reduced-motion path.

describe('MetricValue', () => {
  it('renders unparseable values statically, unchanged', () => {
    expect(render(<MetricValue value="7/7" />).container.textContent).toBe('7/7')
    expect(render(<MetricValue value="0.0100 / 0.1506" />).container.textContent).toBe('0.0100 / 0.1506')
    expect(render(<MetricValue value="2.84e-14" />).container.textContent).toBe('2.84e-14')
    expect(render(<MetricValue value="13.6-15.9%" />).container.textContent).toBe('13.6-15.9%')
  })

  it('keeps prefix and suffix around a parseable value', () => {
    const { container } = render(<MetricValue value="~$15K" />)
    // the middle digits are '0' in jsdom: useInView never fires so CountUp
    // never animates past its `from` value. Only the static prefix/suffix
    // are checkable here, not the settled 15.
    expect(container.textContent?.startsWith('~$')).toBe(true)
    expect(container.textContent?.endsWith('K')).toBe(true)
  })

  it('keeps a trailing suffix around a parseable value', () => {
    const { container } = render(<MetricValue value="790+" />)
    expect(container.textContent?.endsWith('+')).toBe(true)
  })

  it('passes className through to the rendered span', () => {
    const { container } = render(<MetricValue value="790+" className="x" />)
    expect(container.querySelector('span.x')).not.toBeNull()
  })

  it('renders trailing-zero decimals statically instead of losing precision', () => {
    // Number('1.000') === 1 and Number('0.0100') === 0.01: CountUp would
    // re-derive 0 and 2 decimal places and settle on '1' / '0.01', so these
    // must take the exact static fallback instead.
    expect(render(<MetricValue value="1.000" />).container.textContent).toBe('1.000')
    expect(render(<MetricValue value="0.0100" />).container.textContent).toBe('0.0100')
  })
})
