# Portfolio Redesign — Design Spec

**Date:** 2026-04-17
**Owner:** Aleksandrs Drozdovs
**Purpose:** Redesign the personal portfolio at `/` to land both tech (SWE) and finance (quant) roles.

## Context

Current portfolio is a competent single-page Next.js/Tailwind site (Hero, About, Skills, Projects, Beyond, Contact) with an indigo-to-purple gradient identity. It lacks: structured Experience, Education with coursework, a deep case study for the flagship FYP trading strategy, and updated skills (TypeScript, SQL, Git, Node.js). It also carries a Fashion/Content panel that can hurt finance applications.

## Goals

1. Signal competence to both **tech** hiring managers and **quant/finance** recruiters in a single artefact.
2. Convert the FYP Trading Strategy from a card into a dedicated case study — the highest-leverage single change.
3. Elevate visual craft to a level that signals "this person can design/build real product UX."
4. Keep the site fast, accessible, and maintainable.

## Non-Goals

- No CMS, no backend, no database. Content lives in typed TS modules.
- No live trading data feeds. The trading metrics are static numbers.
- No analytics or tracking in the first pass.
- No dark/light toggle — dark only.

## Audience & Priorities

**Both tech and finance equally.** That means: lead with the flagship case study (sells finance), back it with Experience + Education (credibility for both), show breadth with Skills + Projects (tech), humanise with Judo + Algo Trading (differentiation).

## Visual Direction

**Finance-Tech Hybrid** — structured, data-dense, dark base, single teal accent. Reads professional to both audiences without committing fully to a developer gradient or a trading-terminal amber.

## Scope

**Full Premium** — home page redesign + dedicated FYP case study + detail pages for the two smaller projects + `/writings` stub + craft touches (view transitions, count-up metrics, animated equity curve SVG).

**Phasing:**
1. Phase 1 — Home page end-to-end (this is what the user asked to start with).
2. Phase 2 — `/projects/fyp-trading-strategy` case study page.
3. Phase 3 — `/projects/[slug]` detail pages + `/writings` stub.

## Visual System

### Palette (strict; no ad-hoc colors)

| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#07080d` | Page background |
| `surface` | `#0f1117` | Cards, nav bar |
| `surface-elevated` | `#151823` | Hover states, emphasized cards |
| `border` | `#1e293b` | Default divider |
| `border-strong` | `#334155` | Hover/focus borders |
| `text-primary` | `#f1f5f9` | Headings, key numbers |
| `text-secondary` | `#94a3b8` | Body copy |
| `text-muted` | `#475569` | Labels, captions |
| `accent` | `#2dd4bf` | Single accent — CTAs, links, highlights, status dot |
| `signal-green` | `#22c55e` | Positive metrics, "open to opportunities" pill |
| `signal-red` | `#ef4444` | Negative metrics (e.g. drawdown if shown negatively) |
| `signal-gold` | `#fbbf24` | Sparing, for hero numbers only |

**Purple gradient is removed entirely.** Any previous `linear-gradient(135deg, #6366f1, #a855f7)` is replaced with a flat `accent` or (when a gradient is truly needed, e.g. Hero headline highlight) `linear-gradient(135deg, #2dd4bf, #14b8a6)`.

### Typography

- **Display:** Geist Sans — 700/800 only, `letter-spacing: -0.02em` at ≥32px.
- **Body:** Inter — 400/500.
- **Mono:** Geist Mono — 500, for metric values, labels, code.
- **Numbers:** `font-feature-settings: 'tnum' 1, 'ss01' 1;` globally — tabular figures for every numeral on the page.
- **Scale (px):** 12, 14, 16, 18, 24, 32, 48, 64, 80. No sizes outside this set.
- **Line heights:** 1.2 headlines, 1.5 body, 1.4 tight UI.

### Spacing & Layout

- 4-pt grid: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Max container: **1200px**.
- Side padding: `clamp(16px, 4vw, 32px)`.
- Section vertical rhythm: **128 / 96 / 80** px at desktop / tablet / mobile.

### Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo) for entrances.
- Durations: **350–450ms** for reveals, 200ms for micro-interactions (hover/focus).
- Reveal pattern: 24px y-offset, opacity 0→1, triggered once at 20% viewport.
- Count-up animation on the three hero stats (`framer-motion` `useMotionValue` + `animate`).
- View transitions between home and case study (`next-view-transitions` or Next.js App Router `viewTransition`).
- Respect `prefers-reduced-motion`: disable entrance offsets and count-ups.

## Information Architecture

### Routes

- `/` — home, all home sections.
- `/projects/fyp-trading-strategy` — full case study (Phase 2).
- `/projects/gym-membership` — detail (Phase 3).
- `/projects/login-signup` — detail (Phase 3).
- `/writings` — index stub, empty state "Writings coming soon" (Phase 3).

### Navigation

- Sticky, backdrop blur on scroll, 64px height.
- Left: `Aleksandrs D.` wordmark (text-primary, weight 700) + green-dot pill `● Open to opportunities` (signal-green dot, text-muted label, surface bg, border).
- Centre: `Work · Experience · About · Writings · Contact` (text-secondary, hover text-primary; active section = text-primary + 2px underline in accent).
- Right: `Download CV` — outline button, accent border on hover.
- Mobile: hamburger → right-side drawer (existing pattern is fine).

### Home Section Order

1. **Hero** — dual-identity headline, status pill, 3 hero stats with count-up.
2. **Featured Work** — FYP strategy large card + animated equity curve + "Read case study →" CTA.
3. **Experience** — vertical timeline, compact.
4. **Education** — Maynooth + coursework chips + GPA.
5. **Skills** — grouped (Languages / Frameworks / Tools), now with TypeScript, SQL, Git, Node.js added.
6. **Other Projects** — 2 cards, each linking to its detail page.
7. **Beyond The Code** — Judo + Algo Trading only (Fashion removed), each expanded.
8. **Contact** — email button + social icons.

## Page Specs

### Home / Hero

- Min height `calc(100vh - 64px)`, vertically centred content.
- Status pill (small, above H1): `● Open to opportunities` — signal-green 6px dot with subtle pulse, text-muted label, surface bg, border.
- Eyebrow label (mono, 12px, text-muted, letter-spacing widest): `SOFTWARE ENGINEER + QUANT DEVELOPER`.
- H1 (display, 64–80px, text-primary): `Building at the intersection of` **`code and markets.`** — accent-coloured phrase, no gradient swap (flat teal).
- Sub-copy (body, 18px, text-secondary, max-width 560px, leading-relaxed): "Final year Computer Science & Software Engineering @ Maynooth. I build software, trade NASDAQ-100 futures on a funded account, and throw people for fun."
- **Three hero stat cards** in a row (surface bg, border, 16px radius, 24px padding):
  | Value | Label |
  | --- | --- |
  | `56%` | Win Rate |
  | `$28.4k` | Max Drawdown |
  | `1.703` | Sharpe Ratio |
  - Value: display 700, 32px, text-primary, `tnum`.
  - Label: mono, 11px, text-muted, letter-spacing widest, uppercase.
  - Count-up on viewport enter, 900ms duration, ease-out-expo.
- CTAs below stats: `View Work` (accent solid, text on accent = background) + `Download CV` (outline).
- Remove the gradient orbs. Replace with a very subtle radial mesh background (fixed, low-opacity teal + signal-gold, blurred, 8% opacity max) behind Hero only.
- Scroll indicator at bottom (existing chevron+line works, recolored to accent).

### Featured Work (FYP card)

- Full-width card, surface bg, border, border-top accent 2px line.
- Two-column on desktop (55/45), stacked on mobile.
  - **Left:** label `FEATURED CASE STUDY`, H2 title "Algorithmic Trading Strategy — NASDAQ-100 Futures", 2–3 sentence summary, tag chips (PineScript v6 · TradingView · Algorithmic Trading · SMC), `Read case study →` link + `GitHub ↗` link.
  - **Right:** animated equity-curve SVG — a simple path that draws on viewport enter (stroke-dasharray animation, 1200ms). Placeholder shape derived from realistic equity growth; final version uses real data points from the backtest when user provides them.
- Below the two-column: a 4-up metric strip (Win Rate, Max Drawdown, Sharpe Ratio, Trades) same style as Hero stats but smaller (24px values).

### Experience (timeline)

- Section label `EXPERIENCE` (mono, muted), H2 "Where I've worked" (or similar user-driven copy).
- Vertical timeline, left rail 1px border with accent dots at each entry.
- Each entry: role title + company (text-primary, 18px, 700), dates (mono, 12px, muted), 2-bullet summary (text-secondary, 14px).
- **Content provided by user** — currently unknown; spec leaves typed `experience[]` array in `src/lib/data.ts` for user to fill.

### Education

- Section label `EDUCATION`, H2 "Education".
- Single card, surface bg, border.
- Left: institution + degree (text-primary 18px 700), dates (mono 12px muted), GPA badge (accent border, accent text).
- Right: coursework chips — small pills (surface-elevated bg, border, mono 11px text-secondary), wrap grid.
- **Content provided by user** — GPA value, coursework list. Placeholder list seeded in `data.ts` with common relevant courses (Data Structures, Algorithms, Stats, Discrete Math, ML).

### Skills

- Grouped, each group has its own mono label and a grid.
- Updated groups:
  - **Languages:** Java, Python, JavaScript, **TypeScript**, **SQL**, PineScript.
  - **Frameworks:** React, Next.js, **Node.js**, Tailwind CSS.
  - **Tools:** **Git**, GitHub, TradingView, VS Code.
- Each skill: 80px surface-bg rounded card with icon (48px) + name below (text-secondary, 14px). Hover: border → border-strong, translateY(-2px), 200ms.

### Other Projects

- Grid 2-column on desktop, 1 on mobile.
- Uses existing `ProjectCard` component, updated to the new visual tokens (teal not gradient).
- Cards link to `/projects/[slug]` detail pages (Phase 3). Until those exist, link to GitHub externally.

### Beyond The Code (trimmed)

- Two panels only (Judo, Algo Trading). Fashion removed.
- Each panel expanded to a richer narrative (4–5 sentences):
  - **Judo:** 16 years, black belt (year), Irish national medal placings (years). Discipline narrative.
  - **Algo Trading:** funded account with real payouts, NQ futures focus, connection between quantitative thinking and engineering.
- **Content provided by user** — specific medal years/placings, funded-account firm name (if disclosable).

### Contact

- Centred, max-w 600px.
- Label + H2 ("Let's talk.").
- Sub-copy: "Open to new graduate software engineering and quantitative developer roles for 2026."
- Email button (surface, border, accent on hover) + three social icons (GitHub, LinkedIn, Instagram — keep Instagram link since it's the public handle but remove the fashion framing in copy).

## Case Study Page (Phase 2)

`/projects/fyp-trading-strategy`

1. Back link (`← All projects`).
2. Eyebrow label, H1, tag chips, meta row (date, status, code link).
3. **Metric strip** — 4 cards: Win Rate, Max Drawdown, Sharpe Ratio, Trades.
4. **Equity curve** — full-width animated SVG using real data points.
5. **Sections** (H2 per):
   - Thesis — what market hypothesis the strategy exploits.
   - Methodology — IFVG + CSD confirmation entries, NY morning session, 28-minute execution window.
   - Risk management — position sizing, stop logic, max daily loss.
   - Results — full backtest breakdown.
   - What I learned — candid engineering + trading reflections.
6. Footer CTA — `Back to home` / `View code on GitHub`.

## Detail Pages & Writings (Phase 3)

- `/projects/[slug]` — one lightweight template, driven by the `projects[]` data. Hero + tags + description + GitHub link + any screenshots.
- `/writings` — empty state: H1 "Writings", muted paragraph "Long-form posts on markets, engineering, and the intersection of the two. Coming soon.", no list yet.

## Technical Notes

- **Stack unchanged:** Next.js 15 App Router, Tailwind v4, Framer Motion, TypeScript.
- **Fonts:** already wired via `next/font` (Inter, Geist Sans, Geist Mono). Add `font-feature-settings: 'tnum' 1` to root.
- **Data layer:** extend `src/lib/data.ts` with typed `experience[]`, `education`, updated `skillCategories`, updated `beyondPanels`, updated `projects[]` (including case-study-specific fields).
- **Components:** add `HeroStat`, `StatusPill`, `Timeline`, `EquityCurve`, `CourseworkChip`, `SectionHeader`.
- **Accessibility:** every icon has `aria-label`, every count-up respects `prefers-reduced-motion`, focus rings use accent (`ring-2 ring-accent ring-offset-2 ring-offset-background`), all contrast ratios ≥ WCAG AA.
- **Performance:** no new heavy deps. Equity curve is hand-rolled SVG, no chart lib. Images use `next/image` with explicit sizes.
- **SEO:** per-route `metadata` export (title, description, OpenGraph with custom gradient+text card), `robots.ts`, `sitemap.ts`.
- **Testing:** keep existing Vitest setup. Add smoke tests for data shape (each `Project` has required fields) and a visual sanity test (home renders all section ids).

## Content Deferred to User

To be filled in once home scaffold ships; blockers on final polish:

1. Experience entries (role, company, dates, 2-bullet summaries × N).
2. GPA number + final list of relevant coursework.
3. Specific Judo medal years/placings + year of black belt.
4. Funded-account firm name (or "anonymous prop firm" framing if not disclosable).
5. Real equity curve data points from the backtest (for the SVG).
6. Updated CV PDF at `/public/cv.pdf` aligned with the site narrative.

## Open Questions (none blocking Phase 1)

- Case study — does Aleksandrs have a rendered backtest report PDF he'd like embedded?
- Writings — any draft posts to land before the stub is published, or keep empty?

## Success Criteria

- Home page ships with all 8 sections, correct visual tokens, count-ups on metrics, no purple anywhere.
- Lighthouse: Performance ≥ 95, Accessibility ≥ 100 on desktop.
- Works at 375 / 768 / 1280 / 1920 widths without layout break.
- Zero TypeScript errors, zero ESLint errors.
- Visual snapshot matches the "Finance-Tech Hybrid" direction approved in brainstorm.
