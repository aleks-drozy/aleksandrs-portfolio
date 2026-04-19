'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import type { BacktestResults, StrategyResult, PeriodMetrics } from '@/types/backtest'
import rawResults from '@/data/backtest_results.json'

const results = rawResults as unknown as BacktestResults

type SortKey = keyof PeriodMetrics
const SORT_KEYS: { key: SortKey; label: string }[] = [
  { key: 'sharpe', label: 'Sharpe' },
  { key: 'sortino', label: 'Sortino' },
  { key: 'calmar', label: 'Calmar' },
  { key: 'total_return_pct', label: 'Return %' },
  { key: 'max_drawdown_pct', label: 'Max DD' },
  { key: 'win_rate_pct', label: 'Win Rate' },
  { key: 'num_trades', label: 'Trades' },
]

function fmt(v: number, decimals = 2) {
  return v.toFixed(decimals)
}

function DirectionBadge({ direction }: { direction: StrategyResult['direction'] }) {
  const label =
    direction === 'long_only' ? 'Long Only' : direction === 'short_only' ? 'Short Only' : 'Long & Short'
  return (
    <span className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
      {label}
    </span>
  )
}

function TimeframeBadge({ timeframe }: { timeframe: string }) {
  return (
    <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
      {timeframe}
    </span>
  )
}

function MetricStrip({ metrics, dimmed }: { metrics: PeriodMetrics; dimmed?: boolean }) {
  const cls = dimmed ? 'text-text-muted' : 'text-text-primary'
  const items = [
    { label: 'Return', value: `${fmt(metrics.total_return_pct)}%` },
    { label: 'Sharpe', value: fmt(metrics.sharpe) },
    { label: 'Sortino', value: fmt(metrics.sortino) },
    { label: 'Calmar', value: fmt(metrics.calmar) },
    { label: 'Max DD', value: `${fmt(metrics.max_drawdown_pct)}%` },
    { label: 'Win Rate', value: `${fmt(metrics.win_rate_pct)}%` },
    { label: 'PF', value: fmt(metrics.profit_factor) },
    { label: 'Trades', value: String(metrics.num_trades) },
  ]
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
      {items.map((item) => (
        <div key={item.label} className="rounded-md border border-border bg-surface p-2 text-center">
          <p className={`font-mono text-sm font-bold tabular-nums ${cls}`}>{item.value}</p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-text-muted">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

function EquityChart({ strategy }: { strategy: StrategyResult }) {
  const splitDate = strategy.out_of_sample.period.start

  const chartData = useMemo(() => {
    const isPoints = strategy.in_sample.equity_curve.map((p) => ({
      date: p.date,
      is_value: p.value,
      oos_value: undefined as number | undefined,
    }))
    const oosPoints = strategy.out_of_sample.equity_curve.map((p) => ({
      date: p.date,
      is_value: undefined as number | undefined,
      oos_value: p.value,
    }))
    return [...isPoints, ...oosPoints]
  }, [strategy])

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <XAxis dataKey="date" tick={false} axisLine={false} tickLine={false} />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 10000).toFixed(1)}×`}
            width={36}
          />
          <Tooltip
            contentStyle={{ background: '#0f1117', border: '1px solid #1e293b', borderRadius: 8 }}
            labelStyle={{ color: '#94a3b8', fontSize: 11 }}
            itemStyle={{ color: '#f1f5f9', fontSize: 12, fontFamily: 'monospace' }}
            formatter={(v) => [`$${Number(v).toFixed(0)}`, '']}
          />
          <ReferenceLine x={splitDate} stroke="#334155" strokeDasharray="4 4" label="" />
          <Line
            type="monotone"
            dataKey="is_value"
            stroke="#334155"
            strokeWidth={1.5}
            dot={false}
            connectNulls={false}
            name="In-sample"
          />
          <Line
            type="monotone"
            dataKey="oos_value"
            stroke="#2dd4bf"
            strokeWidth={1.5}
            dot={false}
            connectNulls={false}
            name="Out-of-sample"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function StrategyCard({ strategy }: { strategy: StrategyResult }) {
  const paramPills = Object.entries(strategy.params).map(([k, v]) => `${k}=${v}`)

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-text-primary">{strategy.name}</h3>
          <p className="mt-1 text-sm text-text-secondary">{strategy.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <TimeframeBadge timeframe={strategy.timeframe} />
          <DirectionBadge direction={strategy.direction} />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {paramPills.map((p) => (
          <span
            key={p}
            className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 font-mono text-xs text-text-muted"
          >
            {p}
          </span>
        ))}
      </div>

      <EquityChart strategy={strategy} />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
            In-sample · {strategy.in_sample.period.start} – {strategy.in_sample.period.end}
          </p>
          <MetricStrip metrics={strategy.in_sample.metrics} dimmed />
        </div>
        <div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            Out-of-sample · {strategy.out_of_sample.period.start} – {strategy.out_of_sample.period.end}
          </p>
          <MetricStrip metrics={strategy.out_of_sample.metrics} />
        </div>
      </div>
    </div>
  )
}

export default function BacktestEnginePage() {
  const [sortKey, setSortKey] = useState<SortKey>('sharpe')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const sorted = useMemo(() => {
    return [...results.strategies].sort((a, b) => {
      const av = a.out_of_sample.metrics[sortKey]
      const bv = b.out_of_sample.metrics[sortKey]
      return sortDir === 'desc' ? bv - av : av - bv
    })
  }, [sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const assetOf = (id: string) => results.asset_universe[id] ?? '—'

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="px-[clamp(16px,4vw,32px)] py-20 md:py-24">
          <div className="mx-auto max-w-[900px]">
            <Link
              href="/#featured-work"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to work
            </Link>

            <header className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-accent">
                Project / Quantitative Infrastructure
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                Backtest <span className="text-accent">Engine</span>
              </h1>
              <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-text-secondary">
                A vectorised Python backtesting engine for multiple trading strategies. Benchmarks a classic
                trend-follower and a mean-reversion strategy against the original FYP IFVG+CISD approach — all
                through the same slippage, commission, and walk-forward pipeline.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
                {['Python', 'pandas', 'numpy', 'yfinance', 'Recharts', 'GitHub Actions'].map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-surface px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <section className="mb-16">
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Strategy Comparison</h2>
              <p className="mb-4 text-sm text-text-secondary">
                Out-of-sample metrics only — in-sample is where you fit, OOS is where you&apos;re judged. Click a
                column header to sort.
              </p>
              <div className="mb-6 inline-flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Benchmark</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">NQ Buy &amp; Hold OOS</span>
                <span className={`font-mono font-bold tabular-nums ${results.benchmark_return_pct >= 0 ? 'text-signal-green' : 'text-signal-red'}`}>
                  {results.benchmark_return_pct >= 0 ? '+' : ''}{results.benchmark_return_pct.toFixed(2)}%
                </span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left font-mono text-sm">
                  <thead className="border-b border-border bg-surface">
                    <tr>
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">Strategy</th>
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">Asset</th>
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">TF</th>
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">Direction</th>
                      {SORT_KEYS.map(({ key, label }) => (
                        <th
                          key={key}
                          className="cursor-pointer p-3 text-[11px] uppercase tracking-widest text-text-muted hover:text-text-primary"
                          onClick={() => toggleSort(key)}
                        >
                          {label} {sortKey === key ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((s) => {
                      const m = s.out_of_sample.metrics
                      return (
                        <tr key={s.id} className="border-b border-border/50 last:border-0 odd:bg-surface/40">
                          <td className="p-3 text-text-primary">{s.name}</td>
                          <td className="p-3 text-text-secondary">{assetOf(s.id)}</td>
                          <td className="p-3 font-mono text-accent">{s.timeframe}</td>
                          <td className="p-3 text-text-muted">
                            {s.direction === 'long_only'
                              ? 'Long'
                              : s.direction === 'short_only'
                              ? 'Short'
                              : 'Both'}
                          </td>
                          <td className={`p-3 tabular-nums ${m.sharpe >= 0 ? 'text-accent' : 'text-signal-red'}`}>
                            {fmt(m.sharpe)}
                          </td>
                          <td className={`p-3 tabular-nums ${m.sortino >= 0 ? 'text-accent' : 'text-signal-red'}`}>
                            {fmt(m.sortino)}
                          </td>
                          <td className={`p-3 tabular-nums ${m.calmar >= 0 ? 'text-accent' : 'text-signal-red'}`}>
                            {fmt(m.calmar)}
                          </td>
                          <td
                            className={`p-3 tabular-nums ${
                              m.total_return_pct >= 0 ? 'text-signal-green' : 'text-signal-red'
                            }`}
                          >
                            {fmt(m.total_return_pct)}%
                          </td>
                          <td className="p-3 tabular-nums text-signal-red">{fmt(m.max_drawdown_pct)}%</td>
                          <td className="p-3 tabular-nums text-text-primary">{fmt(m.win_rate_pct)}%</td>
                          <td className="p-3 tabular-nums text-text-secondary">{m.num_trades}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-16 space-y-6">
              <h2 className="font-display text-2xl font-bold text-text-primary">Strategy Breakdown</h2>
              {sorted.map((s) => (
                <StrategyCard key={s.id} strategy={s} />
              ))}
            </section>

            <section className="border-t border-border pt-8 text-sm text-text-muted">
              <p className="mb-1">
                Last updated:{' '}
                <span className="font-mono text-text-secondary">{results.generated_at.slice(0, 10)}</span>
              </p>
              <p className="mb-1">Slippage: 2 bps per side · Commission: ~$2 per trade (flat)</p>
              <p>Data: yfinance (SPY, NQ=F / ES=F) · Train/test split: 70% in-sample / 30% out-of-sample</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="https://github.com/aleks-drozy/aleksander-backtest-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent/90 active:scale-[0.97]"
                >
                  View Engine on GitHub
                </Link>
                <Link
                  href="/#featured-work"
                  className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary active:scale-[0.97]"
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
