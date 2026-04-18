'use client'
import Image from 'next/image'

const ICON_URLS: Record<string, string | null> = {
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  sql: null,
  pinescript: null,
  tradingview: null,
}

const FALLBACK_EMOJI: Record<string, string> = {
  sql: '🗄️',
  pinescript: '📊',
  tradingview: '📈',
}

export function SkillIcon({ name, icon }: { name: string; icon: string }) {
  const url = ICON_URLS[icon]
  const emoji = FALLBACK_EMOJI[icon]

  return (
    <div className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      {url ? (
        <Image
          src={url}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10"
        />
      ) : (
        <span className="text-3xl" role="img" aria-label={name}>{emoji ?? '⚙️'}</span>
      )}
      <span className="font-mono text-sm text-text-muted transition-colors duration-200 group-hover:text-text-secondary">
        {name}
      </span>
    </div>
  )
}
