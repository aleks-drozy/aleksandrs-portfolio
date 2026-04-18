export type Direction = 'long_only' | 'short_only' | 'both'

export interface EquityPoint {
  date: string
  value: number
}

export interface PeriodMetrics {
  total_return_pct: number
  sharpe: number
  max_drawdown_pct: number
  win_rate_pct: number
  profit_factor: number
  num_trades: number
}

export interface PeriodResult {
  period: { start: string; end: string }
  metrics: PeriodMetrics
  sampled: 'weekly'
  equity_curve: EquityPoint[]
}

export interface StrategyResult {
  id: string
  name: string
  description: string
  direction: Direction
  params: Record<string, number>
  in_sample: PeriodResult
  out_of_sample: PeriodResult
}

export interface BacktestResults {
  generated_at: string
  asset_universe: Record<string, string>
  strategies: StrategyResult[]
}
