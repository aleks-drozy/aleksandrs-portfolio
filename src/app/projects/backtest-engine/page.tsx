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
import type { BacktestResults, StrategyResult, PeriodMetrics, ParamSensitivity } from '@/types/backtest'
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

// ── Badges ────────────────────────────────────────────────────────────────────

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

/** Green / yellow / red significance badge */
function SigBadge({ label, value, good, warn }: { label: string; value: string; good: boolean; warn: boolean }) {
  const color = good ? 'text-signal-green border-signal-green/30 bg-signal-green/10'
    : warn ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
    : 'text-signal-red border-signal-red/30 bg-signal-red/10'
  return (
    <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${color}`}>
      {label} {value}
    </span>
  )
}

// ── Metric strip ──────────────────────────────────────────────────────────────

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

// ── Equity chart ──────────────────────────────────────────────────────────────

function EquityChart({ strategy }: { strategy: StrategyResult }) {
  const splitDate = strategy.out_of_sample.period.start
  const chartData = useMemo(() => {
    const isPoints = strategy.in_sample.equity_curve.map((p) => ({
      date: p.date, is_value: p.value, oos_value: undefined as number | undefined,
    }))
    const oosPoints = strategy.out_of_sample.equity_curve.map((p) => ({
      date: p.date, is_value: undefined as number | undefined, oos_value: p.value,
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
            axisLine={false} tickLine={false}
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
          <Line type="monotone" dataKey="is_value" stroke="#334155" strokeWidth={1.5} dot={false} connectNulls={false} name="In-sample" />
          <Line type="monotone" dataKey="oos_value" stroke="#2dd4bf" strokeWidth={1.5} dot={false} connectNulls={false} name="Out-of-sample" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Cost sensitivity bar ───────────────────────────────────────────────────────

function CostSensitivityBar({ cost_sensitivity }: { cost_sensitivity: Record<string, number> }) {
  const levels = [
    { label: '1×', key: '1x', note: 'baseline' },
    { label: '2×', key: '2x', note: 'slippage spike' },
    { label: '4×', key: '4x', note: 'stressed' },
  ]
  const maxAbs = Math.max(...levels.map((l) => Math.abs(cost_sensitivity[l.key] ?? 0)), 0.01)
  return (
    <div className="rounded-md border border-border bg-surface p-3">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-text-muted">Cost Sensitivity — OOS Sharpe</p>
      <div className="space-y-1.5">
        {levels.map(({ label, key, note }) => {
          const val = cost_sensitivity[key] ?? 0
          const pct = Math.min(Math.abs(val) / maxAbs, 1) * 100
          const color = val > 0.5 ? 'bg-signal-green' : val > 0 ? 'bg-yellow-500' : 'bg-signal-red'
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="w-5 font-mono text-[10px] text-text-muted">{label}</span>
              <div className="relative h-2 flex-1 rounded-full bg-surface-elevated">
                <div className={`absolute left-0 top-0 h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
              </div>
              <span className={`w-10 text-right font-mono text-[10px] tabular-nums ${val >= 0 ? 'text-text-primary' : 'text-signal-red'}`}>
                {fmt(val)}
              </span>
              <span className="hidden font-mono text-[9px] text-text-muted sm:inline">{note}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Param sensitivity sparkline ───────────────────────────────────────────────

function ParamSensitivityChart({ entry }: { entry: ParamSensitivity }) {
  const data = entry.values.map((v, i) => ({ v: parseFloat(v.toFixed(2)), sharpe: entry.oos_sharpes[i] }))
  const midIdx = Math.floor(data.length / 2)
  const midVal = data[midIdx]?.sharpe ?? 0
  return (
    <div className="rounded-md border border-border bg-surface p-3">
      <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-text-muted">
        {entry.param} sensitivity
      </p>
      <div className="h-[60px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 2, right: 4, bottom: 2, left: 4 }}>
            <XAxis dataKey="v" tick={{ fill: '#475569', fontSize: 8 }} axisLine={false} tickLine={false} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ background: '#0f1117', border: '1px solid #1e293b', borderRadius: 6, padding: '4px 8px' }}
              labelStyle={{ color: '#94a3b8', fontSize: 9 }}
              itemStyle={{ color: '#f1f5f9', fontSize: 10, fontFamily: 'monospace' }}
              formatter={(v) => [fmt(Number(v)), 'Sharpe']}
            />
            <ReferenceLine x={data[midIdx]?.v} stroke="#334155" strokeDasharray="3 3" />
            <Line
              type="monotone" dataKey="sharpe"
              stroke={midVal > 0.3 ? '#2dd4bf' : '#ef4444'}
              strokeWidth={1.5} dot={{ fill: '#2dd4bf', r: 2 }} connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Strategy card ─────────────────────────────────────────────────────────────

function StrategyCard({ strategy }: { strategy: StrategyResult }) {
  const paramPills = Object.entries(strategy.params).map(([k, v]) => `${k}=${v}`)
  const m = strategy.out_of_sample.metrics

  const psrGood = m.probabilistic_sharpe >= 0.95
  const psrWarn = m.probabilistic_sharpe >= 0.80 && m.probabilistic_sharpe < 0.95
  const mcGood  = m.monte_carlo_p_value <= 0.05
  const mcWarn  = m.monte_carlo_p_value > 0.05 && m.monte_carlo_p_value <= 0.10
  const kellyPositive = strategy.kelly_fraction > 0

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      {/* Header */}
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

      {/* Param pills */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {paramPills.map((p) => (
          <span key={p} className="rounded-md border border-border bg-surface-elevated px-2 py-0.5 font-mono text-xs text-text-muted">
            {p}
          </span>
        ))}
      </div>

      {/* Statistical badges */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        <SigBadge label="PSR" value={fmt(m.probabilistic_sharpe)} good={psrGood} warn={psrWarn} />
        <SigBadge label="MC p" value={fmt(m.monte_carlo_p_value)} good={mcGood} warn={mcWarn} />
        <SigBadge
          label="Kelly"
          value={`${fmt(strategy.kelly_fraction)}×`}
          good={strategy.kelly_fraction > 0.5}
          warn={strategy.kelly_fraction > 0 && strategy.kelly_fraction <= 0.5}
        />
      </div>

      {/* Equity chart */}
      <EquityChart strategy={strategy} />

      {/* IS / OOS metric strips */}
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

      {/* Robustness row */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <CostSensitivityBar cost_sensitivity={strategy.cost_sensitivity} />
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(strategy.param_sensitivity.length, 2)}, 1fr)` }}>
          {strategy.param_sensitivity.slice(0, 2).map((ps) => (
            <ParamSensitivityChart key={ps.param} entry={ps} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Correlation heatmap ───────────────────────────────────────────────────────

function CorrelationHeatmap() {
  const ids = Object.keys(results.correlation_matrix)
  if (ids.length === 0) return null

  function corrColor(v: number): string {
    // -1 → red, 0 → neutral surface, +1 → teal
    if (v >= 0.7)  return 'bg-accent/40 text-accent'
    if (v >= 0.4)  return 'bg-accent/20 text-accent'
    if (v >= 0.1)  return 'bg-surface-elevated text-text-secondary'
    if (v >= -0.1) return 'bg-surface text-text-muted'
    if (v >= -0.4) return 'bg-signal-red/10 text-signal-red'
    return 'bg-signal-red/25 text-signal-red'
  }

  // Shorten IDs for display
  const shortId = (id: string) => id.replace(/_/g, ' ').split(' ').map(w => w[0]).join('')

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-center font-mono text-[10px]">
        <thead className="border-b border-border bg-surface">
          <tr>
            <th className="p-2 text-left text-text-muted" />
            {ids.map((id) => (
              <th key={id} className="p-2 uppercase tracking-widest text-text-muted" title={id}>
                {shortId(id)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ids.map((rowId) => (
            <tr key={rowId} className="border-b border-border/50 last:border-0">
              <td className="p-2 text-left uppercase tracking-widest text-text-muted" title={rowId}>
                {shortId(rowId)}
              </td>
              {ids.map((colId) => {
                const v = results.correlation_matrix[rowId]?.[colId] ?? 0
                return (
                  <td key={colId} className={`p-2 tabular-nums ${corrColor(v)}`}>
                    {fmt(v)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

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
                A vectorised Python backtesting engine with walk-forward validation, statistical
                significance testing, and VIX regime overlays. Benchmarks nine strategies — from
                classic trend-following to VWAP mean-reversion and overnight gap fades — through
                the same slippage, commission, and half-Kelly sizing pipeline.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
                {['Python', 'pandas', 'numpy', 'scipy', 'yfinance', 'Recharts', 'GitHub Actions'].map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-surface px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* ── Strategy comparison table ── */}
            <section className="mb-16">
              <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">Strategy Comparison</h2>
              <p className="mb-4 text-sm text-text-secondary">
                Out-of-sample metrics only — in-sample is where you fit, OOS is where you&apos;re judged.
                PSR = Probabilistic Sharpe Ratio (≥0.95 significant). MC p = Monte Carlo p-value (≤0.05 significant).
                Click a column header to sort.
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
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">Dir</th>
                      {SORT_KEYS.map(({ key, label }) => (
                        <th
                          key={key}
                          className="cursor-pointer p-3 text-[11px] uppercase tracking-widest text-text-muted hover:text-text-primary"
                          onClick={() => toggleSort(key)}
                        >
                          {label} {sortKey === key ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                        </th>
                      ))}
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">PSR</th>
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">MC p</th>
                      <th className="p-3 text-[11px] uppercase tracking-widest text-text-muted">Kelly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((s) => {
                      const m = s.out_of_sample.metrics
                      const psrGood = m.probabilistic_sharpe >= 0.95
                      const mcGood  = m.monte_carlo_p_value  <= 0.05
                      return (
                        <tr key={s.id} className="border-b border-border/50 last:border-0 odd:bg-surface/40">
                          <td className="p-3 text-text-primary">{s.name}</td>
                          <td className="p-3 text-text-secondary">{assetOf(s.id)}</td>
                          <td className="p-3 font-mono text-accent">{s.timeframe}</td>
                          <td className="p-3 text-text-muted">
                            {s.direction === 'long_only' ? 'Long' : s.direction === 'short_only' ? 'Short' : 'Both'}
                          </td>
                          <td className={`p-3 tabular-nums ${m.sharpe >= 0 ? 'text-accent' : 'text-signal-red'}`}>{fmt(m.sharpe)}</td>
                          <td className={`p-3 tabular-nums ${m.sortino >= 0 ? 'text-accent' : 'text-signal-red'}`}>{fmt(m.sortino)}</td>
                          <td className={`p-3 tabular-nums ${m.calmar >= 0 ? 'text-accent' : 'text-signal-red'}`}>{fmt(m.calmar)}</td>
                          <td className={`p-3 tabular-nums ${m.total_return_pct >= 0 ? 'text-signal-green' : 'text-signal-red'}`}>{fmt(m.total_return_pct)}%</td>
                          <td className="p-3 tabular-nums text-signal-red">{fmt(m.max_drawdown_pct)}%</td>
                          <td className="p-3 tabular-nums text-text-primary">{fmt(m.win_rate_pct)}%</td>
                          <td className="p-3 tabular-nums text-text-secondary">{m.num_trades}</td>
                          <td className={`p-3 tabular-nums font-bold ${psrGood ? 'text-signal-green' : 'text-yellow-400'}`}>{fmt(m.probabilistic_sharpe)}</td>
                          <td className={`p-3 tabular-nums font-bold ${mcGood ? 'text-signal-green' : 'text-yellow-400'}`}>{fmt(m.monte_carlo_p_value)}</td>
                          <td className={`p-3 tabular-nums ${s.kelly_fraction > 0 ? 'text-accent' : 'text-signal-red'}`}>{fmt(s.kelly_fraction)}×</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Correlation matrix ── */}
            <section className="mb-16">
              <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">Strategy Correlation</h2>
              <p className="mb-4 text-sm text-text-secondary">
                Pairwise Pearson correlation of daily OOS P&amp;L. Strategies with correlation &gt;0.7 are
                effectively the same bet — only the best should be run at full size. Hover an abbreviated
                ID to see the full strategy name.
              </p>
              <CorrelationHeatmap />
            </section>

            {/* ── Strategy breakdown ── */}
            <section className="mb-16 space-y-6">
              <h2 className="font-display text-2xl font-bold text-text-primary">Strategy Breakdown</h2>
              <p className="text-sm text-text-secondary">
                Each card shows the equity curve (grey = in-sample, teal = out-of-sample walk-forward),
                statistical significance badges, cost-sensitivity bars, and parameter robustness sparklines.
              </p>
              {sorted.map((s) => (
                <StrategyCard key={s.id} strategy={s} />
              ))}
            </section>

            {/* ── Footer metadata ── */}
            <section className="border-t border-border pt-8 text-sm text-text-muted">
              <p className="mb-1">
                Last updated:{' '}
                <span className="font-mono text-text-secondary">{results.generated_at.slice(0, 10)}</span>
              </p>
              <p className="mb-1">Slippage: 2 bps per side · Commission: ~$2 per trade (flat)</p>
              <p className="mb-1">Data: yfinance (NQ=F) · Walk-forward: 3-fold expanding IS · Sizing: half-Kelly + ATR volatility scaling</p>
              <p>VIX overlay: position ×0.5 when VIX &gt;25, ×1.2 when VIX &lt;15</p>
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
