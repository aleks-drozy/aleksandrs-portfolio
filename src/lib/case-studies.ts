export type CaseLink = { label: string; href: string }
export type CaseMetric = { value: string; label: string }
export type CaseSection = { heading: string; paragraphs?: string[]; bullets?: string[] }

export type CaseStudy = {
  slug: string
  kicker: string
  title: string
  year: string
  summary?: string
  timeline?: string
  role?: string
  stack: string[]
  links: CaseLink[]
  metrics?: CaseMetric[]
  hasEquityCurve?: boolean
  sections: CaseSection[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'jarvis',
    kicker: 'AI agent',
    title: 'JARVIS – voice-controlled AI assistant',
    year: '2026',
    timeline: 'Open source · built in public',
    role: 'Solo – design, agent, infra',
    stack: ['Claude agent', 'Electron', 'whisper.cpp', 'PowerShell', 'Windows Task Scheduler', 'Telegram Bot API', 'REST APIs'],
    links: [{ label: 'GitHub', href: 'https://github.com/aleks-drozy/jarvis' }],
    metrics: [
      { value: '100%', label: 'Local speech-to-text' },
      { value: '08:30', label: 'Daily unattended brief' },
      { value: '0', label: 'Financial actions allowed' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'JARVIS is a personal AI butler that runs my mornings. A voice-controlled, Iron-Man-style HUD sits on top of a scheduled agent pipeline that runs fully unattended and reports back before I wake.',
          'The interface is an Electron HUD driven by 100% local speech-to-text (whisper.cpp), so voice never leaves the machine. Underneath, a headless Claude agent executes a daily routine against real APIs.',
          'In July 2026 it went open source: a config-driven install with no personal values in the tree (CI-enforced), templated personality files so a fork sounds like its owner, secret-scanning CI, and adversarial-review-gated merges.',
        ],
      },
      {
        heading: 'The unattended pipeline',
        bullets: [
          'Aggregates my git history, notes, job alerts, and a real bank feed (aggregates only) into a single grounded morning brief, then delivers it to my phone over Telegram at 08:30 – email optional.',
          'Two-way Telegram remote: request a briefing or status from my phone, and text quick notes that surface in the next morning’s brief – with command de-duplication and at-most-once semantics.',
          'Runs on Windows Task Scheduler with no human in the loop – collectors are plain PowerShell, covered by unit tests.',
          'Integrates a jobs REST API (Jooble) for automated role discovery, with provider fallback and rate-aware querying.',
        ],
      },
      {
        heading: 'Safety and secrets',
        bullets: [
          'Hard-coded safety rules: no financial actions, and every send is self-only – the send lock fails closed if no owner is configured.',
          'OAuth token management with DPAPI-encrypted credentials at rest.',
          'Failure alarms so a broken run surfaces loudly instead of failing silently.',
        ],
      },
    ],
  },
  {
    slug: 'personal-performance-os',
    kicker: 'Full-stack SaaS',
    title: 'Personal Performance OS',
    year: '2026',
    timeline: '145 merged pull requests',
    role: 'Solo full-stack',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Groq (Llama 3.3 70B)', 'Vitest', 'Playwright'],
    links: [{ label: 'Live app (DailyAtlas)', href: 'https://dailyatlas.vercel.app' }],
    metrics: [
      { value: '33', label: 'Postgres tables (RLS)' },
      { value: '28', label: 'Migrations' },
      { value: '790+', label: 'Automated tests' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A production "operating system" for training, food, habits, tasks, and ideas – shipped solo across 145 merged pull requests. It is the app I actually use to run my own week.',
        ],
      },
      {
        heading: 'Engineering',
        bullets: [
          'Supabase auth over a 33-table Postgres schema with Row-Level Security on every table (28 migrations).',
          'Streaming AI coaching and day-planning on Groq (Llama 3.3 70B), hardened against prompt injection with persistent rate limiting.',
          'Backed by 790+ automated tests (Vitest unit + Playwright end-to-end), GitHub Actions CI, ESLint/Prettier, and light/dark theming.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'It proves I can take a large, stateful product from schema to shipped: real auth, real data isolation, real AI features that stay safe, and a test suite big enough to change things without fear.',
        ],
      },
    ],
  },
  {
    slug: 'maken',
    kicker: 'Live SaaS · my sport',
    title: 'Maken – AI weight-cut SaaS',
    year: '2026',
    timeline: 'Live with alpha users',
    role: 'Solo full-stack',
    stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Groq AI', 'Upstash Redis', 'Resend', 'PWA'],
    links: [{ label: 'Live app', href: 'https://maken-coach.vercel.app' }],
    metrics: [
      { value: 'Live', label: 'Real alpha users' },
      { value: 'Judo / BJJ', label: 'Built for' },
      { value: 'PWA', label: 'Installable + offline' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'An AI weight-cut platform for judo and BJJ athletes, built by a 16-year black belt for his own sport. It plans weight-class-aware cut protocols, training, and weekly check-ins around a tournament date.',
        ],
      },
      {
        heading: 'Engineering',
        bullets: [
          'Next.js 16 and Supabase (auth + RLS) with streaming AI estimates and training plans on Groq.',
          'Upstash Redis rate limiting, Resend email automation, and scheduled jobs.',
          'An installable, offline-capable PWA with full technical SEO (JSON-LD, sitemaps, long-form content).',
          'GDPR-compliant data export and deletion built in from the start.',
        ],
      },
    ],
  },
  {
    slug: 'fyp-trading-strategy',
    kicker: 'Quant research',
    title: 'NASDAQ-100 FYP Strategy',
    year: '2026',
    timeline: 'Final-year project',
    role: 'Research, implementation, evaluation',
    stack: ['Pine Script v6', 'TradingView', 'NQ1! futures', 'Walk-forward analysis'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/fyp-trading-strategy' },
      { label: 'Research program', href: '/projects/fyp-strategy-engine' },
    ],
    metrics: [
      { value: '56.94%', label: 'Win rate (in-sample)' },
      { value: '+$28,400', label: 'In-sample P&L' },
      { value: '1.703', label: 'In-sample profit factor' },
      { value: '72', label: 'Trades' },
    ],
    hasEquityCurve: true,
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'My final-year project: a rule-based quantitative strategy for NQ1! E-mini futures built around Smart Money Concepts. It targets the NY morning session with an Inverse Fair Value Gap plus Change in State of Delivery double confirmation, inside a strict 28-minute execution window.',
        ],
      },
      {
        heading: 'Honest results',
        paragraphs: [
          'In-sample (Jan 2025 – Feb 2026): 56.94% win rate, +$28,400 net P&L, 1.703 profit factor, 0.95% max drawdown across 72 trades.',
          'Out-of-sample (Jan 2023 – Dec 2024): 36.27% win rate, 0.855 profit factor, −$15,650. Reporting the weaker out-of-sample period is deliberate – it shows awareness of overfitting and market-regime risk rather than hiding it.',
        ],
      },
      {
        heading: 'What survived testing',
        bullets: [
          'A 1-minute liquidity-sweep filter was the only added filter that helped: +7.76% win rate, +0.311 profit factor. It stayed.',
          'HTF EMA trend filter, minimum FVG-size filter, strong-candle filter, and a volume filter were all tested and cut – no meaningful edge, or worse.',
        ],
      },
      {
        heading: 'The sequel: the edge went on trial',
        paragraphs: [
          'After submission I built a six-phase, pre-registered research program around this strategy – a no-lookahead backtest engine, walk-forward validation, and frozen decision rules – to settle whether the +$28,400 was a real edge or period-specific tuning. It was tuning: across ~10 years, three futures markets, and 1,402 out-of-sample trades, the edge did not survive. The full story is in the Quant Strategy Research Program case study.',
        ],
      },
    ],
  },
  {
    slug: 'fyp-strategy-engine',
    kicker: 'Quant research · capstone',
    title: 'Quant Strategy Research Program',
    year: '2026',
    timeline: 'Six pre-registered phases',
    role: 'Research design, engineering, statistics',
    stack: ['Python', 'pandas', 'NumPy', 'pytest', 'GitHub Actions', 'Walk-forward analysis', 'Bootstrap inference'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/fyp-strategy-engine' },
      { label: 'Monte Carlo repo', href: 'https://github.com/aleks-drozy/Trading-Strategy-Monte-Carlo-Simulation' },
    ],
    metrics: [
      { value: '176', label: 'Tests, green CI' },
      { value: '1,402', label: 'OOS trades judged' },
      { value: '10 yrs', label: 'Across 3 markets' },
      { value: '4', label: 'Data defects found' },
    ],
    sections: [
      {
        heading: 'The question',
        paragraphs: [
          'My FYP strategy showed +$28,400 in backtests. "Impressive on paper" is exactly what overfitting looks like, so I built a research program to find out whether the edge was real – designed so I could not fool myself.',
        ],
      },
      {
        heading: 'How honesty was enforced',
        bullets: [
          'Every phase pre-registered: grids, folds, floors, and the full verdict decision table were frozen and git-timestamped before each run; the runner recomputes the config hash and refuses to run on mismatch.',
          'A bar-by-bar backtest engine with no lookahead, regression-locked across refactors (results reproduce to 12 decimal places).',
          'Leak-free walk-forward optimisation, Monte Carlo bootstrap robustness studies, an ML trade-filter experiment, and day-cluster bootstrap confidence intervals built for correlated instruments.',
          'Adversarial design reviews before every build phase – 19 blockers caught and fixed before any result was produced.',
        ],
      },
      {
        heading: 'The verdict',
        paragraphs: [
          'Run with zero re-tuning over ten years of S&P, Dow, and independent-vendor Nasdaq futures, the frozen hypothesis lost everywhere: pooled profit factor 0.905 with the entire 90% confidence interval below breakeven across 1,402 out-of-sample trades. The pre-registered rule – which could equally have said "proven" – said DISPROVEN. The original edge was period-specific tuning, not a persistent effect.',
          'Bonus finding: the validation gates forensically identified four defect classes in the original dataset, including a ±60-minute DST timestamp bug, proven with lag-correlation evidence and a cross-instrument referee test.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'Anyone can produce a winning backtest. This project demonstrates the ability to design the experiment that determines whether it is real – and to accept the answer either way.',
        ],
      },
    ],
  },
  {
    slug: 'monte-carlo-robustness',
    kicker: 'Quant research',
    title: 'Monte Carlo Robustness Study',
    year: '2026',
    role: 'Solo',
    stack: ['Python', 'pandas', 'NumPy', 'Monte Carlo'],
    links: [{ label: 'GitHub', href: 'https://github.com/aleks-drozy/Trading-Strategy-Monte-Carlo-Simulation' }],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A Monte Carlo stress-test of a real 72-trade NQ futures record. One equity curve is a single draw from a distribution – this study asks what the rest of that distribution looks like.',
        ],
      },
      {
        heading: 'Method',
        bullets: [
          'Bootstrap resampling and order-reshuffle simulations over the real trade sequence.',
          'Drawdown-risk distributions instead of a single max-drawdown number.',
          'An honest writeup of what the simulations do and do not establish.',
        ],
      },
    ],
  },
  {
    slug: 'polymarket-favourite-bias',
    kicker: 'Quant research',
    title: 'Polymarket Favourite Bias',
    year: '2026',
    role: 'Solo',
    stack: ['Python', 'pandas', 'Pre-registration'],
    links: [{ label: 'GitHub', href: 'https://github.com/aleks-drozy/polymarket-favourite-bias' }],
    metrics: [
      { value: '2,418', label: 'Resolved markets' },
      { value: '90.6%', label: 'Favourites win' },
      { value: '−1%', label: 'Return after fees' },
      { value: 'NOT PROVEN', label: 'Verdict' },
    ],
    sections: [
      {
        heading: 'The question',
        paragraphs: [
          'Is blindly backing the favourite on Polymarket profitable? A pre-registered backtest over 2,418 resolved markets gives the answer: favourites win 90.6% of the time – and the strategy still loses about 1% after fees.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'A 90% win rate that loses money is exactly the kind of result that never survives an unregistered analysis – there is always a filter that "fixes" it. The verdict rule was frozen before the data was pulled, so NOT PROVEN is the finding, not a disappointment.',
        ],
      },
    ],
  },
  {
    slug: 'dublin-bikes-forecast',
    kicker: 'Live ML · self-scoring',
    title: 'Dublin Bikes Forecast',
    year: '2026',
    role: 'Solo – research, engineering, ops, design',
    stack: ['Python', 'scikit-learn', 'pandas', 'GitHub Actions', 'Oracle Cloud VM'],
    links: [
      { label: 'Live scoreboard', href: 'https://aleks-drozy.github.io/dublin-bikes-forecast/' },
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/dublin-bikes-forecast' },
      { label: 'Offline validation report', href: 'https://github.com/aleks-drozy/dublin-bikes-forecast/blob/main/reports/p2/REPORT.md' },
    ],
    metrics: [
      { value: '671K', label: 'Training rows' },
      { value: '8/8', label: 'Offline CIs positive' },
      { value: '68', label: 'Tests' },
      { value: 'PENDING', label: '28-day live verdict' },
    ],
    sections: [
      {
        heading: 'The claim',
        paragraphs: [
          'Twice a day, a frozen gradient-boosted model publishes the probability that each Dublin Bikes station will have a bike, and a free dock, at the next commute window (08:30 and 17:30). The forecasts answer a real commuter question – and they are the only kind of ML claim that cannot be dressed up afterwards, because they are scored live, in public, against pre-registered baselines.',
        ],
      },
      {
        heading: 'Why it cannot cheat',
        paragraphs: [
          'Every forecast is appended to a git ledger and pushed before its target time exists; the commit timestamp is the proof. Baselines (station climatology and persistence) are computed at issuance and stored inside each ledger row, so scoring can never recompute them with hindsight. Missed polls, feed gaps, and out-of-service stations are counted and published, never dropped. The verdict gate – beat both baselines at the overnight horizon over 28 scored days, day-clustered bootstrap 95% CIs excluding zero – was committed to the repo before the first byte of data was collected.',
        ],
      },
      {
        heading: 'Validation before deployment',
        paragraphs: [
          'The model earned its deployment offline first: trained on 671,312 forecast rows built from two years of Smart Dublin archive data (after proving the archive’s undocumented timestamps were UTC from commute-flux patterns), evaluated by 17-fold expanding-window monthly cross-validation, then a three-month held-out test touched exactly once. All eight Brier-skill confidence intervals came back positive and the reliability curves sat on the diagonal. The pipeline is leakage-guard tested: mutating any data after a forecast’s issuance instant cannot change that forecast.',
        ],
      },
      {
        heading: 'The first night',
        paragraphs: [
          'Hours after going live, a poll process died mid-write and wedged the pipeline; the next morning’s forecasts scored as UNSCOREABLE_GAP – 228 rows of honest failure, permanently in the public record. The fix shipped the same morning with a self-healing recovery routine and a regression test for the exact failure class. A system that documents its own outages is the point: the 28-day verdict, PASS or NOT PROVEN, will mean something either way.',
        ],
      },
    ],
  },
  {
    slug: 'football-trajectory',
    kicker: 'Quant research',
    title: 'Football Career Trajectory Model',
    year: '2026',
    role: 'Solo',
    stack: ['Python', 'pandas', 'Monte Carlo', 'FBref data'],
    links: [
      { label: 'Live explorer', href: 'https://aleks-drozy.github.io/football-trajectory/' },
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/football-trajectory' },
      { label: 'Predictions ledger', href: 'https://github.com/aleks-drozy/football-trajectory/blob/master/PREDICTIONS.md' },
    ],
    metrics: [
      { value: '24,057', label: 'Player-seasons' },
      { value: '6', label: 'Horizons tested' },
      { value: '2025–26', label: 'Unseen holdout' },
      { value: 'NOT PROVEN', label: 'Verdict' },
    ],
    sections: [
      {
        heading: 'The question',
        paragraphs: [
          'Can you project a teenager’s footballing career? A pre-registered Monte Carlo trajectory model with aging curves, built on 24,057 Big-5-league player-seasons from FBref and cross-checked against unseen 2025–26 data at six horizons.',
        ],
      },
      {
        heading: 'The verdict',
        paragraphs: [
          'NOT PROVEN: the model shows real skill, but its error bars are under-confident – and the pre-registered rule counts that as a fail. A model whose uncertainty cannot be trusted is not a model you can act on, however good its point estimates look.',
        ],
      },
    ],
  },
  {
    slug: 'speed-to-lead',
    kicker: 'AI agent · product demo',
    title: 'Speed-to-Lead AI Agent',
    year: '2026',
    role: 'Solo – product, engineering, demo',
    stack: ['JavaScript', 'HTML/CSS', 'GitHub Pages'],
    links: [
      { label: 'Live demo', href: 'https://aleks-drozy.github.io/speed-to-lead-demo/' },
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/speed-to-lead-demo' },
    ],
    metrics: [
      { value: '0 deps', label: 'Self-contained demo' },
      { value: 'Free text', label: 'Not a button tree' },
      { value: '1 line', label: 'Rebrand config' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A prototype AI receptionist for local businesses that lose enquiries to slow follow-up: a website visitor gets an instant reply and is qualified (issue, urgency, contact, area), with a lead-inbox dashboard showing leads caught versus missed and the revenue that follow-up speed saves. Booking and owner alerts are designed, not yet built.',
        ],
      },
      {
        heading: 'The demo, honestly labelled',
        bullets: [
          'The public demo is a scripted conversation engine in self-contained vanilla HTML/CSS/JS – zero external calls, zero API cost – so anyone can play a full lead-capture run and flip to the owner view without keys or setup.',
          'It still understands free text, not just button taps, with instant human-feeling chat: typing indicators, timestamps, "replied in 2s."',
          'A single CONFIG block rebrands the whole product – business, colours, services, ROI copy – in one line.',
        ],
      },
      {
        heading: 'Production design',
        paragraphs: [
          'The production version, not yet built, would be an embeddable Next.js widget with Claude running the conversation, Cal.com / Google Calendar for booking, a multi-tenant Supabase lead store behind Row-Level Security, and Resend / Twilio for owner alerts.',
        ],
      },
    ],
  },
  {
    slug: 'trading-dashboard',
    kicker: 'Full-stack',
    title: 'Trading Analytics Dashboard',
    year: '2026',
    role: 'Solo full-stack',
    timeline: '230+ commits',
    stack: ['TypeScript', 'Next.js', 'Python', 'FastAPI', 'Vitest', 'Vercel'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/Trading_Dashboard' },
      { label: 'Live app', href: 'https://tradingdashboard-one.vercel.app' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A full-stack trade journal and financial-market app: a Next.js dashboard with authenticated trade logging, analytics pages, and a market-research workflow.',
        ],
      },
      {
        heading: 'Engineering',
        bullets: [
          'Reusable components and typed schemas, with a Python-backed analytics workflow.',
          'Unit tests, pre-commit hooks, and documentation; deployed live to Vercel.',
          'Authenticated dashboard routes remain protected by login.',
        ],
      },
    ],
  },
  {
    slug: 'backtest-engine',
    kicker: 'Quant infra',
    title: 'Vectorised Backtesting Engine',
    year: '2026',
    role: 'Solo',
    stack: ['Python', 'pandas', 'numpy', 'yfinance', 'GitHub Actions'],
    links: [{ label: 'GitHub', href: 'https://github.com/aleks-drozy/aleksander-backtest-engine' }],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A vectorised Python backtesting engine with a strategy registry, a slippage/commission model, and a walk-forward train/test split.',
        ],
      },
      {
        heading: 'Engineering',
        bullets: [
          'Benchmarks SMA Crossover and RSI Mean Reversion against the FYP IFVG+CISD strategy on a common, reproducible harness.',
          'Modular strategy modules with test coverage; GitHub Actions auto-updates results on every push.',
        ],
      },
    ],
  },
  {
    slug: 'options-pricing-engine',
    kicker: 'Quant research',
    title: 'Options Pricing Engine',
    year: '2026',
    timeline: 'Built in one day',
    role: 'Solo – research, engineering, validation',
    stack: ['Python', 'Black-Scholes', 'CRR Binomial Trees', 'Monte Carlo', 'Implied Volatility'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/options-pricing-engine' },
      { label: 'Live explorer', href: 'https://aleks-drozy.github.io/options-pricing-engine/' },
    ],
    metrics: [
      { value: '7/7', label: 'Validation gates pass' },
      { value: '2.84e-14', label: 'Put-call parity precision' },
      { value: '95%', label: 'MC/BS CI coverage, 200 seeds' },
      { value: '59', label: 'Tests, no network' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'Three independent vanilla-option pricers, a Black-Scholes closed form, a CRR binomial tree with American exercise, and a seeded Monte Carlo simulation, that should all agree, and a set of gates that prove whether they actually do.',
        ],
      },
      {
        heading: 'Seven gates, all passing',
        bullets: [
          'Put-call parity holds to 2.84e-14 in the closed form, and across all 16 grid points in the Monte Carlo version.',
          'Tree-to-Black-Scholes convergence shrinks cleanly from 200 to 2,000 steps; Monte Carlo-to-Black-Scholes convergence holds correct 95% confidence-interval coverage over 200 seeds.',
          'Closed-form and finite-difference Greeks agree to 5.57e-6 relative error; no-arbitrage (American price at least the European price) holds with zero violations.',
        ],
      },
      {
        heading: 'The market disagrees with all three',
        paragraphs: [
          'Turning the validated engine on a real SPY option-chain snapshot and inverting market prices back to volatility surfaces the smile: the market quotes a different sigma at every strike, spanning 13.6 to 15.9% at-the-money across a 9 to 90 day window. Flat-vol Black-Scholes says that is impossible, the smile is the market pricing in the fat tails and skew a lognormal model assumes away.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'Built in one day via a Claude-Code-driven, subagent-based TDD plan with independent per-task review and a final adversarial whole-branch pass. A live GitHub Pages explorer with sliders for every pricing input carries a self-check badge that re-verifies all seven gates on every load, the numbers are regenerated, not hand-typed.',
        ],
      },
    ],
  },
  {
    slug: 'jobq',
    kicker: 'Systems programming',
    title: 'jobq, durable job queue',
    year: '2026',
    timeline: 'Built from scratch, standard library only',
    role: 'Solo',
    stack: ['Go', 'Write-Ahead Log', 'Property-Based Testing'],
    links: [{ label: 'GitHub', href: 'https://github.com/aleks-drozy/jobq' }],
    metrics: [
      { value: '65µs', label: 'Per-op under 16 producers' },
      { value: '5/5', label: 'Crash rounds survived' },
      { value: '0', label: 'Jobs lost or resurrected' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A durable, single-node job queue written from scratch in Go using only the standard library, the systems-programming piece, built to be explained rather than just to run. At-least-once delivery, leases with lazy expiry, retries with per-job attempt budgets, delayed jobs, and dead-letter queues.',
        ],
      },
      {
        heading: 'Proving durability',
        bullets: [
          'A segmented, CRC-checked write-ahead log with group commit: actors hand encoded records to a single committer, so sixteen producers share one fsync instead of paying for sixteen, cutting per-operation cost from 550µs sequential to 65µs under load.',
          'A crash harness kills the process cold, mid-write, at a random moment, across 5 rounds. Result: zero acknowledged jobs lost, zero resurrected, duplicates counted and permitted under the at-least-once contract.',
          'Two invariants verified under the race detector: conservation (every job accounted for in exactly one state across thousands of randomized interleavings) and unique settlement (exactly one lease Ack ever succeeds per job).',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'An actor-per-topic design, one goroutine per topic, no global mutex, means unrelated topics never contend and lease expiry is never a race. Everything is measured, not asserted: the README’s benchmark table is regenerated from the same harness a reader can run themselves.',
        ],
      },
    ],
  },
  {
    slug: 'ghost-bus-tracker',
    kicker: 'Data engineering, public impact',
    title: 'Ghost Bus Tracker',
    year: '2026',
    role: 'Solo – research, engineering, ops',
    stack: ['Python', 'GTFS-Realtime', 'Oracle Cloud', 'systemd'],
    links: [
      { label: 'Live site', href: 'https://aleks-drozy.github.io/ghost-bus/' },
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/ghost-bus' },
    ],
    metrics: [
      { value: '6', label: 'Honest outcome classes' },
      { value: '24/7', label: 'Live polling' },
      { value: '14 days', label: 'Public baseline window' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'Which Dublin buses actually show up? A 24/7 pipeline polls TFI’s GTFS-Realtime feed once a minute and classifies every scheduled Dublin Bus or Go-Ahead Ireland trip into exactly one of six honest outcomes, then publishes a public scoreboard and an open dataset from the result.',
        ],
      },
      {
        heading: 'The tracker grades itself',
        bullets: [
          'Every window where the tracker’s own polling drops below 90% uptime is pulled out of the operator’s stats and counted instead as tracker downtime, in public, on the same site as the bus data.',
          'A self-designed feed-health gate caught a real NTA VehiclePositions outage on its first live day, two operators’ position reporting collapsed simultaneously, and withdrew that day’s verdicts rather than publish roughly 280 false "vanished bus" accusations.',
          'Two rates, never summed: a bus that vanished mid-route (direct evidence) and a bus never tracked at all (which looks identical to a dead telematics unit) are reported as separate numbers, not combined into one accusatory score.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'Publicly grading a state service means the measurement itself has to be beyond reproach. Runs unattended on an Oracle Cloud VM; currently in a public 14-day pre-baseline collection window before route rankings publish.',
        ],
      },
    ],
  },
  {
    slug: 'registry-resolve',
    kicker: 'Data engineering, entity resolution',
    title: 'registry-resolve, cross-register entity resolution',
    year: '2026',
    timeline: 'Real Irish government data, built in one week',
    role: 'Solo',
    stack: ['Python', 'DuckDB', 'Splink', 'pandas', 'Streamlit'],
    links: [{ label: 'GitHub', href: 'https://github.com/aleks-drozy/registry-resolve' }],
    metrics: [
      { value: '898,481', label: 'Rows in the final entity spine' },
      { value: '1.000', label: 'Cohen’s kappa, self-consistency' },
      { value: '4.47M', label: 'Splink-scored candidate pairs' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'Entity resolution across three real Irish open-data registers: CRO company records, the Register of Charities, and public procurement award data. Deterministic ID join wherever a real identifier exists (a charity’s CRO Number maps straight onto a company number), Splink probabilistic matching for the one register with no supplier identifier at all, free-text names, sometimes with a trading-as inline.',
        ],
      },
      {
        heading: 'Proving the gold standard is trustworthy',
        bullets: [
          'Evaluated against 330 blind human-labelled pairs, judged without ever seeing the model’s score. A planted 10% of pairs were secretly re-shown under a different ID to measure self-consistency: first run, Cohen’s kappa came back 0.608, which the textbook Landis and Koch convention calls “substantial” but a self-imposed stricter bar (built for exactly this reason) called “borderline, re-check before citing.”',
          'Went back to the flagged disagreements, judged each one against the real record, re-ran the check. Kappa is genuinely 1.000, arrived at, not rounded there.',
          'Assembled the final entity spine with best-match-per-record resolution rather than naive graph clustering, after measuring that the real data has enough crossing ties (245 charities, 683 procurement rows scoring above threshold against more than one company) that connected-components clustering would merge distinct real companies together.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The match threshold, 0.95, was chosen from the real precision/recall tradeoff measured on the gold labels (88.4% precision / 54.2% recall at 0.95 versus 69.5% / 57.7% at 0.90), stated with its Wilson confidence interval rather than as a bare point estimate. Every number in the project’s methods writeup cites the exact artifact and command that produced it.',
        ],
      },
    ],
  },
  {
    slug: 'irish-property-price-index',
    kicker: 'Data engineering, dbt',
    title: 'Irish Property Price Index, mix-adjusted',
    year: '2026',
    timeline: '797,774 real transactions, validated against the CSO',
    role: 'Solo',
    stack: ['Python', 'dbt', 'DuckDB', 'SQL'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/irish-property-price-index' },
      { label: 'Live Dashboard', href: 'https://aleks-drozy.github.io/irish-property-price-index/dashboard/' },
    ],
    metrics: [
      { value: '797,774', label: 'Real Property Price Register sales' },
      { value: '+2.22 / -3.91', label: 'National vs Dublin index-point gap' },
      { value: '31 / 187', label: 'Months the two measures disagree on direction' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A mix-adjusted stratified price index built on the full Property Price Register, 797,774 real sales, using dbt and DuckDB, validated directly against the CSO’s own official Residential Property Price Index rather than assumed correct.',
        ],
      },
      {
        heading: 'The finding',
        bullets: [
          'Nationally, the raw median that gets reported overstates price growth by 2.22 index points on average versus the mix-adjusted measure. In Dublin it does the opposite, understating growth by 3.91 points, the opposite sign, from the same method on the same data.',
          'Across 187 months with a year-on-year comparison, 31 have the raw and mix-adjusted series moving in different directions entirely, one says prices fell, the other says they rose, in the same month. Worst case: June 2013, a 13.05-point gap at the post-crash trough.',
          'Not a broken number: both series correlate at 0.99+ over the full period. It’s the standard Simpson’s-paradox mechanism, what gets sold shifts composition over time, and a raw median conflates that shift with genuine price movement.',
        ],
      },
      {
        heading: 'Getting the pipeline honest',
        bullets: [
          'First CI run reported nothing at all, because the workflow YAML itself was invalid; the check meant to catch mistakes had never once run a job.',
          'Fixed that, then found the fixture job had never actually fetched the CSO benchmark it was supposed to validate against, so it had been silently passing against nothing since it was written.',
          'A third fix pinned the parquet engine dependency the export step needs at runtime. None of the three were subtle bugs, they were just never checked, a different failure mode from a bug and a more common one.',
        ],
      },
    ],
  },
  {
    slug: 'alpha-signal-lab',
    kicker: 'Quant research, applied ML',
    title: 'Alpha Signal Lab',
    year: '2026',
    timeline: 'Zero-cost, built and shipped in one weekend',
    role: 'Solo – research, engineering, validation',
    stack: ['Python', 'LightGBM', 'pandas', 'scikit-learn', 'SHAP', 'Plotly'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/alpha-signal-lab' },
      { label: 'Live dashboard', href: 'https://aleks-drozy.github.io/alpha-signal-lab/' },
    ],
    metrics: [
      { value: '0.0100', label: 'Honest rank IC' },
      { value: '0.1506', label: 'Leaky-twin rank IC' },
      { value: '8/8', label: 'Leakage audits pass' },
      { value: '117', label: 'Tests (CI)' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A pre-registered test of one question: does a gradient-boosted model (LightGBM) on twelve standard price/volume features beat plain 12-1 momentum and buy-and-hold on 5-day cross-sectional excess returns, for a 30-name US large-cap universe, under leakage-proof evaluation? The methodology (`specs/methodology.md`) was committed first and never edited after seeing results.',
          'Purged walk-forward cross-validation (5-day purge, ~1% embargo, expanding window) produced 21 out-of-sample folds from 2016 to 2026. Eight automated leakage-audit tests, shuffled-label destruction, split-boundary checks, point-in-time feature recomputation, shift-sensitivity, label-window purity, no-full-series statistics, price sanity, and determinism, all run against the real pipeline code, not mocks, and all pass.',
        ],
      },
      {
        heading: 'The number that proves the audit is real',
        bullets: [
          'A deliberately leaky “twin” control, same features, same model, same target, but naive shuffled k-fold instead of purged walk-forward, was run alongside the honest pipeline. Leaky rank IC: 0.1506. Honest rank IC: 0.0100. A fifteen-fold difference from a single methodological mistake, which is exactly what most published “alpha” likely is.',
          'A per-fold SHAP diagnostic explains the honest result rather than just reporting it: a volatility ratio dominates the model’s decisions in 21 of 21 folds (not momentum, despite momentum being the only feature with real edge on its own), the model’s picks agree with momentum’s only ~0.05% of the time (so it is not a noisy momentum clone), and it diverges from momentum’s picks on 92% of days, losing money on that swap slightly more than half the time.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'The honest model does not beat momentum, and the project says so as the headline, not a caveat. Built via a research/planning pass into an ultracode multi-phase build (scaffold, pipeline, audits/explainability, dashboard, verify), then hardened by three parallel adversarial audits that found and fixed twelve real data-integrity and numeric bugs before publishing. A static GitHub Pages dashboard (dark-mode aware, WCAG-checked contrast) leads with the honest-vs-leaky IC gap as the hero visual, not the model’s own performance.',
        ],
      },
    ],
  },
  {
    slug: 'job-hunt-analytics',
    kicker: 'Data engineering, analytics',
    title: 'Job-Hunt Analytics',
    year: '2026',
    timeline: 'One month of real, honestly-accumulated data',
    role: 'Solo – ETL, privacy gate, analysis, dashboard',
    stack: ['Python', 'DuckDB', 'SQL', 'Plotly', 'pytest', 'GitHub Actions'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aleks-drozy/job-hunt-analytics' },
      { label: 'Live dashboard', href: 'https://aleks-drozy.github.io/job-hunt-analytics/' },
    ],
    metrics: [
      { value: '50', label: 'Tracked applications' },
      { value: '65', label: 'Logged assistant ops' },
      { value: '164', label: 'Tests (1 skipped)' },
      { value: '7', label: 'Leak paths closed pre-publish' },
    ],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A month of my own real job search and AI-assistant operations, the same messy markdown trackers a personal agent (JARVIS) had already been keeping since early July, parsed by a tested ETL pipeline into a queryable DuckDB database and published as an anonymised static dashboard. Zero new data collection: the data already existed, honestly accumulated as a side effect of actually job-hunting.',
        ],
      },
      {
        heading: 'The privacy gate had to earn its keep',
        bullets: [
          'Role titles are not exported (re-identifiable via search), and internal topic slugs are not exported (they contain real company and person names); coarse derived categories replace both.',
          'Three agents adversarially attacked the sanitisation gate beyond its own unit tests and found seven real, non-theoretical leak paths, most seriously, a hand-crafted row with an extra unquoted CSV field could smuggle a real company name past the scanner because nothing validated a row’s cell count against its header. All seven fixed and independently re-verified, not just trusted from the fix report, before any export was generated.',
          'A whole-branch review after the analysis stage caught the published “as of” date silently including a future scheduled reminder rather than the last real observation, directly undercutting the project’s own honesty framing; corrected and re-verified before publishing.',
        ],
      },
      {
        heading: 'The honest headline',
        paragraphs: [
          'Nine SQL analyses, seven charts, and a static dashboard, deliberately framed as descriptive rather than inferential at this sample size: every rate is published beside its raw numerator and denominator rather than dressed up as a statistic it cannot support. The headline: 0 interviews from 50 tracked applications, reported as the whole result, not buried in it.',
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
