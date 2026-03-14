'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ICON_URLS: Record<string, string | null> = {
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  pinescript: null,
}

export function SkillIcon({ name, icon }: { name: string; icon: string }) {
  const url = ICON_URLS[icon]
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-surface hover:border-accent-from transition-colors group">
      {url ? <Image src={url} alt={name} width={40} height={40} className="w-10 h-10"/> : <span className="text-3xl" role="img" aria-label={name}>📊</span>}
      <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors font-mono">{name}</span>
    </motion.div>
  )
}
