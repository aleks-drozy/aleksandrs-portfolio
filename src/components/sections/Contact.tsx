'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'

type FormState = 'idle' | 'loading' | 'success' | 'error'

function validate(form: { name: string; email: string; message: string }) {
  const errs: Partial<typeof form> = {}
  if (!form.name.trim()) errs.name = 'Name is required'
  if (!form.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
  if (!form.message.trim()) errs.message = 'Message is required'
  return errs
}

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setFormState('loading')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      )
      setFormState('success')
    } catch { setFormState('error') }
  }

  const inputClass = 'w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-from transition-colors text-sm'

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-text-muted text-sm font-mono tracking-widest uppercase mb-2">Get in touch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Let&apos;s <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>connect.</span></h2>
          <p className="text-text-muted mb-10">Open to opportunities, collaborations, or just a good conversation.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          {formState === 'success' ? (
            <div className="bg-surface border border-border rounded-2xl p-10 text-center">
              <p className="text-4xl mb-3">✅</p>
              <h3 className="font-display text-xl font-bold mb-2">Message sent!</h3>
              <p className="text-text-muted text-sm">Thanks! I&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
              <div>
                <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass}/>
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass}/>
                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
              </div>
              <div>
                <textarea placeholder="Your message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`}/>
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
              </div>
              {formState === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
              <button type="submit" disabled={formState === 'loading'}
                className="w-full py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                {formState === 'loading' ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Sending...</>
                ) : 'Send Message'}
              </button>
            </form>
          )}
          <div className="mt-10 flex justify-center gap-6">
            {socials.map((s) => <SocialLink key={s.name} social={s} className="w-6 h-6"/>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
