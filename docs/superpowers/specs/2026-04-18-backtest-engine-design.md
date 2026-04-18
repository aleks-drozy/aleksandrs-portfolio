# Backtest Engine — Design Spec

**Date:** 2026-04-18
**Owner:** Aleksandrs Drozdovs
**Purpose:** Build a vectorised Python backtesting engine for multiple trading strategies, with a results dashboard deployed as a case study page on the existing Next.js portfolio.

---

## Context

The portfolio already contains a FYP case study page for the IFVG+CISD NASDAQ-100 strategy. This project extends that by building the *infrastructure* behind such strategies — a reusable backtesting engine that can run any registered strategy through the same pipeline. The goal is to signal to quant/finance interviewers that you understand not just one strategy but the tooling that evaluates strategies systematically.

---

## Goals

1. Demonstrate software engineering depth: clean engine/strategy separation, extensible strategy registry.
2. Show quantitative breadth: classic benchmarks (SMA crossover, RSI mean-reversion) alongside your own FYP research.
3. Deliver a live results page on the portfolio at `/projects/backtest-engine` that renders equity curves, metrics, and a strategy comparison table.
4. Automate the pipeline — push to the engine repo, results update automatically on the portfolio.

## Non-Goals

- No live trading, no brokerage integration.
- No portfolio optimisation or multi-asset allocation.
- No advanced walk-forward (rolling or anchored windows) — simple train/test split only.
- No interactive parameter tuning on the dashboard — results are pre-computed.

---

## Architecture

Two repos, one automated pipeline:

```
aleksander-backtest-engine/     ← new Python repo
├── engine/
│   ├── backtester.py           ← Backtester class
│   ├── base_strategy.py        ← Abstract Strategy base class
│   └── metrics.py              ← Sharpe, drawdown, profit factor, win rate
├── strategies/
│   ├── sma_crossover.py
│   ├── rsi_mean_reversion.py
│   └── ifvg_cisd.py
├── data/
│   ├── fetcher.py              ← yfinance fetch + CSV cache
│   └── cache/                  ← gitignored CSVs
├── run_all.py                  ← CLI entry point
└── results/
    └── backtest_results.json   ← committed output

aleksander-portfolio/           ← existing repo
├── src/data/
│   └── backtest_results.json   ← copied here by GitHub Actions
└── src/app/projects/
    └── backtest-engine/
        └── page.tsx            ← dashboard page
```

**Data flow:**
1. `run_all.py` fetches OHLCV via yfinance → caches to CSV → runs each registered strategy → writes `results/backtest_results.json`.
2. GitHub Actions runs `run_all.py` on push to `main`, copies the JSON to `aleksander-portfolio/src/data/backtest_results.json`, and pushes to `master` with `[skip ci]`.
3. Vercel auto-deploys the portfolio. The dashboard page reads the JSON at build time — fully static, zero runtime dependency.

---

## Engine & Strategy Interface

### Abstract base class

```python
class Strategy(ABC):
    name: str                              # display name
    description: str                       # one sentence, shown on dashboard card
    direction: Literal['long_only', 'short_only', 'both']
    params: dict                           # hyperparameters

    @abstractmethod
    def generate_signals(self, df: pd.DataFrame) -> pd.Series:
        # Returns Series of 1 (long), -1 (short), 0 (flat) aligned to df.index
        ...
```

### Backtester class

Accepts a `Strategy` instance and an OHLCV `DataFrame`. Handles:

- **Slippage** — 2 basis points per side, applied at fill price.
- **Commissions** — $2 per trade (flat), subtracted from PnL at open/close.
- **Walk-forward split** — configurable `train_pct` (default `0.70`). Metrics computed separately for in-sample and out-of-sample periods.
- **Position sizing** — fixed 1 unit per trade. Keeps strategies comparable.
- **Direction enforcement** — signals filtered against `strategy.direction` before execution.

### Metrics (computed per period)

| Metric | Notes |
|---|---|
| `total_return_pct` | Cumulative return over the period |
| `sharpe` | Annualised, risk-free rate = 0 |
| `max_drawdown_pct` | Peak-to-trough, negative value |
| `win_rate_pct` | Winning trades / total trades |
| `profit_factor` | Gross profit / gross loss |
| `num_trades` | Total round-trip trades |

---

## Strategies

| ID | Name | Direction | Asset | Key Params |
|---|---|---|---|---|
| `SMA_CROSSOVER` | SMA Crossover | `long_only` | SPY | `fast=20, slow=50` |
| `RSI_MEAN_REVERSION` | RSI Mean Reversion | `long_only` | SPY | `period=14, oversold=30, overbought=70` |
| `IFVG_CISD` | IFVG + CISD | `both` | NQ=F | FYP parameters |

**NQ=F data note:** yfinance coverage on continuous futures contracts can be patchy before 2020. Test the fetch early in development. Fallback order: NQ=F → ES=F → FYP CSV (local file committed to the engine repo).

**Strategy rationale:**
- SMA Crossover is the canonical trend-following benchmark — every quant interviewer knows its expected behaviour.
- RSI Mean Reversion contrasts it with a counter-trend approach, demonstrating regime awareness.
- IFVG+CISD is the original FYP research — run through the same engine as the classics, making the comparison credible.

---

## Output JSON Schema

Path in portfolio repo: `src/data/backtest_results.json`

```json
{
  "generated_at": "2026-04-18T12:00:00Z",
  "asset_universe": {
    "SMA_CROSSOVER": "SPY",
    "RSI_MEAN_REVERSION": "SPY",
    "IFVG_CISD": "NQ=F"
  },
  "strategies": [
    {
      "id": "SMA_CROSSOVER",
      "name": "SMA Crossover",
      "description": "Goes long when a fast SMA crosses above a slow SMA; exits when the cross reverses.",
      "direction": "long_only",
      "params": { "fast": 20, "slow": 50 },
      "in_sample": {
        "period": { "start": "2018-01-01", "end": "2022-07-31" },
        "metrics": {
          "total_return_pct": 42.1,
          "sharpe": 0.91,
          "max_drawdown_pct": -18.4,
          "win_rate_pct": 54.2,
          "profit_factor": 1.31,
          "num_trades": 38
        },
        "sampled": "weekly",
        "equity_curve": [{ "date": "2018-01-05", "value": 10000 }]
      },
      "out_of_sample": {
        "period": { "start": "2022-08-01", "end": "2025-12-31" },
        "metrics": {
          "total_return_pct": 12.3,
          "sharpe": 0.54,
          "max_drawdown_pct": -14.1,
          "win_rate_pct": 51.0,
          "profit_factor": 1.12,
          "num_trades": 21
        },
        "sampled": "weekly",
        "equity_curve": [{ "date": "2022-08-05", "value": 10000 }]
      }
    }
  ]
}
```

**Schema decisions:**
- Equity curves reset to `10000` at the start of each period — in-sample and OOS are visually comparable.
- Weekly sampling — daily data for 5 years (~1,250 points) bloats the file; weekly reduces to ~260 points per curve without losing shape.
- `generated_at` powers the "last updated" note on the dashboard without any runtime dependency.
- `description` is emitted by the engine (where the strategy is defined), not hardcoded in the Next.js page.

---

## GitHub Actions Pipeline

File: `.github/workflows/run_backtest.yml` in the engine repo. Triggers on push to `main`.

**Steps:**
1. Checkout engine repo.
2. Set up Python 3.11, install `pandas numpy yfinance scipy`.
3. Restore yfinance CSV cache (cache key: `yfinance-data-{year}-{week}`). Cuts runtime from ~30s to ~5s after the first run of each week.
4. Run `python run_all.py`.
5. Save CSV cache.
6. Checkout `aleksander-portfolio` using `PORTFOLIO_PAT` secret.
7. Copy `results/backtest_results.json` → `aleksander-portfolio/src/data/backtest_results.json`.
8. Commit and push: `chore: update backtest results [skip ci]`.

**PAT requirements:** Fine-grained Personal Access Token, scoped to `aleksander-portfolio` only, permission `contents: write`. Store as `PORTFOLIO_PAT` in the engine repo secrets. Do not use a classic token with broad `repo` access.

**`[skip ci]`** on the commit message prevents any CI on the portfolio repo from re-triggering on the results update.

**Local development:** `python run_all.py` works standalone. Results write to `results/` locally. Manually copy to `src/data/` in the portfolio repo during development.

---

## Next.js Dashboard Page

Route: `/projects/backtest-engine` — same file/layout conventions as the existing FYP case study page.

### Dependencies

Install in the portfolio repo before building the page:
```bash
npm install recharts
```

### Data loading

```typescript
import results from '@/data/backtest_results.json'
```

Static import — zero runtime cost, tree-shaken at build time. TypeScript interface `BacktestResults` derived directly from the JSON schema.

### Page structure (top to bottom)

1. **Header** — back link → `/#featured-work`, eyebrow label, title, one-paragraph description, tech tags: `Python`, `pandas`, `numpy`, `yfinance`, `Recharts`, `GitHub Actions`.

2. **Strategy comparison table** — one row per strategy. Columns: Name, Asset, Direction, Total Return (OOS), Sharpe (OOS), Max Drawdown (OOS), Win Rate (OOS), Trades. OOS metrics only — in-sample is where you fit; OOS is where you're judged. Default sort: OOS Sharpe descending. Sortable by any column via `useState`.

3. **Strategy cards** (one per strategy, stacked vertically). Each card contains:
   - Strategy name + description
   - Direction badge + params pill row (e.g. `fast=20 slow=50`)
   - Equity curve chart (Recharts `LineChart`):
     - In-sample line: `#334155` (border-strong — reads as secondary without disappearing on dark backgrounds)
     - OOS line: `#2dd4bf` (accent teal)
     - Vertical dashed line at the train/test split date
     - Both curves reset to 10,000 — share the same y-axis
   - Two metric strips side by side: in-sample (dimmed, `text-muted`) vs out-of-sample (highlighted, `text-primary`)

4. **Footer note** — "Last updated: {generated_at}", slippage/commission assumptions (2 bps + $2/trade), data sources (yfinance).

### Visual consistency

Follows the existing portfolio design system: `#07080d` background, `#0f1117` surface cards, `#2dd4bf` accent, `font-mono` for numbers and labels. No new design tokens introduced.

---

## Testing

- **Engine unit tests** (`pytest`): one test per strategy verifying signals shape, metrics are non-NaN, equity curve resets to 10,000, weekly sampling reduces point count correctly.
- **Schema validation**: `run_all.py` validates output JSON against a Pydantic model before writing — catches missing fields before the file reaches the portfolio.
- **Portfolio build test**: `next build` in CI catches TypeScript errors on the dashboard page.
