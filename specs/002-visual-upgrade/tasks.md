---
description: "Visual upgrade — editorial layout, player imagery, legends section"
---

# Tasks: Visual Upgrade — Editorial Layout & Player Imagery

**Branch**: `002-visual-upgrade`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ contracts/ ✅

---

## Phase 1: Types & Data

- [ ] T001 Add `photo?: string` to `HistoricMoment` interface and add `Legend` interface in `src/types/index.ts`
- [ ] T002 Create `src/data/legends.ts` exporting `LEGENDS: Legend[]` with 6 entries: Pelé (player-1.jpg), Maradona (player-2.jpg), Zidane (gradient), Ronaldo Nazário (trophy.jpg), Miroslav Klose (gradient), Lev Yashin (gradient) — each with name, nation, flag, era string, 1-sentence description
- [ ] T003 [P] Add `photo` field to 3 entries in `src/data/moments.ts`: moment-014 (Mineirazo → trophy.jpg), moment-015 (2022 Final → trophy.jpg), moment-009 (Hand of God → player-2.jpg)

---

## Phase 2: Tests (write first, confirm fail)

- [ ] T004 [P] Write test `tests/components/features/legends/LegendCard.test.tsx` — assert renders player name, nation, era label; assert gradient fallback renders when photo is undefined
- [ ] T005 [P] Write test `tests/components/features/hero/HeroSection.test.tsx` — update to assert hero img tag with src="/images/hero-bg.jpg" is present; assert no more than 3 direct child content zones

---

## Phase 3: Hero Redesign (US1 — P1)

- [ ] T006 Extract animated stats block from `HeroSection.tsx` into new `src/components/features/hero/TournamentStats.tsx` — renders 5 `AnimatedStat` items in a full-width dark strip
- [ ] T007 Rewrite `src/components/features/hero/HeroSection.tsx`:
  - Add `<img src="/images/hero-bg.jpg" ... loading="eager" fetchPriority="high">` as absolute background
  - Add dark gradient overlay `from-neutral-950/80 via-neutral-950/50 to-neutral-950`
  - Remove: particle canvas, grid overlay, character-by-character splits, host nation pills, stat counters, small soccer ball
  - Keep: single `<h1>` "FIFA WORLD CUP 2026" in Bebas Neue, 1 subtitle line (dates + hosts), scroll cue, 1 floating soccer ball (right edge, smaller: 120px)
- [ ] T008 Add `<TournamentStats />` in `src/App.tsx` immediately after `<HeroSection />`

---

## Phase 4: Legends Section (US2 — P2)

- [ ] T009 [P] Create `src/components/features/legends/LegendCard.tsx` — props: `legend`, `featured`, `index`; featured card: full photo fill (or gradient fallback) with overlay, name in Bebas Neue display size, nation + flag, era badge; non-featured: photo top 55% + content below; `whileHover` photo scale 1.05
- [ ] T010 Create `src/components/features/legends/LegendsSection.tsx` — `SectionWrapper id="legends"`; `SectionHeading` eyebrow="The Greats" title="Legends of the Game"; asymmetric desktop layout: first card `featured` spans 2 cols, remaining 4 in 2×2 beside it via CSS grid `grid-cols-3`; imports LEGENDS data
- [ ] T011 Insert `<LegendsSection />` between `<ImpactSection />` and `<FactsSection />` in `src/App.tsx`; add `{ id: 'legends', label: 'Legends' }` to `NAV_SECTIONS` in `Navbar.tsx`

---

## Phase 5: Nostalgia Photo Integration (US3 — P2)

- [ ] T012 Update `src/components/features/nostalgia/MomentCard.tsx` — add photo display: when `moment.photo` exists, render `<img>` in top portion of card with luminosity blend + dark overlay; when absent, render gradient background with year in large Oswald gold

---

## Phase 6: Breathing Room Audit (US4 — P1)

- [ ] T013 Update `src/components/layout/SectionWrapper.tsx`: `py-24 md:py-32` → `py-32 md:py-40`
- [ ] T014 [P] Update `src/components/ui/SectionHeading.tsx`: `mb-16` → `mb-20`
- [ ] T015 [P] Audit all cards (GroupCard, VenueCard, FactCard, ImpactStoryCard, MomentCard) — ensure each has at least `p-6` inner padding; fix any that are `p-4` or `p-5`

---

## Phase 7: Polish & Validate

- [ ] T016 Run `npm run test:run` — fix any failing tests
- [ ] T017 Run `npm run build` — fix any TypeScript errors
- [ ] T018 [P] Verify at 375px viewport: no horizontal overflow, hero photo visible, legends section single-column
- [ ] T019 [P] Verify gradient fallbacks render for Zidane, Klose, Yashin legend cards (no broken images)

---

## Dependencies

- T001 before T002, T003, T004, T009
- T004, T005 (tests) before T006, T007, T009
- T006 before T007, T008
- T009 before T010
- T010, T011 can run in parallel after T009
- T012 after T001, T003
- T013–T015 fully parallel, no dependencies
- T016–T019 after all implementation tasks
