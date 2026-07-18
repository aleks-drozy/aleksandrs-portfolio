import { describe, expect, it } from 'vitest'
import { alsoShipped, exhibits, heroMetrics, site } from './data'
import { getCaseStudy } from './case-studies'

// Every card on the homepage links to /projects/[slug]. A slug that is
// duplicated or missing from case-studies.ts builds cleanly and 404s live —
// these tests exist to catch that before it ships.

describe('project slugs', () => {
  const allSlugs = [...exhibits.map((e) => e.slug), ...alsoShipped.map((p) => p.slug)]

  it('are unique across exhibits and alsoShipped combined', () => {
    expect(new Set(allSlugs).size).toBe(allSlugs.length)
  })

  it.each(allSlugs)('slug "%s" resolves to a case study', (slug) => {
    expect(getCaseStudy(slug), `no case study for slug "${slug}"`).toBeDefined()
  })

  it('are url-safe (lowercase letters, digits, hyphens)', () => {
    for (const slug of allSlugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })
})

describe('exhibits', () => {
  it.each(exhibits.map((e) => [e.slug, e] as const))('"%s" has complete card copy', (_slug, e) => {
    expect(e.fig).toMatch(/^Fig\. \d{2}$/)
    expect(e.kicker).not.toBe('')
    expect(e.title).not.toBe('')
    expect(e.blurb.length).toBeGreaterThan(40)
    expect(e.tags.length).toBeGreaterThan(0)
    expect(e.tags.every((t) => t.trim() !== '')).toBe(true)
  })

  it('stats, when present, all have a value and a label', () => {
    for (const e of exhibits) {
      for (const stat of e.stats ?? []) {
        expect(stat.value.trim()).not.toBe('')
        expect(stat.label.trim()).not.toBe('')
      }
    }
  })
})

describe('alsoShipped', () => {
  it('external links are https URLs', () => {
    for (const p of alsoShipped) {
      for (const url of [p.github, p.live].filter((u): u is string => u !== undefined)) {
        expect(() => new URL(url)).not.toThrow()
        expect(new URL(url).protocol).toBe('https:')
      }
    }
  })
})

describe('site + hero', () => {
  it('hero metrics all have a value and a label', () => {
    expect(heroMetrics.length).toBeGreaterThan(0)
    for (const m of heroMetrics) {
      expect(m.value.trim()).not.toBe('')
      expect(m.label.trim()).not.toBe('')
    }
  })

  it('contact links are well-formed', () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    expect(new URL(site.github).protocol).toBe('https:')
    expect(new URL(site.linkedin).protocol).toBe('https:')
    expect(site.cvUrl).toMatch(/^\//)
  })
})
