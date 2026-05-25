# Implementation Plan: Moment Card Images

**Branch**: `013-moment-card-images` | **Date**: 2026-05-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/013-moment-card-images/spec.md`

## Summary

Create `public/images/moments/` as the canonical folder for historic moment photographs. Copy the provided Getty image for the 2002 Senegal vs France moment and map it to `moment-011` in the data file. No new component code is needed — `MomentCard.tsx` already renders photos correctly. The only deliverables are: folder creation, image copy + rename, and a one-line data change.

## Technical Context

**Language/Version**: TypeScript 6 — strict mode

**Primary Dependencies**: React 19, Framer Motion 12, Vite 8 (static asset serving from `public/`)

**Storage**: Static files — images served directly from `public/images/moments/` by Vite's dev server and production build

**Testing**: Vitest + React Testing Library — existing test for `MomentCard` covers the photo render path

**Target Platform**: Web (desktop + mobile) — modern browsers, all supporting AVIF

**Performance Goals**: LCP ≤ 2.5s (Constitution IV) — image must have explicit width/height and loading="lazy"

**Constraints**: CLS ≤ 0.1 — card header has fixed 160px height; image must not shift layout on load

**Scale/Scope**: 1 image now; folder pattern supports up to 16 (one per moment)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Component is self-contained with TypeScript props** (Principle II) — `MomentCard` already typed; no new component; data change only
- [x] **Test written and failing before implementation** (Principle III) — existing MomentCard test covers the photo path; will add one assertion for `images/moments/` path before changing data
- [x] **Animation uses transform/opacity only** (Principle IV) — no new animations; existing card hover unchanged
- [x] **Design tokens used — no hardcoded hex values** (Design System) — no styling changes
- [x] **No implementation detail in spec.md** (Workflow) — spec is technology-agnostic ✓

All gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/013-moment-card-images/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md             ← Phase 2 output (/speckit-tasks)
```

### Source Code

```text
public/
└── images/
    └── moments/                         ← NEW folder
        └── 2002-senegal-france.avif     ← NEW (copied + renamed from Downloads)

src/
└── data/
    └── moments.ts                       ← CHANGE: moment-011 photo field
```

No component or type changes required.

## Phase 0: Research

See [research.md](./research.md).

## Phase 1: Design

### Data model

No schema changes. `HistoricMoment.photo?: string` already exists and is already rendered by `MomentCard`. The value is a path relative to the site root, e.g. `images/moments/2002-senegal-france.avif`.

### Image naming convention

```
public/images/moments/<YYYY>-<team-a>-<team-b>.<ext>
```

Examples:
- `2002-senegal-france.avif`
- `1986-argentina-england.jpg`
- `2022-argentina-france.jpg`

### Implementation steps (for `/speckit-tasks`)

1. Create `public/images/moments/` folder
2. Copy `/Users/india/Downloads/GettyImages-1450134354-2.avif` → `public/images/moments/2002-senegal-france.avif`
3. Update `moment-011` in `src/data/moments.ts`: set `photo: 'images/moments/2002-senegal-france.avif'`
4. Verify in browser: History section → 2002 card shows photo
5. Verify no regression: all other cards without photos show gold accent bar
