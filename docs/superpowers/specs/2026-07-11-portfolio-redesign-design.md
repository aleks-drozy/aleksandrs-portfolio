# Portfolio Redesign — Design Spec

**Date:** 2026-07-11
**Status:** Approved (design + content), building
**Branch:** `redesign/light-editorial`

## Goal

Full rebuild of the personal portfolio into a professional, distinctive design that is a genuine
departure from the previous dark "cinematic HUD" theme (graphite + amber/cyan, film grain, arc-reactor
orb). Keep the Next.js 16 / TypeScript / Tailwind v4 / Vercel stack and the existing live URL.

## Approved decisions

- **Look & feel:** Clean **light editorial** — an "engineering ledger / research note" concept.
  Precise, gridded, data-literate, quietly confident.
- **Accent:** a single confident **cobalt** blue, spent only on links, CTAs, key numbers, and the
  hero equity curve. Everything else stays quiet.
- **Neutrals:** cool blue-biased paper (`#F5F7FA`), cool near-black ink (`#12151C`) — deliberately
  not the warm-cream AI-editorial cliché.
- **Type:** editorial **serif** display (Fraunces) + clean **grotesk** body (Geist) + **monospace**
  utility face (Geist Mono) for labels/metrics/figure captions.
- **Theme:** **light only** — one polished, committed world. No dark toggle.
- **Scope:** full rebuild from scratch (new design system, components, content), same repo + deployment.

## Positioning (corrected)

Aleksandrs is a **Computer Science & Software Engineering graduate (Maynooth, 2026, 2.1 Honours)** —
no longer a "final-year student." Source of truth: newest CV (`aleksandrs-cv-mastercard-swe.html`,
2026-07-09) + GitHub (`github.com/aleks-drozy`). LinkedIn is login-walled and was not scraped.

Headline: "Software engineer with quant instincts." Ships production systems end-to-end — two live SaaS
apps, an agentic AI assistant, systematic trading strategies. Tested, documented, honest results.

## Structure

Single-page homepage + data-driven case-study route (`/projects/[slug]`).

1. **Nav** — sticky, mono links, scroll-spy underline.
2. **Hero** — positioning + updated metrics (790+ tests · 2 live SaaS · ~$15K profit) + CTAs, with the
   **real 72-trade FYP equity curve** rendered as *Fig. 01* (research figure).
3. **Selected work** — four numbered *exhibits* (Fig. 02–05): JARVIS, Personal Performance OS, Maken,
   NASDAQ-100 FYP. Numbering is earned (ranked evidence).
4. **Also shipped** — Trading Analytics Dashboard, Vectorised Backtesting Engine, NoteIt.
5. **Experience** — DLT Capital, education, part-time/volunteer.
6. **Skills** — Languages / Frameworks / Data & Backend / Testing & Tooling.
7. **Character** — Judo, Algorithmic trading.
8. **Contact** — email, LinkedIn, GitHub, CV.
9. **Footer**.

## Content notes

- **JARVIS** framed as **both**: voice-controlled Electron HUD (local whisper.cpp STT) **and** the
  scheduled, unattended agentic pipeline (Claude agent, PowerShell, Task Scheduler, Gmail SMTP,
  encrypted credentials, Jooble jobs API, safety rules).
- **Personal Performance OS**: 33 RLS tables · 28 migrations · 145 merged PRs · 790+ tests (Vitest +
  Playwright) · Groq Llama 3.3 70B.
- **DLT Capital**: Feb 2025 – Jun 2025.
- **FYP strategy**: 56.94% win · +$28,400 net · 1.703 PF · 72 trades (in-sample Jan 2025–Feb 2026);
  honest out-of-sample caveats.

## Motion

Restrained and precise: equity curve draws in on view, sections rise/fade on scroll, cobalt link
underlines, subtle button lifts. Full `prefers-reduced-motion` support.

## Verification

`npm run dev` → visual check (desktop + mobile), console clean, then `npm run lint` + `npm run build`.
Do not deploy without explicit approval (site is live).
