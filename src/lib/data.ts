export type ProjectMetric = { label: string; value: string }

export type Project = {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  metrics?: ProjectMetric[]
  githubUrl?: string
  liveUrl?: string
  codeAvailability?: 'public' | 'on-request'
  featured: boolean
}

export type ProofItem = {
  label: string
  title: string
  description: string
  href: string
  meta: ProjectMetric[]
}

export type SkillCategory = {
  name: string
  skills: { name: string; icon: string }[]
}

export type Social = {
  name: string
  url: string
  icon: 'github' | 'linkedin' | 'instagram'
}

export type BeyondPanel = {
  icon: string
  title: string
  copy: string
}

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  location?: string
  bullets: string[]
}

export type Education = {
  institution: string
  degree: string
  period: string
  location: string
  gpa?: string
  coursework: string[]
}

export const personalInfo = {
  name: 'Aleksandrs Drozdovs',
  shortName: 'Aleksandrs D.',
  headline: 'Software engineer with',
  headlineAccent: 'quant instincts.',
  eyebrow: 'Dublin-based software engineer',
  subline:
    'Computer Science & Software Engineering graduate (Maynooth, 2026). I ship production systems end-to-end: two live SaaS apps with 100+ automated tests, JARVIS — a voice-controlled AI agent that runs my mornings — and systematic trading strategies with ~$15K in live profit.',
  status: 'Open to 2026 roles',
  cvUrl: '/cv.pdf',
  email: 'aleksandrs.drozdovs2005@gmail.com',
  location: 'Dublin, Ireland',
}

export const heroStats: ProjectMetric[] = [
  { label: 'Live apps shipped', value: '2' },
  { label: 'Automated tests', value: '100+' },
  { label: 'Live trading profit', value: '$15K' },
]

export const hireSignals = [
  { label: 'Looking for', value: 'Graduate SWE / AI / Fintech / Data teams' },
  { label: 'Location', value: 'Dublin, Ireland (open to remote EU/UK)' },
  { label: 'Strongest proof', value: 'JARVIS (AI agent), Personal Performance OS, and the NASDAQ-100 FYP strategy' },
  { label: 'Working style', value: 'Tested systems, documented tradeoffs, honest results' },
]

export const proofItems: ProofItem[] = [
  {
    label: 'AI agent · voice',
    title: 'JARVIS',
    description:
      'A voice-controlled AI butler that runs my mornings unattended: reads my git history, sweeps Dublin job boards overnight, coaches my budget, and emails me a briefing at 08:30 before I wake. Speech-to-text runs 100% locally (whisper.cpp), a Claude agent brain operates under hard-coded safety rules, and the Iron-Man-style HUD is Electron. Built in public — demo videos in the repo.',
    href: '/projects/jarvis',
    meta: [
      { label: 'Voice', value: 'Local STT' },
      { label: 'Brain', value: 'Claude agent' },
      { label: 'Runs', value: 'Unattended' },
    ],
  },
  {
    label: 'Full-stack SaaS',
    title: 'Personal Performance OS',
    description:
      'A production "operating system" for training, food, habits, and tasks. Supabase Postgres with Row-Level Security on all 25 tables, Groq (Llama 3.3 70B) AI coaching hardened against prompt injection, and a 100+ test suite (Vitest + Playwright) behind CI/CD.',
    href: '/projects/personal-performance-os',
    meta: [
      { label: 'Postgres tables', value: '25' },
      { label: 'Automated tests', value: '100+' },
      { label: 'AI model', value: 'Llama 3.3' },
    ],
  },
  {
    label: 'Live SaaS · my sport',
    title: 'Maken Weight-Cut SaaS',
    description:
      'An AI weight-cut platform for judo and BJJ athletes, built by a 16-year black belt for his own sport. Weight-class-aware cut protocols, AI training plans, and weekly check-ins. Next.js 16, Supabase, Groq, with email automation and scheduled jobs.',
    href: '/projects/maken',
    meta: [
      { label: 'Status', value: 'Live' },
      { label: 'Built for', value: 'Judo / BJJ' },
      { label: 'AI plans', value: 'Groq' },
    ],
  },
  {
    label: 'Quant research',
    title: 'NASDAQ-100 FYP Strategy',
    description:
      'Pine Script v6 strategy for NQ1! futures using IFVG, CISD, and a liquidity-sweep filter, with fixed risk rules and honestly documented out-of-sample caveats.',
    href: '/projects/fyp-trading-strategy',
    meta: [
      { label: 'Win rate', value: '56.94%' },
      { label: 'Net P&L', value: '$28.4K' },
      { label: 'Profit factor', value: '1.703' },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'personal-performance-os',
    title: 'Personal Performance OS',
    featured: true,
    description:
      'A live full-stack "performance OS" that plans training, food, habits, tasks, and ideas. Supabase auth over a 25-table Postgres schema with RLS on every table (12 migrations), streaming Groq AI coaching with prompt-injection hardening, 94 Vitest + 6/6 Playwright tests, and CI/CD.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Groq AI', 'Vitest', 'Playwright'],
    metrics: [
      { label: 'Postgres tables', value: '25' },
      { label: 'Migrations', value: '12' },
      { label: 'Automated tests', value: '100+' },
    ],
    liveUrl: 'https://personal-performance-os.vercel.app',
    codeAvailability: 'on-request',
  },
  {
    id: 'maken',
    title: 'Maken Weight-Cut SaaS',
    featured: true,
    description:
      'An AI weight-cut SaaS for judo and BJJ athletes: weight-class-aware cut protocols, training plans, and weekly check-ins around a tournament date. Next.js 16, Supabase (auth + RLS), Groq AI, Resend email automation, scheduled cron, and an installable PWA. Live with real alpha users.',
    tags: ['Next.js 16', 'Supabase', 'Groq AI', 'Resend', 'PWA'],
    liveUrl: 'https://fitness-goal-coach.vercel.app',
    codeAvailability: 'on-request',
  },
  {
    id: 'fyp-trading-strategy',
    title: 'Algorithmic Trading Strategy: NASDAQ-100 Futures',
    featured: true,
    description:
      'Final-year quantitative trading project for NQ1! E-mini futures. Encodes IFVG + CISD confirmation, session filters, risk rules, and trade logging into a strategy that can be tested instead of hand-waved.',
    longDescription:
      'Quantitative trading system for NQ1! E-mini futures built around Smart Money Concepts. Targets NY morning sessions with Inverse Fair Value Gap + Change in State of Delivery double confirmation, backtested across 72 trades in a strict 28-minute execution window.',
    tags: ['PineScript v6', 'TradingView', 'Quant Research', 'SMC'],
    metrics: [
      { label: 'Win Rate', value: '56.94%' },
      { label: 'Net P&L', value: '$28.4K' },
      { label: 'Profit Factor', value: '1.703' },
      { label: 'Trades', value: '72' },
    ],
    githubUrl: 'https://github.com/aleks-drozy/fyp-trading-strategy',
    codeAvailability: 'public',
  },
  {
    id: 'trading-dashboard',
    title: 'Trading Analytics Dashboard',
    featured: false,
    description:
      'Full-stack trade journal and financial market app with a Next.js dashboard, authenticated trade logging, analytics pages, tests, schemas, pre-commit hooks, docs, and Vercel deployment.',
    tags: ['TypeScript', 'Next.js', 'Python', 'Vitest', 'Vercel'],
    githubUrl: 'https://github.com/aleks-drozy/Trading_Dashboard',
    liveUrl: 'https://tradingdashboard-one.vercel.app',
    codeAvailability: 'public',
  },
  {
    id: 'backtest-engine',
    title: 'Vectorised Backtesting Engine',
    featured: false,
    description:
      'Vectorised Python backtesting engine with a strategy registry, slippage/commission model, and walk-forward train/test split. Benchmarks SMA Crossover and RSI Mean Reversion against the FYP IFVG+CISD strategy. GitHub Actions auto-updates results on push.',
    tags: ['Python', 'pandas', 'numpy', 'yfinance', 'GitHub Actions'],
    githubUrl: 'https://github.com/aleks-drozy/aleksander-backtest-engine',
    codeAvailability: 'public',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'C++', icon: 'cpp' },
      { name: 'SQL', icon: 'sql' },
      { name: 'PineScript', icon: 'pinescript' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Framer Motion', icon: 'framermotion' },
    ],
  },
  {
    name: 'Data & Backend',
    skills: [
      { name: 'Supabase', icon: 'supabase' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    name: 'Testing & Tooling',
    skills: [
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Playwright', icon: 'playwright' },
      { name: 'pytest', icon: 'pytest' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub Actions', icon: 'actions' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'TradingView', icon: 'tradingview' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'Quantitative Researcher & Software Engineer (Part-Time)',
    company: 'DLT Capital',
    period: 'Feb 2025 - Jul 2025',
    location: 'Maynooth',
    bullets: [
      'Built and tested automated Bitcoin and futures trading bots in PineScript on TradingView, encoding systematic entry, exit, position sizing, and risk-management logic.',
      'Developed fully rules-based crypto and futures strategies, validated with statistical filters and strict risk controls.',
      'Generated approximately $15,000 in live trading profit through disciplined, systematic execution.',
    ],
  },
  {
    role: 'B.Sc. (Hons) Computer Science & Software Engineering',
    company: 'Maynooth University',
    period: 'Sept 2022 - 2026',
    location: 'Maynooth, Ireland',
    bullets: [
      'Shipped two live full-stack SaaS products (Personal Performance OS, Maken) on Next.js, TypeScript, and Supabase, backed by 100+ automated tests, CI/CD, and Row-Level Security on every table.',
      'Final-year project: designed, implemented, and evaluated an automated PineScript v6 strategy for NASDAQ-100 E-mini futures, with documented out-of-sample analysis.',
    ],
  },
  {
    role: 'Customer Operations & First Aid (Part-Time)',
    company: 'Circle K · Resus First Aid Ireland',
    period: '2022 - Present',
    location: 'Dublin',
    bullets: [
      'Ran high-volume POS and cash handling under time pressure across a two-year tenure, holding accuracy and service standards through peak periods.',
      'Assess and respond to medical emergencies as a volunteer first aider, applying first aid calmly and documenting incidents to health-and-safety protocol.',
    ],
  },
]

export const education: Education = {
  institution: 'Maynooth University',
  degree: 'B.Sc. (Hons) Computer Science & Software Engineering',
  period: '2022 - 2026',
  location: 'Maynooth, Ireland',
  coursework: [
    'Algorithms & Data Structures',
    'Software Testing',
    'Databases',
    'Web Information Processing',
    'Computer Systems',
    'UX/UI Design',
    'Final-Year Project: Algorithmic Trading',
  ],
}

export const socials: Social[] = [
  { name: 'GitHub', url: 'https://github.com/aleks-drozy', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aleksandrsdrozdovs/', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://www.instagram.com/alex_drozy/', icon: 'instagram' },
]

export const beyondPanels: BeyondPanel[] = [
  {
    icon: 'judo',
    title: 'Judo',
    copy:
      'Sixteen years on the mat, black belt, multiple Irish national medals, competing from regional to international level. Judo taught me to stay composed when things get ugly, lose without excuses, and improve through relentless repetition, the same temperament I bring to engineering. It also pointed me at a real problem to solve: I built Maken, an AI weight-cut SaaS, for judo and BJJ athletes like me.',
  },
  {
    icon: 'chart',
    title: 'Algorithmic Trading',
    copy:
      'Funded account holder with verified real payouts, focused on NASDAQ-100 E-mini futures during NY morning sessions. I write strategies, test assumptions, and execute with predefined risk. It is a useful pressure test for engineering judgment, because vague thinking gets punished quickly and the only thing that survives is a system you can actually trust.',
  },
]
