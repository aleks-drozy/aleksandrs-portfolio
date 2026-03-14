'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { personalInfo } from '@/lib/data'
import { AnimatedText } from '@/components/ui/AnimatedText'

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }

function Orb({ className }: { className: string }) {
  return (
    <motion.div className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}/>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <Orb className="w-96 h-96 bg-accent-from top-1/4 -left-24"/>
      <Orb className="w-80 h-80 bg-accent-to bottom-1/4 -right-16"/>
      <Orb className="w-64 h-64 bg-accent-from top-1/2 left-1/2 -translate-x-1/2"/>
      <motion.div variants={containerVariants} initial="hidden" animate="visible"
        className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p variants={itemVariants} className="text-text-muted text-sm font-mono tracking-widest uppercase mb-4">Welcome</motion.p>
        <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
          Hi, I&apos;m <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Aleksander.</span>
        </motion.h1>
        <motion.div variants={itemVariants} className="text-2xl sm:text-3xl font-display font-medium mb-6">
          <AnimatedText words={personalInfo.roles}/>
        </motion.div>
        <motion.p variants={itemVariants} className="text-text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {personalInfo.heroLine}
        </motion.p>
        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <Link href="#projects" className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>View Projects</Link>
          <Link href={personalInfo.cvUrl} download className="px-6 py-3 rounded-lg border border-border text-text-muted hover:text-text-primary hover:border-accent-from transition-colors">Download CV</Link>
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <div className="w-[1px] h-12 mx-auto" style={{ background: 'linear-gradient(to bottom, #6366f1, transparent)' }}/>
      </motion.div>
    </section>
  )
}
