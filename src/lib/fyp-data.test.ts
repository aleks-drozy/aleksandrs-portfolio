import { describe, expect, it } from 'vitest'
import { FYP_EQUITY_POINTS, FYP_FILTER_TESTS, FYP_PARAMETERS, FYP_RESULTS } from './fyp-data'

// The equity curve is hand-transcribed from the backtest CSV. These tests pin
// the invariants the chart and the headline metrics silently depend on.

describe('FYP_EQUITY_POINTS', () => {
  it('has at least two points (EquityCurve divides by n - 1)', () => {
    expect(FYP_EQUITY_POINTS.length).toBeGreaterThanOrEqual(2)
  })

  it('every date is a valid ISO calendar date', () => {
    for (const { date } of FYP_EQUITY_POINTS) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      const parsed = new Date(date)
      expect(Number.isNaN(parsed.getTime()), `"${date}" is not a real date`).toBe(false)
      // round-trip guard: rejects e.g. 2025-02-30, which Date silently rolls over
      expect(parsed.toISOString().slice(0, 10)).toBe(date)
    }
  })

  it('dates are strictly increasing', () => {
    for (let i = 1; i < FYP_EQUITY_POINTS.length; i++) {
      const prev = FYP_EQUITY_POINTS[i - 1].date
      const curr = FYP_EQUITY_POINTS[i].date
      expect(curr > prev, `${curr} at index ${i} is not after ${prev}`).toBe(true)
    }
  })

  it('every pnl is a finite number', () => {
    for (const { date, pnl } of FYP_EQUITY_POINTS) {
      expect(Number.isFinite(pnl), `pnl on ${date} is not finite`).toBe(true)
    }
  })

  it('matches the headline in-sample results', () => {
    expect(FYP_EQUITY_POINTS.length).toBe(FYP_RESULTS.inSample.trades)

    const lastPnl = FYP_EQUITY_POINTS[FYP_EQUITY_POINTS.length - 1].pnl
    const headlinePnl = Number(FYP_RESULTS.inSample.netPnl.replace(/[+$,]/g, ''))
    expect(lastPnl).toBe(headlinePnl)
  })
})

describe('FYP_PARAMETERS and FYP_FILTER_TESTS', () => {
  it('parameters all have a label and a value', () => {
    for (const p of FYP_PARAMETERS) {
      expect(p.label.trim()).not.toBe('')
      expect(p.value.trim()).not.toBe('')
    }
  })

  it('exactly one tested filter was kept (the liquidity sweep)', () => {
    const kept = FYP_FILTER_TESTS.filter((f) => f.kept)
    expect(kept).toHaveLength(1)
    expect(kept[0].name).toBe('1-min liquidity sweep')
  })
})
