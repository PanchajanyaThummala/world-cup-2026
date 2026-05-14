# Implementation Plan: Fix Container Padding & Layout Consistency

**Branch**: `005-fix-padding-layout` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)

---

## Summary

Promote horizontal gutter to a CSS token (`--gutter-x`), apply consistently across SectionWrapper, Navbar, CountdownBanner, and TournamentStats. Fix Groups grid to use `grid auto-rows-[1fr]` with content-driven heights — no more wasted whitespace, no more misalignment. Add a mobile hamburger menu for ≤768px viewports. Remove "Mexico v TBD · Estadio Azteca" from the countdown banner and replace with neutral "Opening match · Mexico City". Make the gold qualifier styling conditional on `mp > 0` so pre-tournament tables are visually neutral.

---

## Technical Context

**Language/Version**: TypeScript 6.0.3 + React 19.2.6 (existing)
**Primary Dependencies**: Framer Motion 12, Tailwind v4, Vite 8 — no new packages
**Storage**: N/A
**Testing**: Vitest + RTL (40-test baseline)
**Constraints**: No new packages; all changes via existing primitives + CSS tokens

---

## Constitution Check

- [x] I — Fan Experience: Layout fixes directly improve perceived quality
- [x] II — Component-Driven: `Navbar` getting `MobileNav` sub-component; isolated change
- [x] III — Test-First: Gold-treatment conditional needs StandingsTable test update
- [x] IV — Performance: No new animations, no new JS — pure CSS/layout changes
- [x] V — Simplicity: No new state for mobile menu (just open/close toggle); no new deps
- [x] VI — Dependency Vetting: No new packages — N/A

---

## Files to Update

```
src/styles/globals.css                                ← add --gutter-x token
src/components/layout/SectionWrapper.tsx              ← use --gutter-x
src/components/layout/CountdownBanner.tsx             ← remove Mexico v TBD, apply gutter, fix wrap
src/components/layout/Navbar.tsx                      ← gutter, mobile hamburger menu
src/components/features/hero/TournamentStats.tsx      ← use --gutter-x
src/components/features/groups/GroupsSection.tsx      ← grid auto-rows-fr
src/components/features/groups/GroupCard.tsx          ← remove fixed min-h, let content drive
src/components/features/groups/StandingsTable.tsx     ← conditional gold treatment (only when any mp > 0)
```

## Files to Create

```
src/components/layout/MobileNav.tsx                   ← hamburger menu for ≤768px
```

---

## CSS Tokens

Add to `:root`:
```css
--gutter-x: 16px;          /* mobile baseline */

@media (min-width: 640px)  { --gutter-x: 24px; }
@media (min-width: 1024px) { --gutter-x: 48px; }
```

All containers use `padding-left: var(--gutter-x); padding-right: var(--gutter-x)`.

---

## Groups Grid Strategy

Current: cards have `min-h-[260px]` → wasted space when content is shorter
Fix: drop `min-h`. Use `grid auto-rows-fr` on container so all cards in a row stretch to match the tallest sibling. Content-driven, perfectly aligned.

```tsx
<motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
```

Cards become `h-full flex flex-col`.

---

## Conditional Gold Qualifier Treatment

`StandingsTable` accepts `standings` array. The component computes:
```ts
const tournamentStarted = standings.some(s => s.mp > 0)
```
Only when `tournamentStarted` is true, top-2 rows get the gold tint + border. Otherwise all 4 rows render with neutral styling.

---

## Mobile Hamburger Menu

At `≤768px`:
- Nav links hidden
- Hamburger icon button visible (top-right)
- On click: full-screen overlay panel slides in from right with nav links stacked vertically
- Tap outside or tap link to close
- Framer Motion `AnimatePresence` for the slide-in

---

## Countdown Banner Fix

Current text on desktop: `"Mexico v TBD · Estadio Azteca"`
Replace with: `"Opening match · Mexico City"` (factual, no speculative matchup)
Apply gutter padding to outer banner container.
Improve wrap behavior — `flex-wrap` already exists; ensure right edge padding.
