---
description: "Card & tile audit — remove fixed heights, fix overflow, generous padding, typography hierarchy, restructure venue/timeline/group/impact cards"
---

# Tasks: Card & Tile Audit — Heights, Padding, Hierarchy

**Branch**: `006-card-audit-cleanup`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ contracts/ ✅

---

## Phase 1: Setup

- [x] T0\1 Run audit grep on `src/components/features/**/*.tsx` and `src/components/ui/Card.tsx` — confirm initial state matches plan audit table (no surprise card files)

---

## Phase 2: Foundational — Card Primitive

- [x] T0\1 Update `src/components/ui/Card.tsx` — wrap children in `<div style={{ position: 'relative', zIndex: 1 }}>...</div>` so card content always renders above decorative absolute elements

---

## Phase 3: User Story 1 — Cards Never Clip Content (P1) 🎯 MVP

**Goal**: No clipping anywhere; cards grow to fit content.

**Independent Test**: Inspect every card — no clipped text, no overflow scrollbars.

- [x] T0\1 [US1] Update `src/components/features/nostalgia/MomentCard.tsx` — remove `overflow: hidden` from the outer `motion.div` wrapper (keep it ONLY on the inner photo header `<div className="relative h-40 overflow-hidden">`)
- [x] T0\1 [P] [US1] Update `src/components/features/legends/LegendCard.tsx` — ensure content overlay `<div className="absolute inset-0 ...">` has explicit `z-10` class (currently no z-index)
- [x] T0\1 [P] [US1] Update `src/components/features/impact/ImpactStoryCard.tsx` — wrap inner content (badges + h3 + p) in `<div className="relative z-10">...</div>` to render above the accent bar
- [x] T0\1 [P] [US1] Update `src/components/features/venues/VenueCard.tsx` — remove `min-h-[200px]` so card height is content-driven

**Checkpoint**: Visual scroll-through — no clipping anywhere.

---

## Phase 4: User Story 2 — Generous Consistent Padding (P1)

**Goal**: All cards have ≥24px inner padding; row padding 10–12px; grid gaps ≥32px.

**Independent Test**: DevTools inspection of any card shows padding ≥24px on all 4 sides; row vertical padding ≥10px; grid gap ≥32px.

- [x] T0\1 [US2] Update `src/components/features/groups/StandingsTable.tsx` — change row padding from `py-2.5` to `py-3` (12px); change border opacity from `/30` to `/40` for slightly clearer row separators
- [x] T0\1 [P] [US2] Update `src/components/features/groups/GroupsSection.tsx` — grid `gap-4` → `gap-8` (32px)
- [x] T0\1 [P] [US2] Update `src/components/features/venues/VenuesSection.tsx` — both grid gaps `gap-4` → `gap-8`
- [x] T0\1 [P] [US2] Update `src/components/features/impact/ImpactSection.tsx` — grid `gap-6` → `gap-8`
- [x] T0\1 [P] [US2] Update `src/components/features/facts/FactsSection.tsx` — grid `gap-5` → `gap-8`
- [x] T0\1 [P] [US2] Update `src/components/features/bracket/BracketSection.tsx` — inner groups grid `gap-4` → `gap-8`
- [x] T0\1 [P] [US2] Update `src/components/features/legends/LegendsSection.tsx` — grid `gap-4` → `gap-8`

**Checkpoint**: Visual scroll-through — every section breathes.

---

## Phase 5: User Story 3 — Typography Hierarchy (P1)

**Goal**: 3-tier hierarchy enforced on every card.

**Independent Test**: On any card, identify 3 distinct text styles: primary value (large bold gold), secondary label (10–11px uppercase tracked muted), body (13–14px line-height 1.65).

- [x] T0\1 [US3] Audit `src/components/features/facts/FactCard.tsx` — confirm hook is `text-lg font-bold neutral-50`; supporting body is `text-sm leading-relaxed neutral-400`; category badge uppercase. Set body line-height to `1.65` via `leading-[1.65]` if not present
- [x] T0\1 [P] [US3] Audit `src/components/features/impact/ImpactStoryCard.tsx` — confirm title `text-xl bold neutral-50`; narrative `text-sm leading-relaxed neutral-400`; era/category badge labels uppercase
- [x] T0\1 [P] [US3] Audit `src/components/features/nostalgia/MomentCard.tsx` — year stat (`Oswald 4xl gold-400`); title body `text-xl bold neutral-50`; narrative `text-sm leading-relaxed neutral-400`; significance `text-xs italic neutral-600`

**Checkpoint**: Hierarchy passes 3-style identification test.

---

## Phase 6: User Story 4 — Venue Cards Restructured (P2)

**Goal**: country badge → name + location → divider → capacity. No dead whitespace.

**Independent Test**: Every venue card has the 4-zone structure; cards with minimal content have no trailing whitespace.

- [x] T0\1 [US4] Update `src/components/features/venues/VenueCard.tsx` — ensure the card structure flows: (1) country eyebrow row, (2) venue name + city block, (3) `<div>` divider via top border, (4) capacity row. Drop `mt-auto` on the capacity row (no forced bottom alignment) so the divider is positioned by content order, not pushed down by spacer. Verify Final/Opening badge stays absolutely positioned

**Checkpoint**: Open Venues — cards end at content, no dead space below capacity.

---

## Phase 7: User Story 5 — Timeline Cards Show Significance Line (P2)

**Goal**: Significance line always visible; year watermark behind content correctly.

**Independent Test**: Every nostalgia card shows the italic significance line; year text never overlaps content.

- [x] T0\1 [US5] Update `src/components/features/nostalgia/MomentCard.tsx`:
  - Significance line wrapper: `<p className="text-neutral-600 text-xs italic leading-relaxed mt-4 pt-4" style={{ borderTop: '1px solid rgba(31,41,55,0.6)' }}>`
  - Remove the old `pl-4 border-l-2` styling
  - Photo header `h-40 overflow-hidden` → keep but ensure year fallback strip has `position: relative` and inner year text gets `z-0`; content body sits at default doc flow (z auto, above the fallback header strip naturally)

**Checkpoint**: Every nostalgia card shows the italic line visibly separated from the body.

---

## Phase 8: User Story 6 — Group Cards Rhythm + Anchor (P2)

**Goal**: 32px group letter; subtle row borders; brighter top-2 post-kickoff (already in 005).

**Independent Test**: Group letter measures ~32px; rows have visible bottom border; standings cells have ≥12px vertical padding.

- [x] T0\1 [US6] Update `src/components/features/groups/GroupCard.tsx` — bump group letter inline style `fontSize: 32`; ensure `Bebas Neue` font and `gold-400` color preserved
- [x] T0\1 [US6] Verify `src/components/features/groups/StandingsTable.tsx` already has bottom borders + py-3 from T007

**Checkpoint**: Group cards have a strong visual anchor and breathable rows.

---

## Phase 9: User Story 7 — Impact Cards Don't Clip Tags (P2)

**Goal**: Category tags always fully visible; grid children can shrink properly.

**Independent Test**: At any viewport (1440 → 375), Impact section right-column cards show their category badges intact.

- [x] T0\1 [US7] Update `src/components/features/impact/ImpactStoryCard.tsx` — add `min-w-0` to the outermost `motion.div` className so the grid item can shrink below its intrinsic content width
- [x] T0\1 [P] [US7] Apply `min-w-0` to grid item wrappers in `ImpactSection.tsx` if any wrapper layer exists between grid and card (verify on inspection)

**Checkpoint**: Impact section at 1024px shows all 8 category badges intact.

---

## Phase 10: User Story 8 — No Hardcoded Fixed Heights (P3)

**Goal**: Zero `height: Xpx` on card components.

**Independent Test**: Code grep for `height:` with numeric px returns no matches in card files (excluding photo strips and decorative bg images).

- [x] T0\1 [US8] Final grep audit: `grep -rn "height: " src/components/features/ src/components/ui/Card.tsx | grep -v "object-cover\|absolute\|aspect-"`. Confirm only photo/decorative usage remains; flag any remaining card-container height for conversion

**Checkpoint**: No hardcoded `height: Xpx` on card containers.

---

## Phase 11: Polish & Validate

- [ ] T024 Run `npm run build` — fix any TypeScript errors
- [ ] T025 Run `npm run test:run` — fix any test failures
- [ ] T026 [P] Update `CHANGELOG.md` — add `[0.6.0]` entry (also include the unmerged 0.5.0 padding fixes since they're bundled in this branch)
- [ ] T027 Commit + push `006-card-audit-cleanup` branch to GitHub

---

## Dependencies

- T001 → T002 (foundational primitive update unlocks others)
- T002 → T003–T006 (US1 cards use Card primitive content layer)
- T007 → T008–T013 (table padding before grid gaps is logical but independent)
- T017 depends on US1 fixes
- T018 depends on US1 (MomentCard overflow removal)
- T019 → T020 (table changes before letter change)
- T021, T022 independent
- T023 audit comes last
- T024–T027 polish

---

## Parallel Opportunities

- T004, T005, T006 — US1 different card files
- T008, T009, T010, T011, T012, T013 — grid gap changes in different section files
- T015, T016 — US3 audits in different files
- T024 ↔ T026 — build + changelog parallel

---

## MVP

**MVP = US1 + US2** (T001–T013) — eliminates all clipping and applies generous padding. Total 13 tasks.

**Full feature** = all 8 user stories = T001–T027. **Total: 27 tasks.**
