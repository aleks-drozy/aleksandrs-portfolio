'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo, socials } from '@/lib/data'
import { SocialLink } from '@/components/ui/SocialLink'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'Work', href: '#featured-work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = ['hero', 'featured-work', 'experience', 'education', 'skills', 'projects', 'beyond', 'contact']
const EASE = [0.23, 1, 0.32, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (href: string) => activeSection === href.replace('#', '')

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-border bg-background/88 backdrop-blur-md' : 'bg-background/30 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-[clamp(16px,4vw,32px)]">
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="font-display text-lg font-black text-text-primary transition-colors duration-200 hover:text-accent"
            >
              Aleksandrs D.
            </a>
            <span className="hidden items-center gap-1.5 rounded-md border border-border bg-surface/80 px-2.5 py-1 font-mono text-[10px] uppercase text-text-muted sm:inline-flex">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal-green" aria-hidden />
              {personalInfo.status}
            </span>
          </div>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-accent after:content-[""]'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.cvUrl}
              download
              className="hidden rounded-md border border-border px-4 py-2 font-mono text-xs text-text-muted transition-all duration-200 hover:border-accent/60 hover:text-text-primary active:scale-[0.98] md:block"
            >
              CV
            </a>
            <button
              className="rounded-md p-2 text-text-muted transition-colors duration-200 hover:text-text-primary md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-background/75 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-72 flex-col border-l border-border bg-surface px-6 py-8"
            >
              <button
                className="self-end rounded-md p-1 text-text-muted transition-colors duration-200 hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <nav className="mt-8 flex flex-col gap-5" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base text-text-muted transition-colors duration-200 hover:text-text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={personalInfo.cvUrl}
                  download
                  className="mt-2 rounded-md border border-border px-4 py-2 text-center font-mono text-sm text-text-muted transition-all duration-200 hover:border-accent/60 hover:text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Download CV
                </a>
              </nav>

              <div className="mt-auto flex gap-4">
                {socials.map((s) => <SocialLink key={s.name} social={s} />)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
