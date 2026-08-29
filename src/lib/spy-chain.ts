// Real SPY option-chain snapshot and the implied-vol inversion that turns
// its quoted mids into the smile shown in Fig. 02b. The snapshot itself
// (src/lib/spy-smile-snapshot.json) is a thinned export of
// https://github.com/aleks-drozy/options-pricing-engine/blob/main/data/spy_chain.json
// — a small band of strikes around spot, at 5 real listed expiries, kept as
// raw quoted mids only. No implied vol is pre-baked into the snapshot: it is
// recovered here, client-side, on every load, by inverting each mid through
// the same closed-form `blackScholesCall` used by the neighboring
// Black-Scholes surface (Fig. 02) — bisection root-find on volatility.
import { blackScholesCall } from './black-scholes'
import snapshot from './spy-smile-snapshot.json'

export type ChainQuote = {
  strike: number
  mid: number
}

export type ChainExpiry = {
  expiry: string
  dte: number
  quotes: ChainQuote[]
}

export type SpySnapshot = {
  fetchedUtc: string
  spot: number
  rate: number
  source: string
  expiries: ChainExpiry[]
}

export const SPY_SNAPSHOT = snapshot as SpySnapshot

// Flat-vol assumption of the neighboring Black-Scholes surface (BS_PARAMS.vol
// in black-scholes.ts) — the reference every real line in this figure bends
// away from.
export const FLAT_VOL_REFERENCE = 0.15

export type SmilePoint = {
  strike: number
  mid: number
  iv: number
}

export type SmileLine = {
  expiry: string
  dte: number
  points: SmilePoint[]
}

// Bisection root-find for implied vol: the market's mid is fixed, we search
// for the volatility that makes blackScholesCall reproduce it. Vol is
// strictly increasing in call price, so bisection always converges on this
// range.
export function impliedVol(mid: number, spot: number, strike: number, dte: number, rate: number): number {
  const T = dte / 365
  let lo = 0.01
  let hi = 3.0
  for (let i = 0; i < 60; i++) {
    const mVol = (lo + hi) / 2
    const price = blackScholesCall(spot, strike, T, rate, mVol)
    if (price > mid) {
      hi = mVol
    } else {
      lo = mVol
    }
  }
  return (lo + hi) / 2
}

// Builds one continuous smile line per expiry by inverting every quoted mid
// in the snapshot. Nearest expiry first (front of the depth stack).
export function buildSmileLines(data: SpySnapshot = SPY_SNAPSHOT): SmileLine[] {
  return data.expiries
    .slice()
    .sort((a, b) => a.dte - b.dte)
    .map((e) => ({
      expiry: e.expiry,
      dte: e.dte,
      points: e.quotes
        .slice()
        .sort((a, b) => a.strike - b.strike)
        .map((q) => ({
          strike: q.strike,
          mid: q.mid,
          iv: impliedVol(q.mid, data.spot, q.strike, e.dte, data.rate),
        })),
    }))
}

// Nearest quoted strike to spot within a single smile line — used for both
// the ATM tick annotation and the default probe position.
export function nearestStrikePoint(line: SmileLine, spot: number): SmilePoint {
  return line.points.reduce((best, p) => (Math.abs(p.strike - spot) < Math.abs(best.strike - spot) ? p : best))
}
