'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Image from 'next/image'
const fadeUp: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }

export function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
            <div className="relative w-72 h-80 md:w-80 md:h-96">
              <div className="absolute inset-0 rounded-2xl opacity-20 blur-xl scale-95" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}/>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                <Image src="/aleksander.jpg" alt="Aleksander Drozdovs" fill className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}/>
                <span className="text-white font-display font-bold text-5xl absolute">AD</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-6">
            <div>
              <p className="text-text-muted text-sm font-mono tracking-widest uppercase mb-2">About Me</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Building at the intersection of <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>code and markets.</span>
              </h2>
            </div>
            <p className="text-text-muted leading-relaxed">I&apos;m a final year Computer Science &amp; Software Engineering student at Maynooth University with a focus on algorithmic systems and software development. I work primarily in Java, Python, and PineScript — bridging academic fundamentals with real-world trading applications.</p>
            <p className="text-text-muted leading-relaxed">Outside the IDE, I&apos;m a Judo black belt with 16 years of competitive experience and multiple Irish national medals. The same discipline that drives me on the mat shapes how I approach engineering — methodical, resilient, and always looking for the edge.</p>
            <p className="text-text-muted leading-relaxed">I&apos;m also a retail trader with a funded account and real payouts, and I create content around fashion and lifestyle on Instagram. I believe the best developers are multi-dimensional — and I&apos;m building mine one rep, one trade, and one commit at a time.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
