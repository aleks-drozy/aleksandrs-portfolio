import { exhibits, type Stat } from './data'

export type Verdict = 'pos' | 'neg'

export type EvidenceStation = {
  index: number
  fig: string
  slug: string
  title: string
  kicker: string
  /** 1..N ordinal score, N = the most evidence-backed exhibit. Derived
   *  directly from the exhibit's rank in `exhibits` (already ordered
   *  most-impressive-first) so the slab heights in the 3D rail and the
   *  Ledger Table fallback can never drift out of sync with the ranking
   *  used everywhere else on the site. */
  score: number
  /** Whether the exhibit's headline claim is a clean pass (pos) or an
   *  honestly-disclosed non-result / pending verdict (neg) — the same
   *  visual weight the brand gives "NOT PROVEN" per PRODUCT.md. Exhibits
   *  not listed in NEG_SLUGS default to pos. */
  verdict: Verdict
  metrics: Stat[]
  href: string
}

// Exhibits whose headline finding is an honestly-disclosed non-result or a
// verdict still pending, per each exhibit's own blurb in src/lib/data.ts:
// - dublin-bikes-forecast: the public 28-day verdict gate has not resolved.
// - alpha-signal-lab: the honest model does not beat momentum.
// - fyp-strategy-engine: the pre-registered edge did not survive.
// - prompt-placebo: 0 of 39 comparisons earned a "still works" verdict.
const NEG_SLUGS = new Set(['dublin-bikes-forecast', 'alpha-signal-lab', 'fyp-strategy-engine', 'prompt-placebo'])

export const evidenceStations: EvidenceStation[] = exhibits.map((ex, i) => ({
  index: i,
  fig: ex.fig,
  slug: ex.slug,
  title: ex.title,
  kicker: ex.kicker,
  score: exhibits.length - i,
  verdict: NEG_SLUGS.has(ex.slug) ? 'neg' : 'pos',
  metrics: ex.stats ?? [],
  href: `/projects/${ex.slug}`,
}))
