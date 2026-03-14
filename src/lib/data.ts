export type Project = {
  id: string; title: string; description: string; longDescription?: string
  tags: string[]; metrics?: { label: string; value: string }[]
  githubUrl: string; featured: boolean
}
export type SkillCategory = { name: string; skills: { name: string; icon: string }[] }
export type Social = { name: string; url: string; icon: 'github' | 'linkedin' | 'instagram' }
export type BeyondPanel = { icon: string; title: string; copy: string }

export const projects: Project[] = [
  {
    id: 'fyp-trading-strategy', title: 'FYP Trading Strategy', featured: true,
    description: 'Algorithmic trading strategy for NASDAQ-100 E-mini futures using Smart Money Concepts, built for my final year project.',
    longDescription: 'Targets NQ1! futures during NY morning sessions using Inverse Fair Value Gaps and Change in State of Delivery for double confirmation entries. Backtested across 72 trades with a strict 28-minute execution window.',
    tags: ['PineScript v6', 'TradingView', 'Algorithmic Trading', 'SMC'],
    metrics: [{ label: 'Win Rate', value: '56%+' }, { label: 'Net Profit', value: '$28.4k' }, { label: 'Profit Factor', value: '1.703' }, { label: 'Trades', value: '72' }],
    githubUrl: 'https://github.com/aleks-drozy/fyp-trading-strategy',
  },
  {
    id: 'gym-membership', title: 'Gym Membership System', featured: false,
    description: 'A data management application for gym operations: members, classes, and orders.',
    tags: ['JavaScript', 'JSON', 'Node.js'], githubUrl: 'https://github.com/aleks-drozy/GymMembership-Project',
  },
  {
    id: 'login-signup', title: 'Login / Signup UI', featured: false,
    description: 'Clean authentication UI built with React and Vite.',
    tags: ['React', 'Vite', 'CSS'], githubUrl: 'https://github.com/aleks-drozy/login-signup',
  },
]

export const skillCategories: SkillCategory[] = [
  { name: 'Languages', skills: [{ name: 'Java', icon: 'java' }, { name: 'Python', icon: 'python' }, { name: 'PineScript', icon: 'pinescript' }, { name: 'JavaScript', icon: 'javascript' }] },
  { name: 'Frameworks & Tools', skills: [{ name: 'React', icon: 'react' }, { name: 'Next.js', icon: 'nextjs' }, { name: 'Tailwind CSS', icon: 'tailwind' }] },
]

export const socials: Social[] = [
  { name: 'GitHub', url: 'https://github.com/aleks-drozy', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aleksandrs-drozdovs-13b730331/', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://www.instagram.com/alex_drozy/', icon: 'instagram' },
]

export const beyondPanels: BeyondPanel[] = [
  { icon: '🥋', title: 'Judo', copy: '16 years on the mat. Black belt. Multiple Irish national medals. Judo taught me discipline, composure under pressure, and how to fall and get back up.' },
  { icon: '📈', title: 'Algo Trading', copy: "Funded account holder with real payouts. I don't just write trading strategies, I trade them. Bridging quantitative thinking with live market execution." },
  { icon: '🎨', title: 'Fashion & Content', copy: 'Style is another form of self-expression. I create content on Instagram and have a genuine interest in fashion, the creative counterpart to code.' },
]

export const personalInfo = {
  name: 'Aleksandrs Drozdovs',
  roles: ['Developer', 'Algo Trader', 'Black Belt'],
  heroLine: 'Final year CS & Software Engineering at Maynooth. I build things, trade markets, and throw people.',
  cvUrl: '/cv.pdf',
}
