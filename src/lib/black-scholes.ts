// Closed-form Black-Scholes call pricer, kept dependency-free so the same
// function drives both the WebGL surface and the reduced-motion/no-WebGL SVG
// fallback. Formula matches the closed-form pricer in
// https://github.com/aleks-drozy/options-pricing-engine — see
// `black_scholes.py` in that repo for the reference implementation this
// mirrors.

// Strike, rate, and vol are fixed so the whole surface is one coherent scenario:
// K=100 ATM, r=5%, sigma=15% sits at the midpoint of the 13.6-15.9% ATM
// implied-vol range the linked engine recovers from a real SPY chain.
export const BS_PARAMS = {
  strike: 100,
  rate: 0.05,
  vol: 0.15,
} as const

export const SPOT_RANGE: [number, number] = [70, 130]
export const DAYS_RANGE: [number, number] = [9, 90]

// Abramowitz & Stegun 7.1.26 rational approximation of erf, accurate to
// ~1.5e-7 — more than enough precision for a visual surface.
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const t = 1 / (1 + p * ax)
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax)
  return sign * y
}

function normCdf(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2))
}

export function blackScholesCall(spot: number, strike: number, yearsToExpiry: number, rate: number, vol: number): number {
  if (yearsToExpiry <= 0) return Math.max(spot - strike, 0)
  const sqrtT = Math.sqrt(yearsToExpiry)
  const d1 = (Math.log(spot / strike) + (rate + (vol * vol) / 2) * yearsToExpiry) / (vol * sqrtT)
  const d2 = d1 - vol * sqrtT
  return spot * normCdf(d1) - strike * Math.exp(-rate * yearsToExpiry) * normCdf(d2)
}

export type SurfaceVertex = {
  spot: number
  days: number
  premium: number
}

export function buildSurfaceGrid(resX: number, resY: number): SurfaceVertex[][] {
  const [spotMin, spotMax] = SPOT_RANGE
  const [daysMin, daysMax] = DAYS_RANGE
  const grid: SurfaceVertex[][] = []
  for (let iy = 0; iy < resY; iy++) {
    const days = daysMin + (iy / (resY - 1)) * (daysMax - daysMin)
    const row: SurfaceVertex[] = []
    for (let ix = 0; ix < resX; ix++) {
      const spot = spotMin + (ix / (resX - 1)) * (spotMax - spotMin)
      const premium = blackScholesCall(spot, BS_PARAMS.strike, days / 365, BS_PARAMS.rate, BS_PARAMS.vol)
      row.push({ spot, days, premium })
    }
    grid.push(row)
  }
  return grid
}

export function nearestSpotIndex(resX: number): number {
  const [spotMin, spotMax] = SPOT_RANGE
  const t = (BS_PARAMS.strike - spotMin) / (spotMax - spotMin)
  return Math.round(t * (resX - 1))
}
