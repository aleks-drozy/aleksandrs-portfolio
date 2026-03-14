'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
type Props = { words: string[]; className?: string }
export function AnimatedText({ words, className = '' }: Props) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % words.length), 2500)
    return () => clearInterval(interval)
  }, [words.length])
  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span key={words[index]}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="inline-block"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
