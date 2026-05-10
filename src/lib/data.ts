export type ProjectMetric = { label: string; value: string }

export type Project = {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  metrics?: ProjectMetric[]
  githubUrl: string
  liveUrl?: string
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
  gpa: string
  coursework: string[]
}

export const personalInfo = {
  name: 'Aleksandrs Drozdovs',
  shortName: 'Aleksandrs D.',
  headline: 'Software engineer with',
  headlineAccent: 'quant instincts.',
  eyebrow: 'Dublin-based software engineer',
  subline:
    'Final-year Computer Science & Software Engineering student at Maynooth. I build full-stack products, Python data tools, and trading systems with the discipline of someone who has to trust the output.',
  status: 'Open to 2026 roles',
  cvUrl: '/cv.pdf',
  email: 'aleksandrs.drozdovs2005@gmail.com',
  location: 'Dublin, Ireland',
}

export const heroStats: ProjectMetric[] = [
  { label: 'Dashboard Commits', value: '228' },
  { label: 'Trading Profit', value: '$15K' },
  { label: 'FYP Win Rate', value: '56.94%' },
]

export const hireSignals = [
  { label: 'Looking for', value: 'Graduate SWE / Fintech / Data teams' },
  { label: 'Location', value: 'Dublin, Ireland' },
  { label: 'Strongest proof', value: 'Full-stack trading dashboard, Python backtester, FYP strategy' },
  { label: 'Working style', value: 'Tested systems, documented tradeoffs, honest results' },
]

export const proofItems: ProofItem[] = [
  {
    label: 'Full-stack shipping',
    title: 'Trading Analytics Dashboard',
    description:
      'A production-style market research dashboard with a Next.js + TypeScript frontend, Python analytics workflow, tests, schemas, pre-commit tooling, and Vercel deployment.',
    href: '/projects/trading-dashboard',
    meta: [
      { label: 'GitHub commits', value: '228' },
      { label: 'Stack', value: 'TS + Python' },
      { label: 'Deploy', value: 'Vercel' },
    ],
  },
  {
    label: 'Python infrastructure',
    title: 'Vectorised Backtesting Engine',
    description:
      'Reusable Python engine for strategy experiments with walk-forward analysis, pytest coverage, structured results, and a GitHub Actions pipeline.',
    href: '/projects/backtest-engine',
    meta: [
      { label: 'Language', value: 'Python' },
      { label: 'Strategies', value: '9' },
      { label: 'Validation', value: 'CI' },
    ],
  },
  {
    label: 'Quant research',
    title: 'NASDAQ-100 FYP Strategy',
    description:
      'Pine Script v6 strategy for NQ1! futures using IFVG, CISD, liquidity sweep filters, fixed risk rules, and documented out-of-sample caveats.',
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
  },
  {
    id: 'backtest-engine',
    title: 'Vectorised Backtesting Engine',
    featured: false,
    description:
      'Vectorised Python backtesting engine with a strategy registry, slippage/commission model, and walk-forward train/test split. Benchmarks SMA Crossover and RSI Mean Reversion against the FYP IFVG+CISD strategy. GitHub Actions auto-updates results on push.',
    tags: ['Python', 'pandas', 'numpy', 'yfinance', 'GitHub Actions'],
    githubUrl: 'https://github.com/aleks-drozy/aleksander-backtest-engine',
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
  },
  {
    id: 'noteit',
    title: 'NoteIt',
    featured: false,
    description:
      'Full-stack note-taking app with role-based authentication, CRUD notes, sharing, and publishing. Separate Node.js REST API backend with MongoDB; React + Vite frontend.',
    tags: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
    githubUrl: 'https://github.com/aleks-drozy/noteit',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    featured: false,
    description:
      'Personal portfolio built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion. Hiring-first content system, custom design tokens, SSR-safe motion, and Vercel deployment.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/aleks-drozy/aleksandrs-portfolio',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'Java', icon: 'java' },
      { name: 'Python', icon: 'python' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'C++', icon: 'cpp' },
      { name: 'SQL', icon: 'sql' },
      { name: 'PineScript', icon: 'pinescript' },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'GitHub Actions', icon: 'actions' },
      { name: 'TradingView', icon: 'tradingview' },
      { name: 'Postman', icon: 'postman' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'Quantitative Researcher (Part-Time)',
    company: 'DLT Capital',
    period: 'Feb 2025 - Jul 2025',
    location: 'Maynooth',
    bullets: [
      'Developed algorithmic trading indicators and rules-based strategies in PineScript for crypto and futures markets on TradingView.',
      'Built and tested automated Bitcoin trading bots with systematic entry, exit, position sizing, and risk management logic.',
      'Generated approximately $15,000 in trading profit through disciplined technical analysis, statistical filters, and strict risk rules.',
      'Supported data-entry workflows, compliance checks, and internal workshop coordination for a more reliable research process.',
    ],
  },
  {
    role: 'Software Engineering Student',
    company: 'Maynooth University',
    period: 'Sept 2022 - Expected 2026',
    location: 'Maynooth, Ireland',
    bullets: [
      'Built academic and personal projects across Java, Python, TypeScript, JavaScript, C++, and SQL, including full-stack apps, data tooling, and an algorithmic trading thesis.',
      'Final-year project: designed, implemented, and evaluated an automated PineScript v6 strategy for NASDAQ-100 E-mini futures.',
    ],
  },
  {
    role: 'Customer Operations: Part-Time Roles',
    company: 'Circle K, UPS, Resus First Aid Ireland',
    period: '2022 - Present',
    location: 'Dublin',
    bullets: [
      'Worked in high-pressure service, warehouse, and first-aid environments where accuracy, calm communication, and reliability mattered.',
      'Resolved payment and system issues, handled documentation, maintained stock and dispatch accuracy, and followed safety protocols precisely.',
    ],
  },
]

export const education: Education = {
  institution: 'Maynooth University',
  degree: 'B.Sc. Computer Science & Software Engineering',
  period: '2022 - 2026',
  location: 'Maynooth, Ireland',
  gpa: 'GPA 3.0',
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
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aleksandrs-drozdovs-13b730331/', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://www.instagram.com/alex_drozy/', icon: 'instagram' },
]

export const beyondPanels: BeyondPanel[] = [
  {
    icon: 'judo',
    title: 'Judo',
    copy:
      'Sixteen years on the mat, black belt, multiple Irish national medals. Judo taught me how to stay composed when the situation gets ugly, how to lose without making excuses, and how to improve through repetition. That shows up in my engineering work: calm under pressure, honest about mistakes, and stubborn about getting better.',
  },
  {
    icon: 'chart',
    title: 'Algorithmic Trading',
    copy:
      "Funded account holder with real payouts, focused on NASDAQ-100 E-mini futures during NY morning sessions. I write strategies, test assumptions, and execute with predefined risk. It is a useful pressure test for engineering judgment because vague thinking gets punished quickly.",
  },
]
