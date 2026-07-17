import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EquityCurve } from './EquityCurve'
import { FYP_EQUITY_POINTS, FYP_RESULTS } from '@/lib/fyp-data'

// The prefers-reduced-motion case lives in EquityCurve.reduced-motion.test.tsx:
// framer-motion caches the media query globally on first motion mount, so it
// needs a test file (= fresh module graph) where no motion component has
// rendered yet.

describe('EquityCurve', () => {
  it('renders an accessible chart naming the real result', () => {
    render(<EquityCurve />)
    const svg = screen.getByRole('img')
    expect(svg).toHaveAccessibleName(/72 trades.*28,400/)
  })

  it('draws the equity line through every data point', () => {
    const { container } = render(<EquityCurve />)
    const line = container.querySelector('path[fill="none"]')
    expect(line).not.toBeNull()
    const d = line!.getAttribute('d')!
    expect(d.startsWith('M')).toBe(true)
    // one M plus one L per remaining point
    const commands = d.match(/[ML]/g)!
    expect(commands).toHaveLength(FYP_EQUITY_POINTS.length)
    expect(d).not.toMatch(/NaN/)
  })

  it('shows the in-sample net P&L, win rate, and profit factor', () => {
    render(<EquityCurve />)
    expect(screen.getByText(FYP_RESULTS.inSample.netPnl)).toBeInTheDocument()
    expect(screen.getByText(FYP_RESULTS.inSample.winRate)).toBeInTheDocument()
    expect(screen.getByText(FYP_RESULTS.inSample.profitFactor)).toBeInTheDocument()
  })

  it('starts the reveal hidden when motion is allowed', () => {
    const { container } = render(<EquityCurve />)
    const clipRect = container.querySelector('clipPath rect')
    expect(parseFloat(clipRect!.getAttribute('width')!)).toBe(0)
  })
})
