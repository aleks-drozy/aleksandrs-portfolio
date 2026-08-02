# Product

## Register

brand

## Users

Technical hiring managers, recruiters, and interviewers evaluating Aleksandrs Drozdovs (a 2026 Computer Science & Software Engineering graduate, Maynooth University) for Software Engineering, AI, and quantitative developer roles in Dublin. They skim fast, read code and numbers more readily than adjectives, and are specifically looking for evidence a candidate can ship and reason rigorously, not just describe projects. Context: usually a laptop, a few minutes between other candidates, often mid-search themselves for a specific signal (a live system, a tested claim, a real dataset).

## Product Purpose

Prove, not describe. Every exhibit exists to demonstrate that a claimed result is real and checkable: a live scoreboard that grades its own uptime, a pre-registered research verdict that says "NOT PROVEN" when the data says so, a self-testing options engine that re-verifies itself on every page load. Success is a reader leaving convinced this person ships production-grade, honestly-evaluated systems solo, not that the page looked impressive.

## Brand Personality

Quiet confidence, evidentiary, unshowy. Three words: precise, honest, unhyped. The voice reads like a lab notebook or an engineering postmortem, not a marketing page: numbered exhibits ("Fig. 02" through "Fig. 08"), metrics stated with their caveats attached (Wilson CIs, "NOT PROVEN" verdicts shown as prominently as wins), self-caught bugs disclosed rather than hidden. Nothing is claimed that isn't backed by a linked, real, running repo or dataset.

## Anti-references

Generic SaaS-startup portfolio templates: gradient hero text, bouncing icon grids, unverifiable "10x engineer" claims, stock photography, testimonial carousels. Also avoid: flashy data-viz with no real data behind it, hype language ("revolutionary," "game-changing"), and any claim that can't be traced to a real commit, test run, or live URL.

## Design Principles

- Every claim is checkable: a metric, a link to the repo, or both, on the same screen.
- Show working, not just conclusions: failed and disproven experiments (NOT PROVEN verdicts, self-caught bugs) are surfaced with the same visual weight as wins, not buried.
- Numbered evidence over marketing copy: the "Fig." system frames the page as an exhibit log, not a highlight reel.
- Quiet confidence over loud design: the interface should never need to compensate for weak substance with visual noise. Restraint is the flex.
- Honesty about tone in body copy: no em dashes, no filler adjectives; a claim reads the same way a code comment or commit message would.

## Accessibility & Inclusion

No formally documented WCAG target, but the codebase shows active reduced-motion handling (see `src/components/EquityCurve.reduced-motion.test.tsx`, which asserts the equity curve renders fully instead of animating when `prefers-reduced-motion` is set). Treat that as the existing baseline to preserve, not regress, in any new work.
