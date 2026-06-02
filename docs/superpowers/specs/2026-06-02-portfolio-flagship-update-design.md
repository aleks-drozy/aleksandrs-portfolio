# Portfolio Flagship Update — Design Spec

**Date:** 2026-06-02
**Owner:** Aleksandrs Drozdovs
**Builds on:** `2026-04-17-portfolio-redesign-design.md`
**Purpose:** Sync the live portfolio to the current CV by featuring the two strongest (currently missing) projects, sharpening the hero proof, and removing low-signal content — without a visual redesign.

## Problem

Site content has drifted from the CV. The two strongest projects on the CV — **Personal Performance OS** and **Maken** — are absent from the site, while **NoteIt** (no longer on the CV) is featured. The hero leads with a vanity metric ("228 dashboard commits"), the Education card shows "GPA 3.0" (the CV omits it), and the skills list is missing shipped tech (Supabase, PostgreSQL, Playwright, pytest, Vercel). The visual design is strong and stays.

## Decisions (confirmed with owner)

- **Scope:** Targeted content/positioning update. No visual redesign, no full SEO/OG pass.
- **Private flagships:** `personal-performance-os` and `maken` are private repos with live demos. Feature them with **live demo links + "code available on request"** — no public repo links, no code-leak risk.
- **Both live demos are presentable** and may be linked.

## Source facts (from CV + repo READMEs)

- **Personal Performance OS** — live at `https://personal-performance-os.vercel.app`. Supabase email/password auth, 25-table Postgres schema with RLS on every table (12 migrations). Modules: morning check-in + readiness engine, automatic training programming + load analytics, fridge inventory + AI recipes, habits, tasks ("Plan/Fix my day"), ideas inbox, weather-aware wardrobe. AI: Groq Llama 3.3 70B (recipes, coaching, weekly review, day planning) with prompt-injection hardening + persistent rate limiting. Quality: ESLint + Prettier, 94 Vitest unit tests, 6/6 Playwright E2E, light + dark mode.
- **Maken — "Make weight, fight fresh."** — live at `https://fitness-goal-coach.vercel.app`. Competition prep for judo/BJJ athletes: weight-cut protocols, training plans, weekly check-ins around weight class + tournament date. Stack: Next.js 16 (App Router), Supabase (auth, Postgres, RLS), Groq/Llama 3.3, Resend email, cron, Vercel, Tailwind v4 + Framer Motion. Narrative hook: built by a 16-year judo black belt for his own sport.

## Changes

### 1. Hero (`Hero.tsx`, `data.ts: personalInfo`, `heroStats`, `hireSignals`)
- Subline leads with "ships production full-stack products end-to-end" + concrete proof (2 live apps, 100+ tests, RLS) and the quant angle (~$15K).
- Hero stats replace "228 Dashboard Commits":
  - `2` — Live apps shipped
  - `100+` — Automated tests
  - `$15K` — Live trading profit
- `hireSignals` "Strongest proof" → "Personal Performance OS, Maken, FYP strategy".

### 2. Projects (`data.ts: projects`, `proofItems`, `FeaturedWork.tsx`, `Projects.tsx`, new pages)
- **Add** `personal-performance-os` (featured) — full case-study page `/projects/personal-performance-os`. Live link; code on request.
- **Add** `maken` (featured) — detail page `/projects/maken`. Live link; code on request.
- **Keep** `fyp-trading-strategy` featured (equity-curve case study unchanged).
- **Selected Projects grid:** `trading-dashboard`, `backtest-engine` (public, linkable).
- **Remove** `noteit` from the grid + its `/projects/noteit` page. Demote "This Portfolio" to a footer "source" link (remove the card).
- Add `Project` field `codeAvailability?: 'public' | 'on-request'` so cards/CTAs render **"Live demo"** + **"Code on request"** instead of a dead GitHub link for private flagships.

### 3. Skills (`data.ts: skillCategories`, `SkillIcon.tsx`)
- Regroup: **Languages / Frameworks & Libraries / Data & Backend / Testing & Tooling**.
- Add: **Supabase, PostgreSQL, Playwright, pytest, Vercel** (add icons to `SkillIcon`).

### 4. Education (`data.ts: education`, `Education.tsx`)
- Remove `gpa` from display (drop the GPA badge). Keep institution, degree, period, coursework.

### 5. Experience & Beyond (`data.ts`)
- Light copy tightening for impact + CV consistency.
- Beyond "Algorithmic Trading" / "Judo": thread the Maken ↔ judo story.

## Handling private code links
- `ProjectCard` + featured CTAs: when `codeAvailability === 'on-request'`, render **"Live demo ↗"** (primary) and a **"Code on request"** affordance (mailto or muted note) instead of "GitHub ↗".

## Out of scope (follow-up "polish" pass)
- Visual redesign, motion overhaul, custom OG image, full per-route SEO.

## Verification
- `npm run build` clean; `npm run test:run` green; zero TS / ESLint errors.
- Browser check at 1280 + 375: new hero stats, both flagship cards + detail pages, expanded skills, Education with no GPA, NoteIt gone, every link resolves (no 404s, no dead private-repo links).

## Files
- **Edit:** `src/lib/data.ts`; `src/components/sections/{Hero,FeaturedWork,Skills,Education,Projects,BeyondTheCode}.tsx`; `src/components/ui/{ProjectCard,SkillIcon}.tsx`; `src/components/layout/Footer.tsx`.
- **Add:** `src/app/projects/personal-performance-os/page.tsx`; `src/app/projects/maken/page.tsx`.
- **Remove:** `src/app/projects/noteit/page.tsx`; `src/app/projects/portfolio/page.tsx`.
