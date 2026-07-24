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
  phone: '089 257 1418',
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
    fig: 'Fig. 03',
    kicker: 'AI agent',
    title: 'JARVIS – voice-controlled AI assistant',
    blurb:
      'A personal AI butler that runs my mornings – now open source. A voice-controlled Iron-Man-style HUD (Electron, with 100% local speech-to-text via whisper.cpp) sits on top of a scheduled, fully unattended agent pipeline: it aggregates my git history, notes, job alerts, and a real bank feed into a grounded morning brief and delivers it to my phone over Telegram at 08:30. Two-way remote commands, headless Claude-agent execution with DPAPI-encrypted credentials, hard safety rules (no financial actions, self-only sends that fail closed), and failure alarms.',
    tags: ['Claude agent', 'Electron', 'whisper.cpp', 'PowerShell', 'Telegram Bot API'],
    slug: 'jarvis',
  },
  {
    fig: 'Fig. 04',
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
  {
    fig: 'Fig. 05',
    kicker: 'Live SaaS · my sport',
    title: 'Maken – AI weight-cut SaaS',
    blurb:
      'A weight-cut platform for judo and BJJ athletes, built by a 16-year black belt for his own sport. Live with alpha users: streaming AI estimates, Upstash Redis rate limiting, Resend email automation, an installable offline PWA, full technical SEO, and GDPR-compliant export and deletion.',
    tags: ['Next.js 16', 'Supabase', 'Groq AI', 'PWA'],
    slug: 'maken',
  },
  {
    fig: 'Fig. 06',
    kicker: 'Quant research',
    title: 'NASDAQ-100 FYP Strategy',
    blurb:
      'Final-year Pine Script v6 strategy for NQ1! E-mini futures using Inverse Fair Value Gaps, Change in State of Delivery, and a liquidity-sweep filter, with fixed risk rules and honestly documented out-of-sample caveats. The sequel (Fig. 07) put this edge on trial – and disproved it.',
    tags: ['Pine Script v6', 'TradingView', 'Walk-forward'],
    stats: [
      { value: '56.94%', label: 'In-sample win rate' },
      { value: '+$28.4K', label: 'In-sample P&L' },
      { value: '1.703', label: 'In-sample profit factor' },
    ],
    slug: 'fyp-trading-strategy',
  },
  {
    fig: 'Fig. 07',
    kicker: 'Quant research · capstone',
    title: 'Quant Strategy Research Program',
    blurb:
      'A six-phase, pre-registered research program that settled whether the FYP strategy’s +$28.4K backtest edge was real. Bar-by-bar backtest engine with no lookahead, leak-free walk-forward optimisation, Monte Carlo bootstrap studies, an ML trade-filter experiment, and cluster-bootstrap confidence intervals – verdict decided by a git-timestamped frozen decision table the runner hash-verifies before it will run. Answer: the edge did not survive 10 years and three futures markets, and the gates forensically caught a 60-minute timestamp bug in the source dataset along the way.',
    tags: ['Python', 'pandas', 'pytest', 'Statistics', 'GitHub Actions'],
    stats: [
      { value: '176', label: 'Tests (CI)' },
      { value: '1,402', label: 'OOS trades' },
      { value: '10 yrs', label: '× 3 markets' },
    ],
    slug: 'fyp-strategy-engine',
  },
  {
    fig: 'Fig. 08',
    kicker: 'Quant research',
    title: 'Options Pricing Engine',
    blurb:
      'Three independent option pricers, Black-Scholes closed form, a CRR binomial tree with American exercise, and a seeded Monte Carlo simulation, cross-validated against each other through seven machine-checked numerical gates, all passing to sub-basis-point precision. Then the engine turns on a real SPY option chain and inverts the market\'s own prices back to volatility: the market quotes a different sigma at every strike, the smile that flat-vol Black-Scholes says is impossible. A live GitHub Pages explorer re-verifies all seven gates on every load.',
    tags: ['Python', 'Black-Scholes', 'Monte Carlo', 'CRR Binomial'],
    stats: [
      { value: '7/7', label: 'Validation gates pass' },
      { value: '2.84e-14', label: 'Parity precision' },
      { value: '13.6-15.9%', label: 'ATM IV smile range' },
    ],
    slug: 'options-pricing-engine',
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
  {
    title: 'NoteIt',
    blurb:
      'Full-stack note-taking app with authentication, CRUD notes, private sharing, and role-based publishing.',
    slug: 'noteit',
    github: 'https://github.com/aleks-drozy/noteit',
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
    title: 'Polymarket Favourite Bias',
    blurb:
      'Pre-registered backtest over 2,418 resolved Polymarket markets: favourites win 90.6% of the time and still lose ~1% after fees. Verdict: NOT PROVEN.',
    slug: 'polymarket-favourite-bias',
    github: 'https://github.com/aleks-drozy/polymarket-favourite-bias',
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
    title: 'jobq, Durable Job Queue',
    blurb:
      'Durable job queue built from scratch in Go, standard library only: at-least-once delivery, actor-per-topic concurrency, a CRC-checked group-committed write-ahead log. A crash harness kills the process cold mid-write across 5 rounds: zero jobs lost, zero acknowledged jobs resurrected.',
    slug: 'jobq',
    github: 'https://github.com/aleks-drozy/jobq',
  },
  {
    title: 'Ghost Bus Tracker',
    blurb:
      'A 24/7 pipeline that polls Dublin\'s live GTFS-Realtime feed and classifies every scheduled Dublin Bus / Go-Ahead trip into one of six honest outcomes, grading its own uptime in public alongside the routes it measures. A self-designed feed-health gate caught a real NTA data outage on its first live day and withdrew that day\'s verdicts rather than publish false accusations.',
    slug: 'ghost-bus-tracker',
    github: 'https://github.com/aleks-drozy/ghost-bus',
    live: 'https://aleks-drozy.github.io/ghost-bus/',
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
