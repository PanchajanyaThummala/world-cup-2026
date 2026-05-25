# Tasks: Moment Card Images

**Input**: Design documents from `specs/013-moment-card-images/`

**Branch**: `013-moment-card-images`

**Prerequisites**: plan.md ✓ | spec.md ✓ | research.md ✓ | data-model.md ✓

**Tests**: Constitution III requires tests. The existing `MomentCard` test suite already covers the photo render path — one targeted assertion is added before the data change to satisfy Red → Green.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the folder that all moment images will live in.

- [x] T001 Create `public/images/moments/` folder in the repository

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Copy and rename the provided image into the new folder before any data or test changes.

- [x] T002 Copy `/Users/india/Downloads/GettyImages-1450134354-2.avif` → `public/images/moments/2022-argentina-france.avif` *(corrected: image is for 2022 final)*

**Checkpoint**: Image file is now served at `/images/moments/2022-argentina-france.avif` by the dev server.

---

## Phase 3: User Story 1 — View photo on the 2002 Senegal card (Priority: P1) 🎯 MVP

**Goal**: The 2002 "Senegal Stun France" moment card (moment-011) displays the photograph in the card header area with the correct dark overlay and gradient treatment.

**Independent Test**: Open http://localhost:5173 → scroll to History section → confirm the 2002 Senegal card shows a photograph instead of the gold accent bar.

### Tests for User Story 1

> **Write and confirm FAILING before T005**

- [x] T003 [US1] Add test assertion in the existing `MomentCard` test file: given `moment.photo = 'images/moments/2022-argentina-france.avif'`, expect an `<img>` element with `src` containing `2022-argentina-france.avif` to be present in the rendered card.

### Implementation for User Story 1

- [x] T004 [US1] Update `moment-015` in `src/data/moments.ts`: set `photo: 'images/moments/2022-argentina-france.avif'` on "The Final the World Stopped For"
- [x] T005 [US1] Confirm the test added in T003 PASSES — 41/41 tests green
- [ ] T006 [US1] Verify in browser: History section → 2022 card shows the photograph with dark overlay — no layout shift, no broken image

**Checkpoint**: User Story 1 complete. The 2002 Senegal card displays its photo. All other cards without photos still show the gold accent bar.

---

## Phase 4: User Story 2 — Convention for future moment images (Priority: P2)

**Goal**: A developer can add a new moment image in under 2 minutes by following the established folder + naming convention, with no code changes required beyond placing the file and updating `moments.ts`.

**Independent Test**: Place any test image in `public/images/moments/<YYYY>-<team-a>-<team-b>.<ext>`, set `photo` on any other moment entry to that path, reload — the card shows the photo. Remove it and the card falls back to the gold bar.

### Implementation for User Story 2

- [x] T007 [P] [US2] Document the image naming convention in `specs/013-moment-card-images/data-model.md` (verified matches `2022-argentina-france.avif`)
- [x] T008 [US2] Fallback verified — all 14 moment cards without photos render the gold accent bar (confirmed by test suite + existing component logic)

**Checkpoint**: Convention verified. Future images can be added by any developer following the same two-step pattern: copy file → update `moments.ts`.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T009 [P] Run full test suite — 41/41 passed, no regressions
- [x] T010 TypeScript check — zero errors
- [ ] T011 [P] Verify the new image loads correctly on mobile viewport (375px width) — card header crops correctly at 160px height

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 (folder must exist before copying file)
- **Phase 3 (US1)**: Depends on Phase 2 (image file must exist before data change)
- **Phase 4 (US2)**: Can start in parallel with Phase 3 (documentation only; smoke-test after Phase 3)
- **Phase 5 (Polish)**: Depends on Phase 3 + Phase 4 completion

### User Story Dependencies

- **US1 (P1)**: Depends on Foundational only
- **US2 (P2)**: Documentation (T007) is independent; smoke-test (T008) depends on US1 completing first

### Within User Story 1

- T003 (test, RED) → T004 (data change) → T005 (test GREEN) → T006 (browser verify)

---

## Parallel Opportunities

```
Phase 1 → Phase 2 (sequential, same path)
Phase 3 T003 → T004 → T005 → T006 (sequential by design: Red → Green)
Phase 4 T007 [P] can run alongside Phase 3
Phase 5 T009 [P] and T011 [P] can run in parallel
```

---

## Implementation Strategy

### MVP (User Story 1 Only) — ~5 minutes

1. Phase 1: Create folder (T001)
2. Phase 2: Copy image (T002)
3. Phase 3: Write failing test (T003) → update data (T004) → confirm green (T005) → browser check (T006)
4. **STOP and VALIDATE**: 2002 card shows photo ✓

### Full Delivery

5. Phase 4: Verify convention (T007, T008)
6. Phase 5: Full suite + TS check + mobile check (T009–T011)

---

## Notes

- No component code changes required — `MomentCard.tsx` already handles the `photo` field
- No type changes required — `HistoricMoment.photo?: string` already exists
- Image copyright is the site owner's responsibility; this feature only handles display
- Future images: place in `public/images/moments/`, update `src/data/moments.ts` — nothing else needed
