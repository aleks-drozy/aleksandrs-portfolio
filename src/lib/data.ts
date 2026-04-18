export type ProjectMetric = { label: string; value: string }

export type Project = {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  metrics?: ProjectMetric[]
  githubUrl: string
  featured: boolean
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
  headline: 'Building at the intersection of',
  headlineAccent: 'code and markets.',
  eyebrow: 'Software Engineer + Quant Developer',
  subline:
    'Final year Computer Science & Software Engineering @ Maynooth University. I build software, trade NASDAQ-100 futures on a funded account, and throw people for fun.',
  status: 'Open to opportunities',
  cvUrl: '/cv.pdf',
  email: 'aleksandrs.drozdovs2005@gmail.com',
  location: 'Dublin, Ireland',
}

export const heroStats: ProjectMetric[] = [
  { label: 'Win Rate', value: '56%' },
  { label: 'Max Drawdown', value: '$28.4k' },
  { label: 'Sharpe Ratio', value: '1.703' },
]

export const projects: Project[] = [
  {
    id: 'fyp-trading-strategy',
    title: 'Algorithmic Trading Strategy — NASDAQ-100 Futures',
    featured: true,
    description:
      'Quantitative trading system for NQ1! E-mini futures built around Smart Money Concepts. Targets NY morning sessions with Inverse Fair Value Gap + Change in State of Delivery double confirmation, backtested across 72 trades in a strict 28-minute execution window.',
    longDescription:
      'Quantitative trading system for NQ1! E-mini futures built around Smart Money Concepts. Targets NY morning sessions with Inverse Fair Value Gap + Change in State of Delivery double confirmation, backtested across 72 trades in a strict 28-minute execution window.',
    tags: ['PineScript v6', 'TradingView', 'Quant Research', 'SMC'],
    metrics: [
      { label: 'Win Rate', value: '56%' },
      { label: 'Max Drawdown', value: '$28.4k' },
      { label: 'Sharpe Ratio', value: '1.703' },
      { label: 'Trades', value: '72' },
    ],
    githubUrl: 'https://github.com/aleks-drozy/fyp-trading-strategy',
  },
  {
    id: 'gym-membership',
    title: 'Gym Membership System',
    featured: false,
    description: 'Data-management application covering members, classes, and orders. CRUD logic, JSON persistence, Node runtime.',
    tags: ['JavaScript', 'Node.js', 'JSON'],
    githubUrl: 'https://github.com/aleks-drozy/GymMembership-Project',
  },
  {
    id: 'login-signup',
    title: 'Login / Signup UI',
    featured: false,
    description: 'Clean authentication UI with form validation and smooth transitions, built with React and Vite.',
    tags: ['React', 'Vite', 'CSS'],
    githubUrl: 'https://github.com/aleks-drozy/login-signup',
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
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'TradingView', icon: 'tradingview' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'Funded Prop Trader',
    company: 'Undisclosed prop firm',
    period: '2024 — Present',
    location: 'Remote',
    bullets: [
      'Trade NASDAQ-100 E-mini futures on a funded account with real payouts, applying strict risk management and session-based execution rules.',
      'Run a production trading strategy derived from my final-year research; track every trade in a journal to refine edge over time.',
    ],
  },
  {
    role: 'Software Engineering Student — Research & Projects',
    company: 'Maynooth University',
    period: '2022 — 2026',
    location: 'Maynooth, Ireland',
    bullets: [
      'Shipped academic software projects in Java, Python, and JavaScript, including a full-stack gym-management system and an algorithmic trading strategy as final-year thesis.',
      'Worked in small teams on agile-style coursework; comfortable with Git workflows, code review, and writing documentation engineers actually read.',
    ],
  },
]

export const education: Education = {
  institution: 'Maynooth University',
  degree: 'B.Sc. Computer Science & Software Engineering',
  period: '2022 — 2026',
  location: 'Maynooth, Ireland',
  gpa: 'First Class Honours (expected)',
  coursework: [
    'Data Structures & Algorithms',
    'Software Engineering',
    'Operating Systems',
    'Databases',
    'Probability & Statistics',
    'Discrete Mathematics',
    'Machine Learning',
    'Computer Networks',
    'Artificial Intelligence',
    'Final-Year Project — Algorithmic Trading',
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
      'Sixteen years on the mat, black belt, multiple Irish national medals. Judo taught me composure under pressure, how to lose well, and how to get up faster than the problem. The discipline I built there is the same discipline I bring to code: methodical, resilient, always looking for the edge.',
  },
  {
    icon: 'chart',
    title: 'Algorithmic Trading',
    copy:
      "Funded account holder with real payouts, focused on NASDAQ-100 E-mini futures during NY morning sessions. I don't just write strategies — I execute them live. The work bridges quantitative thinking with engineering discipline, and every trade is a feedback loop that makes me a better systems builder.",
  },
]
