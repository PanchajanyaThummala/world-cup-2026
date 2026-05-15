# Tasks: Acid Gold Colour System Redesign

**Feature**: 010-acid-gold-redesign  
**Total Tasks**: 22  
**Phases**: Setup (1) → US1 Token Layer (4) → US2 Section Application (10) → US3 Motion & Touch (4) → US4 Verification (3)

---

## Phase 1: Setup

- [ ] T001 Confirm all 40 tests pass on branch 010-acid-gold-redesign before making any changes (`npm run test -- --run`)

---

## Phase 2: US1 — Unified Acid Gold Token Layer

Goal: Replace all CSS colour tokens in globals.css so every component inherits the new palette.

- [ ] T002 [US1] Replace colour custom properties in `src/styles/globals.css`: set `--color-bg-base: #050400`, `--color-bg-surface: #0A0800`, `--color-primary: #FFD700`, `--color-text-primary: #FFFFF0`, `--color-text-secondary: #8B7A00`, `--color-border: rgba(255,215,0,0.15)`, `--color-border-hover: #FFD700`
- [ ] T003 [US1] Remove old neutral/gold palette variables (`--color-gold-500`, `--color-neutral-*`) from `src/styles/globals.css` and replace all references to `#C9A84C`, `#080A0F`, `#0D1117` in that file
- [ ] T004 [US1] Add `@media (prefers-reduced-motion: reduce)` block in `src/styles/globals.css` setting `*, *::before, *::after { transition: none !important; animation: none !important; }`
- [ ] T005 [US1] Update `src/components/ui/Card.tsx` to use `var(--color-bg-surface)` background, `1px solid var(--color-border)` default border, `var(--color-border-hover)` on hover, and CSS transition `transform 200ms cubic-bezier(0.22,1,0.36,1), border-color 150ms ease` with `transform: scale(1.02)` on hover

---

## Phase 3: US2 — Section-by-Section Application

Goal: Every named section renders in Acid Gold with no remnants of the old scheme.

- [ ] T006 [P] [US2] Update `src/components/layout/Navbar.tsx` to use `var(--color-bg-base)` background with `backdrop-filter: blur(16px)`, active nav link colour `var(--color-primary)`, border-bottom `var(--color-border)`
- [ ] T007 [P] [US2] Update `src/components/layout/CountdownBanner.tsx` to use `var(--color-bg-surface)` background, time-unit numbers coloured `var(--color-primary)`, border-bottom `var(--color-border)`
- [ ] T008 [P] [US2] Update `src/components/layout/MobileNav.tsx` to use `var(--color-bg-surface)` background for the slide-in panel, links coloured `var(--color-text-primary)`, active link `var(--color-primary)`
- [ ] T009 [P] [US2] Update `src/components/layout/Footer.tsx` to use `var(--color-bg-surface)` background, text `var(--color-text-primary)`, accent links `var(--color-primary)`
- [ ] T010 [P] [US2] Update `src/components/features/hero/HeroSection.tsx` gradient overlay to use Acid Gold tokens: `from-[#050400]/90 via-[#050400]/50 to-[#050400]`, headline accents to `var(--color-primary)`
- [ ] T011 [P] [US2] Update `src/components/features/hero/TournamentStats.tsx` stat numbers to `var(--color-primary)`, background strip to `var(--color-bg-surface)`, label text to `var(--color-text-secondary)`
- [ ] T012 [US2] Update `src/components/features/groups/StandingsTable.tsx` to apply `backgroundColor: 'rgba(255,215,0,0.08)'` to the top-2 rows when `standings[0].mp > 0`, rank number in those rows to `var(--color-primary)`
- [ ] T013 [P] [US2] Update `src/components/features/venues/VenueCard.tsx`, `src/components/features/nostalgia/MomentCard.tsx` to remove any hard-coded colour values and rely on Card primitive tokens
- [ ] T014 [P] [US2] Update `src/components/features/impact/ImpactStoryCard.tsx`, `src/components/features/legends/LegendCard.tsx` to remove any hard-coded colour values and rely on Card primitive tokens
- [ ] T015 [P] [US2] Update `src/components/features/facts/FactCard.tsx`, `src/components/features/bracket/BracketSlot.tsx` to remove any hard-coded colour values and rely on Card primitive tokens

---

## Phase 4: US3 — Motion & Touch Standards

Goal: Hover animations are fast and physical; reduced-motion is respected; touch targets ≥ 44px.

- [ ] T016 [P] [US3] Audit `src/components/layout/Navbar.tsx` and `src/components/layout/MobileNav.tsx` — ensure all nav links have `min-height: 44px; min-width: 44px` on their interactive containers
- [ ] T017 [P] [US3] Audit all button elements across the site (hero CTA, any filter buttons) — ensure `min-height: 44px; padding: 0 16px` so touch targets meet 44px minimum
- [ ] T018 [US3] Audit all Framer Motion animation definitions in feature components — clamp `duration` values to 0.15–0.3s range; replace any `ease: 'linear'` with `ease: [0.22,1,0.36,1]`
- [ ] T019 [US3] Search entire `src/` directory for emoji characters used as icons (flags in aria-hidden spans are acceptable; structural emoji in button labels or nav items are not) — replace any found with SVG Lucide icons

---

## Phase 5: US4 — Verification

- [ ] T020 Run full test suite `npm run test -- --run` and confirm all 40 tests pass
- [ ] T021 Start dev server `npm run dev`, open browser, visually audit every section top-to-bottom against the Acid Gold spec: background `#050400`, accents `#FFD700`, text `#FFFFF0`
- [ ] T022 Verify contrast using browser DevTools accessibility panel: gold-on-black ≥ 18:1, ivory-on-black ≥ 19:1

---

## Dependencies

- T001 must complete before any other tasks
- T002–T004 (globals.css tokens) must complete before T005 (Card primitive)
- T005 (Card primitive) must complete before T013–T015 (card variants)
- T006–T015 can run in parallel with each other (different files)
- T016–T019 can run in parallel (different files)
- T020–T022 must run after all implementation tasks

## Implementation Strategy

MVP: Complete Phase 2 (token layer) first — with just T002–T005 done, the entire site inherits the Acid Gold colour palette through CSS cascade. Phases 3–5 refine and verify.
