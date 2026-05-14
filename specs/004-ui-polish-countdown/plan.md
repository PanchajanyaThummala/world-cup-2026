# Implementation Plan: Countdown Header + UI Polish Pass

**Branch**: `004-ui-polish-countdown` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)

---

## Summary

Add a sticky countdown banner at the top of the page (above navbar) targeting the 2026-06-11 opening match. Concurrently fix multiple UI hygiene issues: text-concatenation rendering bugs at the component level, premium redesign of the stats information band, rebuilt group standings cells, multi-line venue cards, refined hero CTA, unified vertical section rhythm, reduced uppercase pollution, and intentional empty-state styling for the bracket. No new dependencies, all work within existing stack.

---

## Technical Context

**Language/Version**: TypeScript 6.0.3 + React 19.2.6 (existing)
**Primary Dependencies**: Framer Motion 12, Tailwind v4, Vite 8 — no new packages
**Storage**: N/A (countdown is client-side computed)
**Testing**: Vitest + RTL — extend existing 37-test suite with 2 new component tests
**Performance**: Countdown re-renders only the countdown component (isolated state), 1Hz tick
**Constraints**: Banner must NOT cause CLS — must reserve its fixed height (~36px desktop, ~48px mobile)

---

## Constitution Check

- [x] **I — Fan Experience**: Countdown is a high-engagement hook; broken-string fixes restore premium feel
- [x] **II — Component-Driven**: New `CountdownBanner` + `VenueRow` + `BracketSlotEmpty` are self-contained
- [x] **III — Test-First**: New components get tests before/with implementation; all 37 existing must continue passing
- [x] **IV — Performance**: Countdown uses `setInterval` once, tick at 1Hz only; banner reserves fixed height (no CLS)
- [x] **V — Simplicity**: No new state management, no new deps; targeted edits only
- [x] **VI — Dependency Vetting**: No new packages — N/A

---

## Files to Create

```
src/components/layout/CountdownBanner.tsx       ← new sticky top banner
src/hooks/useCountdown.ts                       ← countdown hook (1s tick)
src/components/features/venues/VenueRow.tsx     ← OR refactor VenueCard inline
tests/components/layout/CountdownBanner.test.tsx
```

## Files to Update

```
src/App.tsx                                     ← mount CountdownBanner above Navbar
src/components/layout/Navbar.tsx                ← shift down to account for banner; sentence-case labels
src/components/features/hero/HeroSection.tsx    ← refine CTA padding + pulse animation
src/components/features/hero/TournamentStats.tsx ← premium info-band layout
src/components/features/groups/StandingsTable.tsx ← rebuild cells: column widths, padding, gold row accent
src/components/features/groups/GroupCard.tsx    ← (small) min-height adjustments
src/components/features/venues/VenueCard.tsx    ← 3 separate rows: country / city / capacity
src/components/features/legends/LegendCard.tsx  ← fix flag+nation flex layout
src/components/features/bracket/BracketSlot.tsx ← empty-state styling (dashed border, opacity, icon)
src/components/ui/SectionHeading.tsx            ← unify spacing tokens
src/components/layout/SectionWrapper.tsx        ← unify py-* across all sections
src/styles/globals.css                          ← --section-py token for rhythm
```

---

## Architecture Decisions

### Countdown Banner
- **Position**: `position: fixed; top: 0` — slim band ~36px tall desktop, ~48px mobile (allows 2-line wrap)
- **Navbar offset**: Navbar `top` becomes `36px` desktop / `48px` mobile
- **Target time**: `new Date('2026-06-11T20:00:00-04:00')` — opening match ET kickoff
- **Tick**: `setInterval(1000)` — paused if user has `prefers-reduced-motion` (still shows time, just no per-second flicker)
- **Live mode**: When `Date.now() > target`, show "Tournament Live — Matchday N"

### Flag + Text Rendering Fix
Every flag-and-text pairing migrates to:
```tsx
<div className="flex items-center gap-2">
  <span role="img" aria-hidden="true">{flag}</span>
  <span>{label}</span>
</div>
```
Key changes:
1. `aria-hidden="true"` on flag span — prevents screen readers reading the country name twice (when it follows the flag's `aria-label`)
2. Explicit `gap-2` flex layout — never relies on string concatenation
3. Drop `aria-label` from flag spans entirely; rely on the visible text label for accessibility

### Stats Information Band
- Background gradient strip with subtle gold dividers (not vertical lines, but `linear-gradient` accent)
- Each stat gets equal width via `grid grid-cols-5` desktop, `grid-cols-2` mobile
- Number font: `Oswald` 600 weight, 56px desktop / 40px mobile
- Number completes count → 200ms scale pulse (1.0 → 1.05 → 1.0)

### Group Standings Cells
- Table `table-layout: fixed`
- Column widths: `team 44% | MP 9% | W 9% | D 9% | L 9% | GD 9% | Pts 11%`
- Cell padding: `py-2.5 px-2`
- Top-2 rows: `background: rgba(201,168,76,0.06)` + left border `2px solid gold-500/40`

### Venue Card Rows
Three explicit rows per card:
```
[Country Flag] [Country Name]          ← row 1 (small, eyebrow style)
[City Name, State]                      ← row 2 (heading style)
[Capacity Number] capacity              ← row 3 (stat style)
```

### Section Rhythm
Single CSS custom property `--section-py: 96px` (desktop) / `64px` (mobile). All sections use `padding-top: var(--section-py)`.

### Bracket Empty Slot
```
border: 1.5px dashed rgba(31,41,55,0.8)
opacity: 0.7
inner: small clock icon + "Awaiting" text
```
When `slot.teamA !== 'TBD'` and `slot.teamB !== 'TBD'` → switches to solid border, opacity 1.

### Sentence Case
Navbar labels: "Home" / "Groups" / "Venues" / "History" / "Impact" / "Legends" / "Facts" / "Bracket" — already sentence case ✓
Buttons: "Explore the tournament" (was "EXPLORE THE TOURNAMENT") — change.
Preserve uppercase ONLY on:
- Section eyebrows (above headings)
- Badge labels
- Countdown label "KICKOFF IN"

---

## Phase 0 — Research Findings

See [research.md](./research.md) for full decisions.

## Phase 1 — Design Contracts

See [contracts/component-contracts.md](./contracts/component-contracts.md) for prop interfaces.
