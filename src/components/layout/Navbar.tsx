'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Beyond the Code', href: '#beyond' },
  { label: 'Contact', href: '#contact' },
]
const SECTION_IDS = ['about', 'skills', 'projects', 'beyond', 'contact']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="#hero" className="font-display font-bold text-xl" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AD</Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '')
              return (
                <Link key={link.href} href={link.href}
                  className={`text-sm transition-colors duration-200 ${activeSection === sectionId ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}>
                  {link.label}
                </Link>
              )
            })}
          </div>
          <button className="md:hidden text-text-muted hover:text-text-primary p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60" onClick={() => setMobileOpen(false)}/>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-border flex flex-col px-6 py-8">
              <button className="self-end text-text-muted hover:text-text-primary mb-8" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg text-text-muted hover:text-text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex gap-4">
                {socials.map((s) => <SocialLink key={s.name} social={s}/>)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
