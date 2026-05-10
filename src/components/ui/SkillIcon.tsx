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
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  sql: null,
  pinescript: null,
  tradingview: null,
  actions: null,
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
}

const FALLBACK_LABEL: Record<string, string> = {
  sql: 'SQL',
  pinescript: 'PS',
  tradingview: 'TV',
  actions: 'CI',
}

export function SkillIcon({ name, icon }: { name: string; icon: string }) {
  const url = ICON_URLS[icon]
  const fallback = FALLBACK_LABEL[icon] ?? name.slice(0, 2).toUpperCase()

  return (
    <div className="proof-panel group flex min-h-28 flex-col items-center justify-center gap-3 rounded-md p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      {url ? (
        <Image
          src={url}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10"
          aria-hidden
        />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-background font-mono text-sm font-semibold text-proof">
          {fallback}
        </span>
      )}
      <span className="text-center font-mono text-sm text-text-muted transition-colors duration-200 group-hover:text-text-secondary">
        {name}
      </span>
    </div>
  )
}
