'use client'

import { useEffect, useState } from 'react'
import { site } from '@/lib/data'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'character', label: 'Character' },
  { id: 'contact', label: 'Contact' },
]

export function SiteNav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? 'border-hair bg-paper/80 backdrop-blur-md backdrop-saturate-150' : 'border-transparent bg-paper/0'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 sm:px-8" aria-label="Primary">
        <a href="#top" className="font-mono text-[13px] font-semibold tracking-[0.04em] text-ink">
          A<span className="text-cobalt">·</span>DROZDOVS
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative py-1 font-mono text-xs uppercase tracking-[0.05em] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:bg-cobalt after:transition-all after:duration-300 hover:text-ink ${
                  active === l.id ? 'text-ink after:w-full' : 'text-ink-3 after:w-0'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={site.cvUrl} className="btn btn-ghost !min-h-9 !px-4 text-xs" target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-5 bg-ink transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-hair bg-paper md:hidden">
          <ul className="mx-auto flex max-w-[1180px] flex-col px-6 py-2">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.05em] text-ink-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm uppercase tracking-[0.05em] text-cobalt"
              >
                Download CV ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
