export type Direction = 'long_only' | 'short_only' | 'both'

export interface EquityPoint {
  date: string
  value: number
}

export interface PeriodMetrics {
  total_return_pct: number
  sharpe: number
  sortino: number
  calmar: number
  max_drawdown_pct: number
  win_rate_pct: number
  profit_factor: number
  num_trades: number
  // Statistical validation
  probabilistic_sharpe: number   // P(true SR > 0); >0.95 = statistically significant
  monte_carlo_p_value: number    // fraction of permutations beating actual SR; <0.05 = significant
}

export interface PeriodResult {
  period: { start: string; end: string }
  metrics: PeriodMetrics
  sampled: 'weekly'
  equity_curve: EquityPoint[]
}

export interface ParamSensitivity {
  param: string
  values: number[]
  oos_sharpes: number[]
}

export interface StrategyResult {
  id: string
  name: string
  description: string
  direction: Direction
  timeframe: string
  params: Record<string, number>
  in_sample: PeriodResult
  out_of_sample: PeriodResult
  // Risk / robustness diagnostics
  kelly_fraction: number                      // half-Kelly optimal leverage multiplier
  cost_sensitivity: Record<string, number>    // OOS Sharpe at {"1x","2x","4x"} cost levels
  param_sensitivity: ParamSensitivity[]       // OOS Sharpe across ±20% param grid
}

export interface BacktestResults {
  generated_at: string
  asset_universe: Record<string, string>
  benchmark_return_pct: number
  strategies: StrategyResult[]
  correlation_matrix: Record<string, Record<string, number>>
}
