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
    title: 'JARVIS — voice-controlled AI assistant',
    year: '2026',
    timeline: 'Open source · built in public',
    role: 'Solo — design, agent, infra',
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
          'Aggregates my git history, notes, job alerts, and a real bank feed (aggregates only) into a single grounded morning brief, then delivers it to my phone over Telegram at 08:30 — email optional.',
          'Two-way Telegram remote: request a briefing or status from my phone, and text quick notes that surface in the next morning’s brief — with command de-duplication and at-most-once semantics.',
          'Runs on Windows Task Scheduler with no human in the loop — collectors are plain PowerShell, covered by unit tests.',
          'Integrates a jobs REST API (Jooble) for automated role discovery, with provider fallback and rate-aware querying.',
        ],
      },
      {
        heading: 'Safety and secrets',
        bullets: [
          'Hard-coded safety rules: no financial actions, and every send is self-only — the send lock fails closed if no owner is configured.',
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
          'A production "operating system" for training, food, habits, tasks, and ideas — shipped solo across 145 merged pull requests. It is the app I actually use to run my own week.',
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
    title: 'Maken — AI weight-cut SaaS',
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
          'Out-of-sample (Jan 2023 – Dec 2024): 36.27% win rate, 0.855 profit factor, −$15,650. Reporting the weaker out-of-sample period is deliberate — it shows awareness of overfitting and market-regime risk rather than hiding it.',
        ],
      },
      {
        heading: 'What survived testing',
        bullets: [
          'A 1-minute liquidity-sweep filter was the only added filter that helped: +7.76% win rate, +0.311 profit factor. It stayed.',
          'HTF EMA trend filter, minimum FVG-size filter, strong-candle filter, and a volume filter were all tested and cut — no meaningful edge, or worse.',
        ],
      },
      {
        heading: 'The sequel: the edge went on trial',
        paragraphs: [
          'After submission I built a six-phase, pre-registered research program around this strategy — a no-lookahead backtest engine, walk-forward validation, and frozen decision rules — to settle whether the +$28,400 was a real edge or period-specific tuning. It was tuning: across ~10 years, three futures markets, and 1,402 out-of-sample trades, the edge did not survive. The full story is in the Quant Strategy Research Program case study.',
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
          'My FYP strategy showed +$28,400 in backtests. "Impressive on paper" is exactly what overfitting looks like, so I built a research program to find out whether the edge was real — designed so I could not fool myself.',
        ],
      },
      {
        heading: 'How honesty was enforced',
        bullets: [
          'Every phase pre-registered: grids, folds, floors, and the full verdict decision table were frozen and git-timestamped before each run; the runner recomputes the config hash and refuses to run on mismatch.',
          'A bar-by-bar backtest engine with no lookahead, regression-locked across refactors (results reproduce to 12 decimal places).',
          'Leak-free walk-forward optimisation, Monte Carlo bootstrap robustness studies, an ML trade-filter experiment, and day-cluster bootstrap confidence intervals built for correlated instruments.',
          'Adversarial design reviews before every build phase — 19 blockers caught and fixed before any result was produced.',
        ],
      },
      {
        heading: 'The verdict',
        paragraphs: [
          'Run with zero re-tuning over ten years of S&P, Dow, and independent-vendor Nasdaq futures, the frozen hypothesis lost everywhere: pooled profit factor 0.905 with the entire 90% confidence interval below breakeven across 1,402 out-of-sample trades. The pre-registered rule — which could equally have said "proven" — said DISPROVEN. The original edge was period-specific tuning, not a persistent effect.',
          'Bonus finding: the validation gates forensically identified four defect classes in the original dataset, including a ±60-minute DST timestamp bug, proven with lag-correlation evidence and a cross-instrument referee test.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'Anyone can produce a winning backtest. This project demonstrates the ability to design the experiment that determines whether it is real — and to accept the answer either way.',
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
          'A Monte Carlo stress-test of a real 72-trade NQ futures record. One equity curve is a single draw from a distribution — this study asks what the rest of that distribution looks like.',
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
          'Is blindly backing the favourite on Polymarket profitable? A pre-registered backtest over 2,418 resolved markets gives the answer: favourites win 90.6% of the time — and the strategy still loses about 1% after fees.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'A 90% win rate that loses money is exactly the kind of result that never survives an unregistered analysis — there is always a filter that "fixes" it. The verdict rule was frozen before the data was pulled, so NOT PROVEN is the finding, not a disappointment.',
        ],
      },
    ],
  },
  {
    slug: 'dublin-bikes-forecast',
    kicker: 'Live ML · self-scoring',
    title: 'Dublin Bikes Forecast',
    year: '2026',
    role: 'Solo — research, engineering, ops, design',
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
          'Twice a day, a frozen gradient-boosted model publishes the probability that each Dublin Bikes station will have a bike, and a free dock, at the next commute window (08:30 and 17:30). The forecasts answer a real commuter question — and they are the only kind of ML claim that cannot be dressed up afterwards, because they are scored live, in public, against pre-registered baselines.',
        ],
      },
      {
        heading: 'Why it cannot cheat',
        paragraphs: [
          'Every forecast is appended to a git ledger and pushed before its target time exists; the commit timestamp is the proof. Baselines (station climatology and persistence) are computed at issuance and stored inside each ledger row, so scoring can never recompute them with hindsight. Missed polls, feed gaps, and out-of-service stations are counted and published, never dropped. The verdict gate — beat both baselines at the overnight horizon over 28 scored days, day-clustered bootstrap 95% CIs excluding zero — was committed to the repo before the first byte of data was collected.',
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
          'Hours after going live, a poll process died mid-write and wedged the pipeline; the next morning’s forecasts scored as UNSCOREABLE_GAP — 228 rows of honest failure, permanently in the public record. The fix shipped the same morning with a self-healing recovery routine and a regression test for the exact failure class. A system that documents its own outages is the point: the 28-day verdict, PASS or NOT PROVEN, will mean something either way.',
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
          'NOT PROVEN: the model shows real skill, but its error bars are under-confident — and the pre-registered rule counts that as a fail. A model whose uncertainty cannot be trusted is not a model you can act on, however good its point estimates look.',
        ],
      },
    ],
  },
  {
    slug: 'speed-to-lead',
    kicker: 'AI agent · product demo',
    title: 'Speed-to-Lead AI Agent',
    year: '2026',
    role: 'Solo — product, engineering, demo',
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
          'The public demo is a scripted conversation engine in self-contained vanilla HTML/CSS/JS — zero external calls, zero API cost — so anyone can play a full lead-capture run and flip to the owner view without keys or setup.',
          'It still understands free text, not just button taps, with instant human-feeling chat: typing indicators, timestamps, "replied in 2s."',
          'A single CONFIG block rebrands the whole product — business, colours, services, ROI copy — in one line.',
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
    slug: 'noteit',
    kicker: 'Full-stack',
    title: 'NoteIt',
    year: '2026',
    role: 'Solo full-stack',
    stack: ['JavaScript', 'Node.js', 'MongoDB'],
    links: [{ label: 'GitHub', href: 'https://github.com/aleks-drozy/noteit' }],
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'A full-stack note-taking app with authentication, CRUD notes, private sharing, and role-based publishing.',
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
