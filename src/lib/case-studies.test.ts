import { describe, expect, it } from 'vitest'
import { caseStudies, getCaseStudy } from './case-studies'

describe('caseStudies', () => {
  it('slugs are unique', () => {
    const slugs = caseStudies.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it.each(caseStudies.map((c) => [c.slug, c] as const))('"%s" is renderable', (_slug, cs) => {
    expect(cs.title.trim()).not.toBe('')
    expect(cs.kicker.trim()).not.toBe('')
    expect(cs.year).toMatch(/^\d{4}$/)
    expect(cs.stack.length).toBeGreaterThan(0)
    expect(cs.sections.length).toBeGreaterThan(0)
    for (const section of cs.sections) {
      expect(section.heading.trim()).not.toBe('')
      // a section with neither paragraphs nor bullets renders as an empty heading
      const body = [...(section.paragraphs ?? []), ...(section.bullets ?? [])]
      expect(body.length, `section "${section.heading}" has no content`).toBeGreaterThan(0)
      expect(body.every((line) => line.trim() !== '')).toBe(true)
    }
  })

  it('links all have a label and an https URL', () => {
    for (const cs of caseStudies) {
      expect(cs.links.length).toBeGreaterThan(0)
      for (const link of cs.links) {
        expect(link.label.trim()).not.toBe('')
        expect(new URL(link.href).protocol).toBe('https:')
      }
    }
  })

  it('metrics, when present, all have a value and a label', () => {
    for (const cs of caseStudies) {
      for (const m of cs.metrics ?? []) {
        expect(m.value.trim()).not.toBe('')
        expect(m.label.trim()).not.toBe('')
      }
    }
  })

  // EquityCurve.tsx hard-codes the FYP dataset (Fig. 01, "NASDAQ-100 FYP
  // strategy"), so flagging any other study would render the wrong chart.
  it('hasEquityCurve is set only on the FYP strategy study', () => {
    const flagged = caseStudies.filter((c) => c.hasEquityCurve).map((c) => c.slug)
    expect(flagged).toEqual(['fyp-trading-strategy'])
  })
})

describe('getCaseStudy', () => {
  it.each(caseStudies.map((c) => c.slug))('returns the study for "%s"', (slug) => {
    expect(getCaseStudy(slug)?.slug).toBe(slug)
  })

  it('returns undefined for an unknown slug', () => {
    expect(getCaseStudy('does-not-exist')).toBeUndefined()
  })
})
