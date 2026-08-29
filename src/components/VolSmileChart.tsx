import { buildSmileLines, nearestStrikePoint, FLAT_VOL_REFERENCE, SPY_SNAPSHOT } from '@/lib/spy-chain'

const W = 720
const H = 405
const PX = 44
const PT = 26
const PB = 34

const IV_MIN = 0.08
const IV_MAX = 0.28

const WASH = '#e9edfb'
const COBALT = '#1e3fcc'
const COBALT_DEEP = '#16309e'

function lerpHex(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

function yFor(iv: number): number {
  const t = Math.min(Math.max((iv - IV_MIN) / (IV_MAX - IV_MIN), 0), 1)
  return H - PB - t * (H - PT - PB)
}

// SVG small-multiples fallback for VolSmileScene: same data, same
// wash-to-cobalt ramp, zero three.js. Serves as the reduced-motion,
// no-WebGL, and low-end-device fallback, and doubles as the loading
// placeholder while the three.js chunk is fetched.
export function VolSmileChart() {
  const lines = buildSmileLines()
  const spot = SPY_SNAPSHOT.spot
  const allStrikes = lines.flatMap((l) => l.points.map((p) => p.strike))
  const minK = Math.min(...allStrikes)
  const maxK = Math.max(...allStrikes)
  const xFor = (k: number) => PX + ((k - minK) / (maxK - minK)) * (W - PX * 2)

  return (
    <figure className="m-0 border border-hair bg-surface p-5 shadow-[0_18px_40px_-28px_rgba(18,21,28,0.35)]">
      <figcaption className="mb-3 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
        <span>
          Fig. 02b market data – <span className="text-ink">SPY implied-volatility smile</span>
        </span>
        <span>Static · reduced motion</span>
      </figcaption>

      <div className="relative aspect-[16/9] w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          role="img"
          aria-label={`SPY implied volatility smile across ${lines.length} expiries, spot ${spot}, showing implied vol curving upward at strikes away from the money on every real quoted expiry, versus the flat ${(FLAT_VOL_REFERENCE * 100).toFixed(0)}% assumption used by the Black-Scholes surface above`}
        >
          {[0.15, 0.2].map((v) => (
            <g key={v}>
              <line x1={PX} y1={yFor(v)} x2={W - PX} y2={yFor(v)} stroke="var(--color-ink-3)" strokeOpacity={0.18} strokeWidth={0.75} />
              <text x={PX - 6} y={yFor(v) + 3} textAnchor="end" className="font-mono" fontSize={9} fill="var(--color-ink-3)">
                {(v * 100).toFixed(0)}%
              </text>
            </g>
          ))}

          <line
            x1={PX}
            y1={yFor(FLAT_VOL_REFERENCE)}
            x2={W - PX}
            y2={yFor(FLAT_VOL_REFERENCE)}
            stroke="var(--color-ink-3)"
            strokeWidth={1.25}
            strokeDasharray="4 4"
          />
          <text x={W - PX} y={yFor(FLAT_VOL_REFERENCE) - 5} textAnchor="end" className="font-mono" fontSize={9} fill="var(--color-ink-3)">
            flat vol 15%
          </text>

          <line x1={xFor(spot)} y1={PT} x2={xFor(spot)} y2={H - PB} stroke={COBALT_DEEP} strokeWidth={1.5} strokeDasharray="5 4" />

          {lines.map((line, li) => {
            const opacity = 0.55 + (0.45 * li) / Math.max(lines.length - 1, 1)
            const path = line.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.strike)} ${yFor(p.iv)}`).join(' ')
            const atm = nearestStrikePoint(line, spot)
            return (
              <g key={line.expiry} opacity={opacity}>
                <path d={path} fill="none" stroke={COBALT} strokeWidth={1.5} />
                {line.points.map((p) => (
                  <circle key={p.strike} cx={xFor(p.strike)} cy={yFor(p.iv)} r={2.1} fill={lerpHex(WASH, COBALT, Math.min(Math.max((p.iv - IV_MIN) / (IV_MAX - IV_MIN), 0), 1))} />
                ))}
                <text x={xFor(line.points[line.points.length - 1].strike) + 4} y={yFor(atm.iv) + 3} className="font-mono" fontSize={8.5} fill="var(--color-ink-3)">
                  {line.dte}d
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-3.5 overflow-x-auto border-t border-hair pt-3.5">
        <table className="w-full min-w-[480px] border-collapse font-mono text-[10.5px] text-ink-3">
          <thead>
            <tr className="text-left uppercase tracking-[0.08em]">
              <th className="pb-1.5 pr-4">Expiry</th>
              <th className="pb-1.5 pr-4">Strike (ATM)</th>
              <th className="pb-1.5 pr-4">Mid</th>
              <th className="pb-1.5">Implied vol</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => {
              const atm = nearestStrikePoint(line, spot)
              return (
                <tr key={line.expiry} className="border-t border-hair">
                  <td className="py-1.5 pr-4 text-ink">
                    {line.expiry} · {line.dte}d
                  </td>
                  <td className="py-1.5 pr-4">${atm.strike.toFixed(0)}</td>
                  <td className="py-1.5 pr-4">${atm.mid.toFixed(2)}</td>
                  <td className="py-1.5 text-cobalt">{(atm.iv * 100).toFixed(1)}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-6 border-t border-hair pt-3.5 font-mono text-[11px] text-ink-3">
        <div>
          SPY chain · captured {SPY_SNAPSHOT.fetchedUtc.slice(0, 10)} · spot ${spot.toFixed(2)} · mids inverted via bisection on
          load
        </div>
      </div>
    </figure>
  )
}
