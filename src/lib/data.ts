export type Metric = { value: string; label: string; href: string }
export type Stat = { value: string; label: string }

export const site = {
  name: 'Aleksandrs Drozdovs',
  initials: 'AD',
  role: 'Software Engineer',
  headline: 'Software engineer',
  headlineAccent: 'with quant instincts.',
  status: 'Available now · Graduate roles',
  location: 'Dublin, Ireland',
  lede:
    'Computer Science & Software Engineering graduate (Maynooth, 2026). I ship production systems end to end: live SaaS, an agentic AI assistant, a durable job queue in Go, and five pre-registered research programs that publish their verdict even when the answer is no. Five fixes merged upstream into other teams’ codebases.',
  email: 'aleksandrs.drozdovs2005@gmail.com',
  cvUrl: '/cv.pdf',
  github: 'https://github.com/aleks-drozy',
  linkedin: 'https://www.linkedin.com/in/aleksandrsdrozdovs/',
}

// Every hero number links to the section that proves it. Nothing here comes
// from a private repo: the old "790+ tests" figure did, and was unverifiable.
export const heroMetrics: Metric[] = [
  { value: '5', label: 'Merged upstream PRs', href: '#open-source' },
  { value: '~$15K', label: 'Live trading profit', href: '#experience' },
  { value: '5', label: 'Pre-registered verdicts', href: '#work' },
]

export type Exhibit = {
  fig: string
  kicker: string
  title: string
  blurb: string
  tags: string[]
  stats?: Stat[]
  slug: string
}

export const exhibits: Exhibit[] = [
  {
    fig: 'Fig. 02',
    kicker: 'Quant research',
    title: 'Options Pricing Engine',
    blurb:
      'Three independent option pricers (Black-Scholes closed form, a CRR binomial tree with American exercise, and a seeded Monte Carlo simulation) cross-validated through seven machine-checked numerical gates, all passing to sub-basis-point precision. Pointed at a real SPY option chain, the engine inverts market prices back to volatility and recovers the smile that flat-vol Black-Scholes says is impossible. The GitHub Pages explorer re-verifies all seven gates on every load.',
    tags: ['Python', 'Black-Scholes', 'Monte Carlo', 'CRR Binomial'],
    stats: [
      { value: '7/7', label: 'Validation gates pass' },
      { value: '2.84e-14', label: 'Parity precision' },
      { value: '13.6-15.9%', label: 'ATM IV smile range' },
    ],
    slug: 'options-pricing-engine',
  },
  {
    fig: 'Exhibit 03',
    kicker: 'ML forecasting · self-scoring · paused',
    title: 'Dublin Bikes Forecast',
    blurb:
      'Twice-daily bike and dock availability forecasts for all ~115 Dublin Bikes stations, each committed to a git ledger before its target time exists, so the track record cannot be edited or restarted. Scored in public against pre-registered climatology and persistence baselines under a 28-day verdict gate: pass, or the site says NOT PROVEN. Offline validation cleared all eight confidence intervals first. Collection has been paused since 23 July 2026 (the cloud host suspended the VM); the ledger shows the gap rather than hiding it.',
    tags: ['Python', 'scikit-learn', 'GitHub Actions', 'Oracle Cloud', 'GBFS'],
    stats: [
      { value: '671K', label: 'Training rows' },
      { value: '8/8', label: 'Offline CIs positive' },
      { value: 'Paused', label: 'Since 23 Jul 2026' },
    ],
    slug: 'dublin-bikes-forecast',
  },
  {
    fig: 'Exhibit 04',
    kicker: 'Quant research · applied ML',
    title: 'Alpha Signal Lab',
    blurb:
      'Does a gradient-boosted model beat plain momentum on 5-day cross-sectional equity returns? Twelve point-in-time features, purged walk-forward cross-validation, and eight automated leakage-audit tests run against the real pipeline, not mocks. A deliberately leaky twin shows what overclaiming looks like: honest rank IC 0.0100 versus 0.1506 from one mistake, shuffling instead of purging. The honest model does not beat momentum, and a SHAP diagnostic explains why.',
    tags: ['Python', 'LightGBM', 'SHAP', 'pandas', 'scikit-learn'],
    stats: [
      { value: '0.0100 / 0.1506', label: 'Honest vs leaky rank IC' },
      { value: '8/8', label: 'Leakage audits pass' },
      { value: '117', label: 'Tests (CI)' },
    ],
    slug: 'alpha-signal-lab',
  },
  {
    fig: 'Exhibit 05',
    kicker: 'Quant research · capstone',
    title: 'Quant Strategy Research Program',
    blurb:
      'Six pre-registered phases to settle whether the final-year strategy’s +$28.4K backtest edge (Fig. 01) was real: a no-lookahead bar-by-bar engine, leak-free walk-forward optimisation, Monte Carlo bootstraps, and cluster-bootstrap confidence intervals, with the verdict table hash-frozen before each run. The edge did not survive 10 years and three futures markets. The same gates caught a 60-minute timestamp bug in the source dataset along the way.',
    tags: ['Python', 'pandas', 'pytest', 'Statistics', 'GitHub Actions'],
    stats: [
      { value: '176', label: 'Tests (CI)' },
      { value: '1,402', label: 'OOS trades' },
      { value: '10 yrs', label: '× 3 markets' },
    ],
    slug: 'fyp-strategy-engine',
  },
  {
    fig: 'Exhibit 06',
    kicker: 'AI research, pre-registered',
    title: 'Prompt Placebo',
    blurb:
      'A pre-registered, paired-delta audit of six popular prompting techniques (role prompts, chain-of-thought, emotional stakes, tips, politeness, few-shot) across 1,438 questions and 23,008 API requests, with method, thresholds, and correction rule hash-frozen before the run. 0 of 39 comparisons earned a still_works verdict. The only two effects to survive Holm-Bonferroni correction are harms: politeness and few-shot both cut procedural-task accuracy on claude-sonnet-5 with reasoning disabled.',
    tags: ['Python', 'Anthropic API', 'Bootstrap CIs', 'Holm-Bonferroni'],
    stats: [
      { value: '0/39', label: 'Comparisons that "still work"' },
      { value: '-3.79pp', label: 'Few-shot accuracy drop, p=0.0004' },
      { value: '23,008', label: 'API requests, $20.01 spend' },
    ],
    slug: 'prompt-placebo',
  },
  {
    fig: 'Exhibit 07',
    kicker: 'Systems programming',
    title: 'jobq: Durable Job Queue (Go)',
    blurb:
      'A durable job queue written from scratch in Go, standard library only: at-least-once delivery, actor-per-topic concurrency, leases with lazy expiry, and a CRC-checked, group-committed write-ahead log that cuts per-operation cost from 550µs to 65µs under sixteen producers. A crash harness kills the process cold, mid-write, across five rounds: zero acknowledged jobs lost, zero resurrected. Conservation and unique-settlement invariants hold under the race detector across thousands of randomized interleavings.',
    tags: ['Go', 'Write-Ahead Log', 'Property-Based Testing'],
    stats: [
      { value: '65µs', label: 'Per-op under 16 producers' },
      { value: '5/5', label: 'Crash rounds survived' },
      { value: '0', label: 'Jobs lost or resurrected' },
    ],
    slug: 'jobq',
  },
  {
    fig: 'Exhibit 08',
    kicker: 'Data engineering, dbt',
    title: 'Irish Property Price Index',
    blurb:
      'A mix-adjusted stratified price index over all 797,774 sales in the Irish Property Price Register, built in dbt and DuckDB and validated against the CSO’s official index rather than assumed correct. Finding: the raw median overstates national price growth by 2.22 index points but understates Dublin’s by 3.91, and in 31 of 187 months the two series disagree on direction entirely. Simpson’s paradox, live in real housing data.',
    tags: ['Python', 'dbt', 'DuckDB', 'SQL'],
    stats: [
      { value: '797,774', label: 'Real PPR sales' },
      { value: '+2.22 / -3.91', label: 'National vs Dublin index gap' },
      { value: '31/187', label: 'Months disagreeing on direction' },
    ],
    slug: 'irish-property-price-index',
  },
  {
    fig: 'Exhibit 09',
    kicker: 'Data engineering, entity resolution',
    title: 'registry-resolve',
    blurb:
      'Entity resolution across three real Irish open-data registers (CRO company records, the Register of Charities, public procurement awards): deterministic ID joins where an identifier exists, Splink probabilistic matching where it does not. Evaluated against 330 blind human-labelled pairs with planted self-consistency probes; a first-pass Cohen’s kappa of 0.608 was rejected against a stricter bar and re-measured to a genuine 1.000. Best-match-per-record resolution, after measuring that naive clustering would merge distinct real companies.',
    tags: ['Python', 'DuckDB', 'Splink', 'pandas'],
    stats: [
      { value: '898,481', label: 'Rows in entity spine' },
      { value: '1.000', label: 'Cohen’s kappa, self-consistency' },
      { value: '88.4% / 54.2%', label: 'Precision / recall at threshold' },
    ],
    slug: 'registry-resolve',
  },
  {
    fig: 'Exhibit 10',
    kicker: 'Full-stack SaaS',
    title: 'Personal Performance OS',
    blurb:
      'A production training, food, habits, and tasks app shipped solo across 145 merged pull requests: Supabase Postgres with Row-Level Security on all 33 tables (28 migrations), Groq (Llama 3.3 70B) coaching hardened against prompt injection, and 790+ automated tests behind CI/CD. The codebase is private; the app is live and linked, and I can walk through the code on request.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Groq AI'],
    stats: [
      { value: '33', label: 'RLS tables' },
      { value: '790+', label: 'Tests' },
      { value: '145', label: 'Merged PRs' },
    ],
    slug: 'personal-performance-os',
  },
]

export type AlsoShipped = {
  title: string
  blurb: string
  slug: string
  github?: string
  live?: string
}

export const alsoShipped: AlsoShipped[] = [
  {
    title: 'Ghost Bus Tracker',
    blurb:
      'A 24/7 pipeline that polls Dublin\'s GTFS-Realtime feed and classifies every scheduled Dublin Bus / Go-Ahead trip into one of six honest outcomes, grading its own uptime in public alongside the routes it measures. A feed-health gate caught a real NTA data outage on its first live day and withdrew that day\'s verdicts rather than publish false accusations. Paused since July 2026 on the same suspended VM as the bikes forecast, with the 14-day baseline frozen at day 4 and the gap shown on the site.',
    slug: 'ghost-bus-tracker',
    github: 'https://github.com/aleks-drozy/ghost-bus',
    live: 'https://aleks-drozy.github.io/ghost-bus/',
  },
  {
    title: 'Job-Hunt Analytics',
    blurb:
      'A month of one graduate’s real job search and AI-assistant operations, parsed from messy markdown trackers into a queryable DuckDB database and published as an anonymised static dashboard. A privacy gate enforced in CI was adversarially attacked and closed on 7 real leak paths before anything went public, behind a 164-test suite. Nine SQL analyses over 50 tracked applications and 65 logged assistant operations, deliberately framed as descriptive rather than inferential at that sample size, every rate published beside its raw numerator and denominator.',
    slug: 'job-hunt-analytics',
    github: 'https://github.com/aleks-drozy/job-hunt-analytics',
    live: 'https://aleks-drozy.github.io/job-hunt-analytics/',
  },
  {
    title: 'Football Career Trajectory Model',
    blurb:
      'Pre-registered Monte Carlo projection of young footballers’ careers on 24,057 FBref player-seasons, cross-checked on unseen 2025–26 data at six horizons. Verdict: NOT PROVEN, skilled but under-confident.',
    slug: 'football-trajectory',
    github: 'https://github.com/aleks-drozy/football-trajectory',
    live: 'https://aleks-drozy.github.io/football-trajectory/',
  },
  {
    title: 'JARVIS – voice-controlled AI assistant',
    blurb:
      'A personal AI butler that runs my mornings – now open source. A voice-controlled Iron-Man-style HUD (Electron, 100% local speech-to-text via whisper.cpp) sits on top of a scheduled, fully unattended agent pipeline that delivers a grounded morning brief to Telegram at 08:30, with two-way remote commands, DPAPI-encrypted credentials, and fail-closed safety rules. Elite interview stories – including a shipped-and-fixed command-injection bug – but no 2-minute demo: it is local, personal, and scheduled.',
    slug: 'jarvis',
    github: 'https://github.com/aleks-drozy/jarvis',
  },
  {
    title: 'Maken – AI weight-cut SaaS',
    blurb:
      'A weight-cut platform for judo and BJJ athletes, built by a 16-year black belt for his own sport. Live with alpha users: streaming AI estimates, Upstash Redis rate limiting, Resend email automation, an installable offline PWA, full technical SEO, and GDPR-compliant export and deletion.',
    slug: 'maken',
    live: 'https://maken-coach.vercel.app',
  },
  {
    title: 'Polymarket Favourite Bias',
    blurb:
      'Pre-registered backtest over 2,418 resolved Polymarket markets: favourites win 90.6% of the time and still lose ~1% after fees. Verdict: NOT PROVEN.',
    slug: 'polymarket-favourite-bias',
    github: 'https://github.com/aleks-drozy/polymarket-favourite-bias',
  },
  {
    title: 'NASDAQ-100 FYP Strategy',
    blurb:
      'Final-year Pine Script v6 strategy for NQ1! E-mini futures using Inverse Fair Value Gaps, Change in State of Delivery, and a liquidity-sweep filter, with fixed risk rules and honestly documented out-of-sample caveats. Its own sequel, the Quant Strategy Research Program, put this edge on trial – and disproved it.',
    slug: 'fyp-trading-strategy',
    github: 'https://github.com/aleks-drozy/fyp-trading-strategy',
  },
  {
    title: 'Monte Carlo Robustness Study',
    blurb:
      'Monte Carlo stress-test of a real 72-trade NQ futures record – bootstrap resampling, order reshuffling, and drawdown-risk distributions, with an honest writeup of what survives.',
    slug: 'monte-carlo-robustness',
    github: 'https://github.com/aleks-drozy/Trading-Strategy-Monte-Carlo-Simulation',
  },
  {
    title: 'Trading Analytics Dashboard',
    blurb:
      '230+ commit full-stack trade journal and market-research app – Next.js dashboard, authenticated trade logging, analytics pages, a Python/FastAPI back end, tests, schemas, and Vercel deployment.',
    slug: 'trading-dashboard',
    github: 'https://github.com/aleks-drozy/Trading_Dashboard',
    live: 'https://tradingdashboard-one.vercel.app',
  },
  {
    title: 'Vectorised Backtesting Engine',
    blurb:
      'Python engine with a strategy registry, slippage/commission model, and walk-forward split. Benchmarks SMA Crossover and RSI Mean Reversion against the FYP strategy; GitHub Actions auto-updates results.',
    slug: 'backtest-engine',
    github: 'https://github.com/aleks-drozy/aleksander-backtest-engine',
  },
]

export type OssContribution = {
  repo: string
  org: string
  prNumber: string
  prUrl: string
  merged: string
  summary: string
}

export const ossIntro =
  'Everything above is solo work. These fixes shipped into other teams’ codebases: reviewed by their maintainers, held to their test suites, merged on their terms. Each link is the pull request itself.'

export const ossContributions: OssContribution[] = [
  {
    repo: 'hflow',
    org: 'Hebbian Robotics',
    prNumber: '#288',
    prUrl: 'https://github.com/Hebbian-Robotics/hflow/pull/288',
    merged: 'Aug 2026',
    summary:
      'A robotics data-quality SDK filed transform content refusals under its catch-all infrastructure bucket, so operators retried batches that could never succeed. Added a dedicated exception and failure kind so refusals classify as source-unsupported, with docs rewritten to match.',
  },
  {
    repo: 'narwhals',
    org: 'narwhals-dev',
    prNumber: '#3856',
    prUrl: 'https://github.com/narwhals-dev/narwhals/pull/3856',
    merged: 'Aug 2026',
    summary:
      'The pandas-like backend ignored the schema argument’s column selection and order in from_dicts. Fixed with a reindex before dtype casting; six new test cases covering reordered, extra, and missing keys, each proven failing before the fix.',
  },
  {
    repo: 'exchange_calendars',
    org: 'gerrymanoim',
    prNumber: '#593',
    prUrl: 'https://github.com/gerrymanoim/exchange_calendars/pull/593',
    merged: 'Aug 2026',
    summary:
      'Built the Dubai Financial Market (XDFM) trading calendar from scratch: 1,483 lines, holidays sourced from DFM and Nasdaq Dubai circulars with inline citations, and the calendar bounded at the exact 2022 date the UAE switched to a Monday-Friday work week, sidestepping a known upstream bug by design.',
  },
  {
    repo: 'holidays',
    org: 'vacanza',
    prNumber: '#3748',
    prUrl: 'https://github.com/vacanza/holidays/pull/3748',
    merged: 'Aug 2026',
    summary:
      'Added Russian localization for Latvia’s holiday calendar, a real gap for roughly a quarter of the country’s population. Native-speaker translation, not machine output.',
  },
  {
    repo: 'yfinance',
    org: 'ranaroussi',
    prNumber: '#2936',
    prUrl: 'https://github.com/ranaroussi/yfinance/pull/2936',
    merged: 'Aug 2026',
    summary:
      'Investigated a suspected intraday timezone regression, found it was an intentional, changelogged change rather than a bug, and fixed the real gap instead: download()’s docstring never stated the index timezone contract at all.',
  },
]

export const ossUnderReview =
  'Nine more fixes are open under maintainer review across scipy, splink, uvicorn, duckdb-python, quantstats, and soccerdata.'

export type ExperienceEntry = {
  when: string
  location: string
  role: string
  org: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    when: 'Feb 2025 – Jul 2025',
    location: 'Maynooth',
    role: 'Quantitative Researcher & Software Engineer (Part-Time)',
    org: 'DLT Capital',
    bullets: [
      'Built and tested automated Bitcoin and futures trading bots in PineScript on TradingView, encoding systematic entry, exit, position sizing, and risk-management logic.',
      'Developed fully rules-based crypto and futures strategies, validated with statistical filters and strict risk controls.',
      'Generated approximately $15,000 in live trading profit through disciplined, systematic execution.',
    ],
  },
  {
    when: 'Jul 2023 – Apr 2025',
    location: 'Dublin',
    role: 'Sales Assistant (Part-Time) · Volunteer First Aider',
    org: 'Circle K · Resus First Aid Ireland',
    bullets: [
      'Ran high-volume POS and cash handling under time pressure, holding accuracy and service standards through peak periods.',
      'Volunteer first aider: assess and respond to medical emergencies calmly, documenting incidents to health-and-safety protocol.',
    ],
  },
]

export type Education = {
  when: string
  location: string
  degree: string
  honours: string
  org: string
  coursework: string[]
  certifications: string[]
}

export const education: Education = {
  when: 'Sept 2022 – Sept 2026',
  location: 'Maynooth, Ireland',
  degree: 'B.Sc. (Hons) Computer Science & Software Engineering',
  honours: '2:1 Honours',
  org: 'Maynooth University',
  coursework: [
    'Machine Learning & Neural Networks',
    'AI & Language Processing',
    'Parallel & Distributed Systems',
    'Algorithms & Data Structures',
    'Software Testing & Verification',
    'Databases',
  ],
  certifications: ['Claude Code 101 – Anthropic, 2026', 'Claude Platform 101 – Anthropic, 2026'],
}

export type SkillGroup = { name: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Java', 'C++', 'SQL', 'PowerShell', 'PineScript', 'HTML & CSS'] },
  { name: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'pandas', 'NumPy', 'Tailwind CSS', 'Framer Motion'] },
  { name: 'AI & ML', items: ['LLM integration (Anthropic, Groq)', 'AI agents & tool-use (MCP, Claude Code)', 'Prompt engineering', 'Applied ML & meta-labelling'] },
  { name: 'Testing & Tools', items: ['Vitest', 'Playwright', 'pytest', 'Git & GitHub Actions', 'Supabase', 'PostgreSQL', 'MongoDB', 'Vercel', 'Jupyter', 'Postman', 'TradingView'] },
]

export type CharacterPanel = { title: string; copy: string }

export const character: CharacterPanel[] = [
  {
    title: 'Judo: 16 years, black belt',
    copy:
      'Multiple All-Ireland medals, and I have represented Ireland at international level. These days I give back as much as I compete: I coach kids at my club and train and coach alongside Irish judo pathway members. Competing taught me to stay composed when things get ugly and to lose without excuses; coaching taught me to break hard things down until they are teachable. It also pointed me at a real problem to solve: I built Maken, an AI weight-cut SaaS, for athletes like me.',
  },
  {
    title: 'Algorithmic trading',
    copy:
      'Funded-account holder with verified real payouts, focused on NASDAQ-100 E-mini futures during NY morning sessions. I write strategies, test assumptions, and execute with predefined risk. It is a useful pressure test for engineering judgment: vague thinking gets punished quickly, and the only thing that survives is a system you can actually trust.',
  },
  {
    title: 'AI-assisted, human-directed',
    copy:
      'I use Claude Code the way I would use a fast pairing partner: it accelerates implementation and red-teams my decisions when I ask it to, and the commit history on these repos says so openly. Every statistical method, every architecture call, and every decision about what to hedge or cut is mine, and I can walk through the reasoning on any commit. Verification is the part I never delegate: tests, CI, and driving the thing in a real browser before calling it done.',
  },
]
