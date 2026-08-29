export type Metric = { value: string; label: string }
export type Stat = { value: string; label: string }

export const site = {
  name: 'Aleksandrs Drozdovs',
  initials: 'AD',
  role: 'Software Engineer',
  headline: 'Software engineer',
  headlineAccent: 'with quant instincts.',
  status: 'Open to 2026 roles',
  location: 'Dublin, Ireland',
  lede:
    'Computer Science & Software Engineering graduate (Maynooth, 2026). I ship production systems end-to-end – two live SaaS apps, an agentic AI assistant, a live self-scoring ML forecasting service, and a six-phase pre-registered quant research program. Tested, documented, and honest about the results.',
  email: 'aleksandrs.drozdovs2005@gmail.com',
  cvUrl: '/cv.pdf',
  github: 'https://github.com/aleks-drozy',
  linkedin: 'https://www.linkedin.com/in/aleksandrsdrozdovs/',
}

export const heroMetrics: Metric[] = [
  { value: '790+', label: 'Automated tests' },
  { value: '2', label: 'Live SaaS shipped' },
  { value: '~$15K', label: 'Live trading profit' },
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
      'Three independent option pricers, Black-Scholes closed form, a CRR binomial tree with American exercise, and a seeded Monte Carlo simulation, cross-validated against each other through seven machine-checked numerical gates, all passing to sub-basis-point precision. Then the engine turns on a real SPY option chain and inverts the market\'s own prices back to volatility: the market quotes a different sigma at every strike, the smile that flat-vol Black-Scholes says is impossible. A live interactive Three.js surface and GitHub Pages explorer re-verifies all seven gates on every load.',
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
    kicker: 'Live ML · self-scoring',
    title: 'Dublin Bikes Forecast',
    blurb:
      'A live forecasting service that predicts bike and dock availability across all ~115 Dublin Bikes stations at the 08:30 and 17:30 commute windows – and grades itself in public. Every forecast is committed to a git ledger before its target time exists, so the track record cannot be edited or restarted. A pre-registered 28-day gate decides the verdict on the public scoreboard: beat both climatology and persistence baselines with day-clustered bootstrap CIs, or the site says NOT PROVEN. Offline validation cleared all eight confidence intervals before deployment; when the first night’s infrastructure failed, the ledger recorded its own outage as unscoreable – the accounting is the product.',
    tags: ['Python', 'scikit-learn', 'GitHub Actions', 'Oracle Cloud', 'GBFS'],
    stats: [
      { value: '671K', label: 'Training rows' },
      { value: '2×/day', label: 'Live forecasts' },
      { value: '28 days', label: 'Public verdict gate' },
    ],
    slug: 'dublin-bikes-forecast',
  },
  {
    fig: 'Exhibit 04',
    kicker: 'Quant research · applied ML',
    title: 'Alpha Signal Lab',
    blurb:
      'A pre-registered, leakage-audited test of whether a gradient-boosted model beats plain momentum on 5-day cross-sectional equity returns across a 30-name large-cap universe. Twelve point-in-time features, purged walk-forward cross-validation (5-day purge, ~1% embargo), and eight automated leakage-audit tests that all pass against the real pipeline, not mocks. A deliberately leaky control run alongside the honest one shows exactly what overclaiming looks like: honest rank IC 0.0100 versus leaky IC 0.1506, a fifteen-fold inflation from one mistake, shuffling instead of purging. The honest model does not beat momentum, and a follow-up SHAP diagnostic explains precisely why: which feature dominates every fold, and where the model’s picks diverge from momentum’s.',
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
      'A six-phase, pre-registered research program that settled whether a final-year FYP strategy’s +$28.4K backtest edge was real. Bar-by-bar backtest engine with no lookahead, leak-free walk-forward optimisation, Monte Carlo bootstrap studies, an ML trade-filter experiment, and cluster-bootstrap confidence intervals – verdict decided by a git-timestamped frozen decision table the runner hash-verifies before it will run. Answer: the edge did not survive 10 years and three futures markets, and the gates forensically caught a 60-minute timestamp bug in the source dataset along the way.',
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
      'A pre-registered, paired-delta audit of six popular prompting techniques (role prompts, chain-of-thought, emotional stakes, tips, politeness, few-shot) against an identical baseline, run across 1,438 questions and 23,008 API requests for $20.01. Method, thresholds, and correction rule were hash-frozen before the full run. Result: 0 of 39 technique-model-task comparisons earned a still_works verdict; 20 were placebo, 17 inconclusive. The only two statistically significant effects, both surviving Holm-Bonferroni correction, are harms: on claude-sonnet-5 with reasoning disabled, politeness cuts procedural-task accuracy by 2.84 points and few-shot examples cut it by 3.79 points.',
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
    title: 'jobq — Durable Job Queue (Go)',
    blurb:
      'A durable, single-node job queue written from scratch in Go using only the standard library: at-least-once delivery, actor-per-topic concurrency, leases with lazy expiry, and a CRC-checked, group-committed write-ahead log. Sixteen producers hand records to a single committer and share one fsync instead of paying for sixteen, cutting per-operation cost from 550µs sequential to 65µs under load. A crash harness kills the process cold, mid-write, at a random moment across five rounds: zero acknowledged jobs lost, zero resurrected. Two invariants, conservation and unique settlement, hold under the race detector across thousands of randomized interleavings.',
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
      'A mix-adjusted stratified price index built on the full Property Price Register, 797,774 real sales, using dbt and DuckDB, validated directly against the CSO’s own official Residential Property Price Index rather than assumed correct. Nationally, the raw median that gets reported overstates price growth by 2.22 index points on average versus the mix-adjusted measure; in Dublin it does the opposite, understating growth by 3.91 points – opposite signs, from the same method, on the same data. Across 187 months, 31 have the raw and mix-adjusted series disagreeing on direction entirely: the standard Simpson’s-paradox mechanism, live in real housing data.',
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
      'Entity resolution across three real Irish open-data registers – CRO company records, the Register of Charities, and public procurement award data – deterministic ID joins where a real identifier exists, Splink probabilistic matching where it doesn’t. Evaluated against 330 blind human-labelled pairs with planted self-consistency probes: a first-pass Cohen’s kappa of 0.608 was rejected against a stricter self-imposed bar, re-checked, and re-measured to a genuine 1.000. The final 898,481-row entity spine uses best-match-per-record resolution after measuring that naive graph clustering would merge distinct real companies together.',
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
      'A production "operating system" for training, food, habits, and tasks – shipped solo across 145 merged pull requests. Supabase Postgres with Row-Level Security on all 33 tables (28 migrations), Groq (Llama 3.3 70B) coaching hardened against prompt injection, and 790+ automated tests behind CI/CD.',
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
      'A 24/7 pipeline that polls Dublin\'s live GTFS-Realtime feed and classifies every scheduled Dublin Bus / Go-Ahead trip into one of six honest outcomes, grading its own uptime in public alongside the routes it measures. A self-designed feed-health gate caught a real NTA data outage on its first live day and withdrew that day\'s verdicts rather than publish false accusations.',
    slug: 'ghost-bus-tracker',
    github: 'https://github.com/aleks-drozy/ghost-bus',
    live: 'https://aleks-drozy.github.io/ghost-bus/',
  },
  {
    title: 'Job-Hunt Analytics',
    blurb:
      'A month of one graduate’s real job search and AI-assistant operations, parsed from messy markdown trackers into a queryable DuckDB database and published as an anonymised static dashboard. A privacy gate enforced in CI was adversarially attacked and closed on 7 real leak paths before anything went public, behind a 164-test suite. Nine SQL analyses over 50 tracked applications and 65 logged assistant operations, deliberately framed as descriptive rather than inferential at that sample size – every rate published beside its raw numerator and denominator, including the headline: 0 interviews from 50 applications.',
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
    title: 'Speed-to-Lead AI Agent',
    blurb:
      'AI receptionist that catches, qualifies, and books inbound leads in under 60 seconds – free-text chat, an owner dashboard with an ROI readout, and a one-line rebrand config. Public scripted demo; the production design pairs Claude with Supabase and calendar booking.',
    slug: 'speed-to-lead',
    github: 'https://github.com/aleks-drozy/speed-to-lead-demo',
    live: 'https://aleks-drozy.github.io/speed-to-lead-demo/',
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
    title: 'Judo – 16 years, black belt',
    copy:
      'Multiple Irish national medals, competing from regional to international level. Judo taught me to stay composed when things get ugly, lose without excuses, and improve through relentless repetition – the same temperament I bring to engineering. It also pointed me at a real problem to solve: I built Maken, an AI weight-cut SaaS, for athletes like me.',
  },
  {
    title: 'Algorithmic trading',
    copy:
      'Funded-account holder with verified real payouts, focused on NASDAQ-100 E-mini futures during NY morning sessions. I write strategies, test assumptions, and execute with predefined risk. It is a useful pressure test for engineering judgment: vague thinking gets punished quickly, and the only thing that survives is a system you can actually trust.',
  },
]
