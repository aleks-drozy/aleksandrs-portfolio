import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RealEquityCurve } from '@/components/ui/RealEquityCurve'
import { FYP_RESULTS, FYP_PARAMETERS, FYP_FILTER_TESTS } from '@/lib/fyp-data'

export const metadata: Metadata = {
  title: 'NASDAQ-100 Algo Strategy | Case Study | Aleksandrs Drozdovs',
  description:
    'Final-year project: algorithmic trading strategy for NQ1! E-mini futures using Smart Money Concepts (IFVG + CISD). 72-trade backtest, 56.94% win rate, 1.703 profit factor.',
}

export default function FypCaseStudy() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="px-[clamp(16px,4vw,32px)] py-20 md:py-24">
          <div className="mx-auto max-w-[900px]">
            <Link
              href="/#featured-work"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase text-text-muted transition-colors hover:text-proof"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to work
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase text-proof">Case Study / Final-Year Project</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
                NASDAQ-100 <span className="text-proof">Algo Strategy</span>
              </h1>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                A quantitative trading strategy for NQ1! E-mini futures built around two Smart Money Concepts:
                Inverse Fair Value Gaps and Change in State of Delivery. Both signals must confirm before entry.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
                <span className="rounded-md border border-border bg-surface px-2 py-1">PineScript v6</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">TradingView</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Smart Money Concepts</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Quant Research</span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">Maynooth University</span>
              </div>
            </header>

            {/* Metric strip */}
            <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {[
                { label: 'Trades', value: String(FYP_RESULTS.inSample.trades) },
                { label: 'Win Rate', value: FYP_RESULTS.inSample.winRate },
                { label: 'Net P&L', value: FYP_RESULTS.inSample.netPnl },
                { label: 'Profit Factor', value: FYP_RESULTS.inSample.profitFactor },
                { label: 'Max Drawdown', value: FYP_RESULTS.inSample.maxDrawdown },
                { label: 'Expectancy', value: FYP_RESULTS.inSample.expectancy },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border border-border bg-surface p-4">
                  <p className="font-display text-2xl font-bold tabular-nums text-proof">{m.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-text-muted">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Equity curve */}
            <section className="mb-16">
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-bold text-text-primary">Equity curve</h2>
                <p className="font-mono text-xs text-text-muted">In-sample: {FYP_RESULTS.inSample.period}</p>
              </div>
              <div className="relative h-[320px] overflow-hidden rounded-xl border border-border bg-surface">
                <RealEquityCurve className="h-full" />
              </div>
              <p className="mt-3 text-sm text-text-muted">
                72 trades, cumulative net P&L. Chart rendered from the actual TradingView CSV export.
              </p>
            </section>

            {/* Thesis / How it works */}
            <section className="mb-16 space-y-8">
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">The thesis</h2>
                <div className="space-y-4 leading-relaxed text-text-secondary">
                  <p>
                    The NY morning session is where institutional order flow is densest and where liquidity sweeps,
                    displacement, and price imbalances are most likely to resolve cleanly. The strategy targets the
                    first 30 minutes (09:32 to 10:00 NY) and requires two independent signals to agree before entering.
                  </p>
                  <p>
                    The edge is not in any single pattern. It is in the conjunction: IFVG, CISD, and a prior liquidity
                    sweep all pointing the same direction, inside a tightly bounded time window. That filters most of
                    the noise out automatically.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-display text-xl font-semibold text-text-primary">IFVG (Inverse Fair Value Gap)</h3>
                <p className="leading-relaxed text-text-secondary">
                  A Fair Value Gap is a 3-candle imbalance where price moved so fast in one direction that the other
                  side never got a chance to participate. When price later closes back through that gap, the bias
                  flips. A bullish IFVG is a close above a bearish FVG; a bearish IFVG is a close below a bullish one.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-display text-xl font-semibold text-text-primary">CISD (Change in State of Delivery)</h3>
                <p className="leading-relaxed text-text-secondary">
                  Tracks pullbacks programmatically. Stores a reference level from the opening-price structure of the
                  pullback, then watches for a close beyond that level in the opposite direction. It is a structural
                  shift, not a subjective chart-reading call, which is what makes it encodable in PineScript.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-display text-xl font-semibold text-text-primary">Entry + risk</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex gap-3"><span className="text-proof">+</span>Both IFVG and CISD must confirm in the same direction.</li>
                  <li className="flex gap-3"><span className="text-proof">+</span>Prior liquidity sweep required: wick through a recent swing high/low that closes back inside range.</li>
                  <li className="flex gap-3"><span className="text-proof">+</span>Stop loss at the 8-bar swing low (longs) or swing high (shorts).</li>
                  <li className="flex gap-3"><span className="text-proof">+</span>Take profit at 1.5x the stop distance.</li>
                  <li className="flex gap-3"><span className="text-proof">+</span>One trade per day max; session 09:32 to 10:00 NY only.</li>
                </ul>
              </div>
            </section>

            {/* Filter experiments */}
            <section className="mb-16">
              <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">What I tried and dropped</h2>
              <p className="mb-6 text-text-secondary">
                Most filters I tested either did nothing or hurt performance. Keeping them in the strategy would have
                been dishonest to the data. Only one survived.
              </p>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left font-mono text-sm">
                  <thead className="border-b border-border bg-surface">
                    <tr>
                      <th className="p-3 text-[11px] uppercase text-text-muted">Filter</th>
                      <th className="p-3 text-[11px] uppercase text-text-muted">Result</th>
                      <th className="p-3 text-[11px] uppercase text-text-muted">Kept?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FYP_FILTER_TESTS.map((f) => (
                      <tr key={f.name} className="border-b border-border/50 last:border-0 odd:bg-surface/40">
                        <td className="p-3 text-text-primary">{f.name}</td>
                        <td className="p-3 text-text-secondary">{f.result}</td>
                        <td className="p-3">
                          {f.kept ? (
                            <span className="rounded-md bg-proof/10 px-2 py-0.5 text-xs font-semibold text-proof">
                              Kept
                            </span>
                          ) : (
                            <span className="rounded-md bg-surface-elevated px-2 py-0.5 text-xs text-text-muted">
                              Dropped
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Out of sample — honest caveat */}
            <section className="mb-16">
              <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">Out-of-sample honesty</h2>
              <p className="mb-6 text-text-secondary">
                Tested on the prior two years to check for overfitting. The strategy lost money. That is consistent
                with the thesis: IFVG and CISD need volatility and impulsive moves to form cleanly, and 2023 to 2024
                were slow, grinding markets without many sharp sessions. The edge is regime-dependent, not universal.
              </p>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left font-mono text-sm">
                  <thead className="border-b border-border bg-surface">
                    <tr>
                      <th className="p-3 text-[11px] uppercase text-text-muted">Metric</th>
                      <th className="p-3 text-[11px] uppercase text-text-muted">In-sample (2025 to 2026)</th>
                      <th className="p-3 text-[11px] uppercase text-text-muted">OOS (2023 to 2024)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 odd:bg-surface/40">
                      <td className="p-3 text-text-primary">Win Rate</td>
                      <td className="p-3 text-proof">{FYP_RESULTS.inSample.winRate}</td>
                      <td className="p-3 text-signal-red">{FYP_RESULTS.outOfSample.winRate}</td>
                    </tr>
                    <tr className="border-b border-border/50 odd:bg-surface/40">
                      <td className="p-3 text-text-primary">Profit Factor</td>
                      <td className="p-3 text-proof">{FYP_RESULTS.inSample.profitFactor}</td>
                      <td className="p-3 text-signal-red">{FYP_RESULTS.outOfSample.profitFactor}</td>
                    </tr>
                    <tr className="odd:bg-surface/40">
                      <td className="p-3 text-text-primary">Net P&L</td>
                      <td className="p-3 text-proof">{FYP_RESULTS.inSample.netPnl}</td>
                      <td className="p-3 text-signal-red">{FYP_RESULTS.outOfSample.netPnl}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Parameters */}
            <section className="mb-16">
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Parameters</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {FYP_PARAMETERS.map((p) => (
                  <div key={p.label} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
                    <span className="font-mono text-xs uppercase text-text-muted">{p.label}</span>
                    <span className="font-mono text-sm text-text-primary">{p.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Supervisor + CTAs */}
            <section className="border-t border-border pt-10">
              <p className="mb-6 font-mono text-xs uppercase text-text-muted">
                Supervisor: Dr. Phil Maguire, Dept. of Computer Science, Maynooth University
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/aleks-drozy/fyp-trading-strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary active:scale-[0.97]"
                >
                  View on GitHub
                </Link>
                <Link
                  href="/#featured-work"
                  className="btn-secondary active:scale-[0.97]"
                >
                  Back to portfolio
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
