import { BS_PARAMS, buildSurfaceGrid, nearestSpotIndex } from '@/lib/black-scholes'

const RES_X = 24
const RES_Y = 24
const W = 720
const H = 405
const PX = 8
const PT = 26
const PB = 30

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

const WASH: [number, number, number] = [233, 237, 251]
const COBALT: [number, number, number] = [30, 63, 204]

export function OptionSurfaceHeatmap() {
  const grid = buildSurfaceGrid(RES_X, RES_Y)
  const allPremiums = grid.flat().map((v) => v.premium)
  const minP = Math.min(...allPremiums)
  const maxP = Math.max(...allPremiums)
  const range = maxP - minP || 1

  const cellW = (W - PX * 2) / RES_X
  const cellH = (H - PT - PB) / RES_Y
  const atmIx = nearestSpotIndex(RES_X)
  const atmMidRow = grid[Math.floor(RES_Y / 2)][atmIx]

  return (
    <figure className="m-0 border border-hair bg-surface p-5 shadow-[0_18px_40px_-28px_rgba(18,21,28,0.35)]">
      <figcaption className="mb-3 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
        <span>
          Fig. 02 live model – <span className="text-ink">Black-Scholes price surface</span>
        </span>
        <span>Static · reduced motion</span>
      </figcaption>

      <div className="relative aspect-[16/9] w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          role="img"
          aria-label={`Black-Scholes call premium as a function of spot price and days to expiry, strike ${BS_PARAMS.strike}, rate ${BS_PARAMS.rate * 100}%, volatility ${BS_PARAMS.vol * 100}%`}
        >
          {grid.map((row, iy) =>
            row.map((v, ix) => {
              const t = (v.premium - minP) / range
              return (
                <rect
                  key={`${iy}-${ix}`}
                  x={PX + ix * cellW}
                  y={PT + iy * cellH}
                  width={cellW}
                  height={cellH}
                  fill={lerpColor(WASH, COBALT, t)}
                  stroke="var(--color-ink-3)"
                  strokeOpacity={0.12}
                  strokeWidth={0.5}
                />
              )
            }),
          )}
          <line
            x1={PX + atmIx * cellW + cellW / 2}
            y1={PT}
            x2={PX + atmIx * cellW + cellW / 2}
            y2={H - PB}
            stroke="var(--color-cobalt-deep)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        </svg>

        <span className="pointer-events-none absolute bottom-1.5 left-0 font-mono text-[10px] text-ink-3">
          Spot ${BS_PARAMS.strike - 30}
        </span>
        <span className="pointer-events-none absolute bottom-1.5 right-0 font-mono text-[10px] text-ink-3">
          Spot ${BS_PARAMS.strike + 30}
        </span>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-6 border-t border-hair pt-3.5 font-mono text-[11px] text-ink-3">
        <div>
          <span className="mb-0.5 block text-base tracking-[-0.01em] text-ink">${atmMidRow.spot.toFixed(0)}</span>
          Spot (ATM)
        </div>
        <div>
          <span className="mb-0.5 block text-base tracking-[-0.01em] text-ink">{atmMidRow.days.toFixed(0)}d</span>
          Days to expiry
        </div>
        <div>
          <span className="mb-0.5 block text-base tracking-[-0.01em] text-cobalt">${atmMidRow.premium.toFixed(2)}</span>
          Premium
        </div>
      </div>
    </figure>
  )
}
