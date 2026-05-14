---
description: "Countdown banner + UI polish — broken strings, stats band, group cells, venue rows, bracket empty states, section rhythm, sentence case"
---

# Tasks: Countdown Header + UI Polish Pass

**Branch**: `004-ui-polish-countdown`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ contracts/ ✅

---

## Phase 1: Setup

- [x] T001 Add CSS custom property `--section-py: 96px` (desktop) / `64px` (mobile) and `--banner-h: 36px` / `48px` mobile in `src/styles/globals.css` for unified spacing tokens

---

## Phase 2: Foundational

- [x] T002 Create `src/hooks/useCountdown.ts` — exports `useCountdown(targetISO: string)` returning `{ phase: 'countdown' | 'live', days, hours, minutes, seconds, matchday }`; uses `setInterval(1000)` cleared on unmount
- [x] T003 [P] Create `tests/components/layout/CountdownBanner.test.tsx` — test renders "Kickoff in" label, renders 4 numeric segments (days/hrs/min/sec), switches to "Tournament Live" when past target

---

## Phase 3: User Story 1 — Tournament Countdown Banner (P1) 🎯 MVP

**Goal**: Sticky banner above navbar showing countdown to 2026-06-11 opening match.

**Independent Test**: Banner visible at top, shows "Kickoff in: NN days HH:MM:SS", seconds tick down.

- [x] T004 [US1] Create `src/components/layout/CountdownBanner.tsx` — sticky `position: fixed top-0 z-60`, height `var(--banner-h)`, gold gradient bottom border, renders countdown via useCountdown hook with target `2026-06-11T20:00:00-04:00`; "KICKOFF IN" eyebrow + 4 segments + opening match label
- [x] T005 [US1] Mount `<CountdownBanner />` at top of `<div>` in `src/App.tsx` before `<Navbar />`
- [x] T006 [US1] Update `src/components/layout/Navbar.tsx` — set `top: var(--banner-h)` so navbar sits below banner; keep z-index lower than banner

**Checkpoint**: Banner is visible at top, navbar is below it, countdown updates every second.

---

## Phase 4: User Story 2 — Fix Broken Inline Strings (P1)

**Goal**: Eliminate all visible text concatenation (MexicoMexico, USADallas/Arlington).

**Independent Test**: Inspect every section — no concatenated flag+text strings, all flag/name pairs visibly separated.

- [x] T007 [US2] Update `src/components/features/legends/LegendCard.tsx` — replace inline `<span aria-label={nation}>{flag}</span> {nation}` with `<div className="flex items-center gap-2"><span aria-hidden="true">{flag}</span><span>{nation}</span></div>`
- [x] T008 [P] [US2] Update `src/components/features/venues/VenueCard.tsx` — rebuild country/city section with flex gap pattern (also part of US5)
- [x] T009 [P] [US2] Update `src/components/features/bracket/BracketSlot.tsx` — team flag + name use flex gap pattern
- [x] T010 [P] [US2] Update `src/components/features/groups/StandingsTable.tsx` — team flag + name cell uses flex gap pattern
- [x] T011 [P] [US2] Update `src/components/ui/Flag.tsx` — remove default `aria-label` usage from caller code where adjacent visible text exists (set `aria-hidden="true"` mode option)

**Checkpoint**: Manual scroll — zero concatenated strings anywhere.

---

## Phase 5: User Story 3 — Premium Stats Information Band (P1)

**Goal**: Redesign the 5-stat strip as a designed information band.

**Independent Test**: Stats sit in unified row with consistent spacing, numbers pulse on count completion.

- [x] T012 [US3] Update `src/components/features/hero/TournamentStats.tsx` — convert to `grid grid-cols-5 md:gap-0` desktop / `grid-cols-2 gap-4` mobile; replace divide-x with subtle gold gradient dividers; add Framer Motion `animate` scale pulse `[1, 1.05, 1]` when count completes

**Checkpoint**: Stats look like one cohesive info band, not 5 stacked items.

---

## Phase 6: User Story 4 — Rebuilt Group Standings Cells (P2)

**Goal**: Standings table cells with controlled widths, proper padding, gold row accent for top-2.

**Independent Test**: All 12 groups show 4 readable team names, columns aligned, top-2 visually distinct.

- [x] T013 [US4] Update `src/components/features/groups/StandingsTable.tsx`:
  - Add `<colgroup>` with widths: team 44%, MP/W/D/L/GD 9%, Pts 11%
  - Set `table-layout: fixed` via inline style
  - Cell padding `py-2.5 px-2`
  - Top-2 rows: `background: rgba(201,168,76,0.06)`, `border-left: 2px solid rgba(201,168,76,0.5)`
  - Team name `truncate` removed; let it wrap to 2 lines if needed

**Checkpoint**: No team names truncated; top-2 rows visually distinct from positions 3–4.

---

## Phase 7: User Story 5 — Venue Card Multi-Line Layout (P2)

**Goal**: Three explicit rows per venue: country, city, capacity.

**Independent Test**: Each venue card visibly has 3 separate row blocks.

- [x] T014 [US5] Rewrite `src/components/features/venues/VenueCard.tsx` body layout:
  - Row 1: flag + country name in flex gap-2 (eyebrow style — uppercase 11px, neutral-500)
  - Row 2: City + state (h3, text-lg, neutral-50)
  - Row 3: Capacity number (Oswald, gold-400, large) + "capacity" label
  - Final/Opening badge floats top-right corner

**Checkpoint**: All 16 venue cards render 3 clear rows.

---

## Phase 8: User Story 6 — Hero CTA Refinement (P3)

- [x] T015 [US6] Update CTA button in `src/components/features/hero/HeroSection.tsx`:
  - Padding `px-10 py-4`
  - Letter-spacing `0.06em` (was 0.14em)
  - Sentence-case label: "Explore the tournament"
  - Add Framer Motion `animate` for 2s loop gold-glow pulse: `boxShadow: ['0 0 24px rgba(201,168,76,0.25)', '0 0 40px rgba(201,168,76,0.5)', '0 0 24px rgba(201,168,76,0.25)']`
  - Respect `prefers-reduced-motion`

**Checkpoint**: CTA pulses subtly with gold glow.

---

## Phase 9: User Story 7 — Unified Vertical Section Rhythm (P3)

- [x] T016 [US7] Update `src/components/layout/SectionWrapper.tsx` to use `paddingTop: 'var(--section-py)'` and `paddingBottom: 'var(--section-py)'` from globals.css token
- [x] T017 [P] [US7] Update `src/components/ui/SectionHeading.tsx` — fixed `mb-16` (was mb-20) for consistent gap
- [x] T018 [P] [US7] Audit all SectionWrapper usages — confirm no sections override py-* with custom classes

**Checkpoint**: All sections share identical top/bottom padding.

---

## Phase 10: User Story 8 — Reduce Uppercase Pollution (P3)

- [x] T019 [US8] Update `src/components/layout/Navbar.tsx` — change nav label `className` from uppercase to sentence case (remove `uppercase` class, keep `tracking-wider` only)
- [x] T020 [P] [US8] Update hero CTA label to sentence case (done in T015)
- [x] T021 [P] [US8] Update Footer.tsx — remove uppercase from any non-eyebrow text

**Checkpoint**: Only eyebrows, badges, and "KICKOFF IN" remain uppercase.

---

## Phase 11: User Story 9 — Bracket TBD Visual Hierarchy (P3)

- [x] T022 [US9] Update `src/components/features/bracket/BracketSlot.tsx`:
  - Detect `slot.teamA === 'TBD' && slot.teamB === 'TBD'` → render empty state variant
  - Empty state: `border-style: dashed`, `border-color: rgba(31,41,55,0.8)`, `opacity: 0.55`
  - Render small inline clock SVG icon + text "Awaiting result"
  - Filled state: solid border, opacity 1, normal team rendering
  - Hover on empty state: brighten border slightly to indicate interactivity (none required, just feedback)

**Checkpoint**: Bracket empty slots look intentional, not broken.

---

## Phase 12: Polish & Validation

- [x] T023 Run `npm run build` — fix any TypeScript errors
- [x] T024 Run `npm run test:run` — fix any test failures (CountdownBanner test must pass; existing 37 must continue passing)
- [x] T025 [P] Manual scroll-through audit at 1440px and 375px — confirm no string concatenation, all sections rhythmic, banner sticky above navbar
- [x] T026 [P] Update `CHANGELOG.md` — add `[0.4.0]` entry with all User Story summaries
- [x] T027 Commit + push `004-ui-polish-countdown` branch to GitHub

---

## Dependencies

- **Phase 1 (T001)** → Phase 2 (uses CSS tokens)
- **Phase 2 (T002, T003)** → Phase 3 (CountdownBanner needs hook + test)
- **Phase 3 (T004–T006)** → independent after Phase 2
- **Phase 4 (T007–T011)** → independent, can run parallel to Phase 3
- **Phase 5–11 (T012–T022)** → independent of each other, can run parallel
- **Phase 12 (T023–T027)** → after all implementation phases

---

## Parallel Opportunities

- T008, T009, T010, T011 (broken-string fixes in different files)
- T017, T018 (rhythm audit, different files)
- T020, T021 (uppercase in different files)
- T025, T026 (manual audit + changelog)

---

## MVP Suggestion

**MVP = US1 only** (Phase 1 + 2 + 3) — sticky countdown banner is the highest visible value-add. Ship that first, then iterate the polish fixes in subsequent commits.

**Full feature** = all 11 US phases (T001–T022) + polish (T023–T027).

Total: **27 tasks**.
