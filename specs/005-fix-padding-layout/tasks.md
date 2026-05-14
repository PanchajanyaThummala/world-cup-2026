---
description: "Fix container padding, card alignment, navbar clipping, banner padding, gold treatment, mobile responsive"
---

# Tasks: Fix Container Padding & Layout Consistency

**Branch**: `005-fix-padding-layout`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ contracts/ ✅

---

## Phase 1: Setup

- [x] T0\1 Add `--gutter-x` token to `:root` in `src/styles/globals.css` with responsive breakpoints (16/24/48 px mobile/tablet/desktop)

---

## Phase 2: Foundational

- [x] T0\1 Update `src/components/layout/SectionWrapper.tsx` to apply `padding-left: var(--gutter-x); padding-right: var(--gutter-x)` to inner container (replace hardcoded `px-6 md:px-12`)

---

## Phase 3: User Story 1 — Consistent Gutter Across All Sections (P1) 🎯 MVP

**Goal**: No content touches viewport edge anywhere on the page.

**Independent Test**: Scroll the entire page at 1440px, 768px, 375px — no section title clips, no card touches the edge.

- [x] T0\1 [US1] Apply `--gutter-x` to inner container of `src/components/layout/Navbar.tsx` (replace `px-6`)
- [x] T0\1 [P] [US1] Apply `--gutter-x` to inner container of `src/components/layout/CountdownBanner.tsx` outer flex container (currently `px-4`)
- [x] T0\1 [P] [US1] Apply `--gutter-x` to inner container of `src/components/features/hero/TournamentStats.tsx` (currently `px-6`)
- [x] T0\1 [P] [US1] Apply `--gutter-x` to inner container of `src/components/layout/Footer.tsx` (currently `px-6 md:px-12`)

**Checkpoint**: All sections share gutter token.

---

## Phase 4: User Story 2 — Group Cards Align in Consistent Grid (P1)

**Goal**: Every group card aligns within its grid row with content-driven height.

**Independent Test**: Open Groups section. All 12 cards form a perfect grid with no misalignment, no wasted whitespace.

- [x] T0\1 [US2] Update `src/components/features/groups/GroupsSection.tsx` — add `auto-rows-fr` to the grid className
- [x] T0\1 [US2] Update `src/components/features/groups/GroupCard.tsx` — remove `min-h-[260px]`; add `h-full flex flex-col` so card stretches to grid row height
- [x] T0\1 [P] [US2] Update `src/components/features/bracket/BracketSection.tsx` — also apply `auto-rows-fr` to its embedded groups grid

**Checkpoint**: Open Groups section — all cards aligned, no whitespace.

---

## Phase 5: User Story 3 — Navigation Items Never Clip (P1)

**Goal**: All 9 nav items fully visible at ≥1024px, mobile hamburger at <1024px.

**Independent Test**: Resize browser from 1440 → 320. Nav never clips. Below 1024px the hamburger menu appears.

- [x] T0\1 [US3] Create `src/components/layout/MobileNav.tsx` — button toggle + slide-in panel with vertical link list; uses Framer Motion AnimatePresence
- [x] T0\1 [US3] Update `src/components/layout/Navbar.tsx`:
  - Desktop links: `hidden lg:flex` (was `hidden md:flex`)
  - Mobile hamburger button: `flex lg:hidden`
  - Mount `<MobileNav />` inside the navbar root

**Checkpoint**: At 1024px+ all 9 nav items show inline. At <1024px hamburger appears, opens overlay panel.

---

## Phase 6: User Story 4 — Remove Incorrect Match Info (P1)

**Goal**: Countdown banner has no "Mexico v TBD" text.

**Independent Test**: Search rendered HTML — no "v TBD" or "vs TBD" string.

- [x] T0\1 [US4] Update `src/components/layout/CountdownBanner.tsx` — replace `"Mexico v TBD · Estadio Azteca"` with `"Opening match · Mexico City"`

**Checkpoint**: View page source — string "v TBD" is gone.

---

## Phase 7: User Story 5 — Banner Edge Padding (P2)

- [x] T0\1 [US5] Ensure CountdownBanner outer container uses `padding-left: var(--gutter-x); padding-right: var(--gutter-x)` and content can wrap to 2 lines cleanly (already partial; verify)

**Checkpoint**: Banner content has visible padding on both sides at all viewports.

---

## Phase 8: User Story 6 — Remove Misleading Gold Treatment (P2)

**Goal**: Pre-tournament tables are visually neutral; gold qualifier appears only after matches.

**Independent Test**: Open Groups section. All 4 rows of every group look identical. No gold tint, no gold border, no gold "0 pts".

- [x] T0\1 [US6] Update `src/components/features/groups/StandingsTable.tsx`:
  - Compute `const tournamentStarted = standings.some(s => s.mp > 0)`
  - Apply `isQualifier` styling only when `tournamentStarted && i < 2`
  - All Pts cells use neutral styling when `!tournamentStarted`

**Checkpoint**: Standings tables show no gold treatment pre-tournament.

---

## Phase 9: User Story 7 — Consistent Team Name Font Weights (P3)

- [x] T0\1 [US7] In `src/components/features/groups/StandingsTable.tsx` — make team name weight a single value `font-medium` when `!tournamentStarted`; promote to `font-semibold` only for `isQualifier` rows post-kickoff

**Checkpoint**: All team names identical weight pre-tournament.

---

## Phase 10: User Story 8 — Responsive Layout at Small Viewports (P3)

- [x] T0\1 [US8] Verify all sections at 375px have no horizontal overflow (except Bracket section which has its own horizontal scroll); audit by manual resize after T001-T015 complete
- [x] T0\1 [P] [US8] Ensure hamburger button and mobile nav links have `min-h-[44px] min-w-[44px]` touch targets

**Checkpoint**: Site fully usable at 375px.

---

## Phase 11: Polish & Validate

- [ ] T018 Run `npm run build` — fix any TypeScript errors
- [ ] T019 Run `npm run test:run` — fix any test failures; update tests where layout markup changed
- [ ] T020 [P] Update `CHANGELOG.md` — add `[0.5.0]` entry
- [ ] T021 Commit + push `005-fix-padding-layout` branch to GitHub

---

## Dependencies

- T001 → T002 → T003–T006 (gutter token must exist first)
- T007–T009 independent of gutter chain, can run parallel
- T010 → T011 (MobileNav before Navbar wiring)
- T012, T013 independent
- T014 → T015 (standings refactor)
- T016, T017 audit tasks after everything else
- T018–T021 final polish

---

## Parallel Opportunities

- T003, T004, T005, T006 — gutter applications in different files
- T007, T009 — grid auto-rows in different files
- T012 / T014 / T015 — different concerns
- T020 (changelog) can run while T018/T019 run

---

## MVP

**MVP = US1 + US3 + US4** (gutter consistency, navbar fix, remove wrong match info) — addresses the visible bugs. Total 8 tasks: T001–T006 + T010–T012.

**Full feature** = all 8 US phases = T001–T021. Total: **21 tasks**.
