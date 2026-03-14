'use client'
import { motion } from 'framer-motion'
import { socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'

export function Contact() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-text-muted text-sm font-mono tracking-widest uppercase mb-2">Get in touch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>connect.</span>
          </h2>
          <p className="text-text-muted mb-10">Open to opportunities, collaborations, or just a good conversation.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col items-center gap-6">
          <a href="mailto:aleksandrs.drozdovs2005@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border bg-surface text-text-primary hover:border-accent-from transition-colors text-sm font-medium group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-muted group-hover:text-accent-from transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
            aleksandrs.drozdovs2005@gmail.com
          </a>
          <div className="flex justify-center gap-6">
            {socials.map((s) => <SocialLink key={s.name} social={s} className="w-6 h-6"/>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
