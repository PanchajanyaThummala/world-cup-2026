# Implementation Plan: Card & Tile Audit

**Branch**: `006-card-audit-cleanup` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)

---

## Summary

Audit every card component and apply structural fixes per spec: replace fixed heights with min-height, manage overflow safely, enforce generous padding, establish 3-tier typography hierarchy, restructure venue/timeline/group/impact cards. Colors, fonts, and overall section layout remain unchanged. This is a polish pass — not a redesign.

---

## Technical Context

**Language/Version**: TypeScript 6.0.3 + React 19.2.6 (existing)
**Primary Dependencies**: Framer Motion 12, Tailwind v4, Vite 8 (no new packages)
**Storage**: N/A
**Testing**: Vitest + RTL (40-test baseline must continue passing)
**Constraints**: No color/font/layout changes; structural only

---

## Constitution Check

- [x] I — Fan Experience: Fixing clipping directly improves perceived quality
- [x] II — Component-Driven: All edits scoped to existing card components
- [x] III — Test-First: 40 existing tests guard against regression
- [x] IV — Performance: CSS-only changes, no new JS
- [x] V — Simplicity: No new components, no new state
- [x] VI — Dependency Vetting: No new packages — N/A

---

## Current State Audit

Card files inventory + identified issues:

| Component | Current Issue | Fix |
|-----------|---------------|-----|
| `Card.tsx` (primitive) | `overflow-hidden` on wrapper OK for rounded corners; padding determined by caller | Add content `position: relative; z-index: 1` to ensure layering safety |
| `GroupCard.tsx` | Group letter only 30px Bebas; standings rows compact | Bump letter to 32px; row padding already 10px (OK after T013 in 005); add subtle row borders |
| `VenueCard.tsx` | `min-h-[200px]` causes dead whitespace on short cards | Drop fixed min-h; layout already restructured by 005 work |
| `FactCard.tsx` | `h-full` for grid alignment; OK | No changes needed (already 24px padding, OK) |
| `ImpactStoryCard.tsx` | `overflow-hidden` clips category badge on long titles in narrow columns | Add `min-width: 0` on grid children; ensure content layer z-index above accent bar |
| `MomentCard.tsx` | `overflow-hidden` on outer; photo strip `h-40 overflow-hidden`; significance line clipped if body is long | Remove outer overflow-hidden; add top border + padding-top to significance line; ensure year fallback watermark z-index 0 |
| `LegendCard.tsx` | `overflow-hidden` + abs-positioned bg image; content layer absolute z-index undefined | Explicit content `z-index: 1`; bg image stays z-0 |
| `BracketSlot.tsx` | Empty state has fixed `minHeight: 72`; OK; filled state has no min — `overflow-hidden` only for inner row separator | Add min-height to filled state; keep overflow for rounded corners |

---

## Files to Update

```
src/components/ui/Card.tsx                                ← add content layer pattern
src/components/features/groups/GroupCard.tsx              ← group letter 32px; row borders via table
src/components/features/groups/StandingsTable.tsx         ← row bottom-border, brighter top-2
src/components/features/venues/VenueCard.tsx              ← drop fixed min-h
src/components/features/nostalgia/MomentCard.tsx          ← outer overflow-visible; significance separator
src/components/features/impact/ImpactStoryCard.tsx        ← z-index content; min-w-0
src/components/features/impact/ImpactSection.tsx          ← min-w-0 grid children
src/components/features/legends/LegendCard.tsx            ← z-index content layer
src/components/features/bracket/BracketSlot.tsx           ← filled-state min-height
src/components/features/groups/GroupsSection.tsx          ← gap-4 → gap-8 (32px)
src/components/features/venues/VenuesSection.tsx          ← gap-4 → gap-8
src/components/features/impact/ImpactSection.tsx          ← gap-6 → gap-8
src/components/features/facts/FactsSection.tsx            ← gap-5 → gap-8
src/components/features/bracket/BracketSection.tsx        ← gap-4 → gap-8
src/components/features/legends/LegendsSection.tsx        ← gap-4 → gap-8
```

## Files to Create

None — pure refactor.

---

## Design Decisions

### Overflow Management
- `Card.tsx` keeps `overflow: hidden` on the outer wrapper to clip its rounded corners with the glass border — but its child content is always `position: relative; z-index: 1` to render above decorative inner elements
- `MomentCard` outer wrapper drops `overflow: hidden` — the photo header has its own `overflow-hidden` scope, but the card body must NOT clip the significance line
- `LegendCard` keeps `overflow: hidden` (needed for absolute photo bg); content layer explicit z-index 1
- `ImpactStoryCard` keeps `overflow: hidden` (needed for absolute accent bar); content layer z-index 1

### Height Strategy
- Use `min-h-[Xpx]` where a floor is genuinely useful (BracketSlot empty state)
- Use `h-full` only where required for `auto-rows-fr` grid behavior (already in place)
- Drop fixed `min-h` on cards where content alone determines height (VenueCard)
- Never use raw `height: Xpx` on cards

### Padding Tiers
- Card outer container: 24px (`p-6`) baseline
- Editorial card (ImpactStoryCard): 28px (`p-7`) for larger emphasis
- Table cell vertical padding: 12px (`py-3`) — bumped from `py-2.5`

### Typography Hierarchy
Three tiers enforced everywhere:
- **Primary value** (number, year, label): `Oswald 600 ~24-40px gold-400` (already in use)
- **Secondary label**: `Inter 700 11px uppercase letter-spacing:0.1em neutral-500`
- **Body**: `Inter 400 13-14px line-height:1.65 neutral-400`

This is already the case in most cards from features 003 and 004 — verifying compliance card by card during implementation.

### Grid Gaps
Section grids bumped from `gap-4` (16px) to `gap-8` (32px). This is the only "layout-affecting" change and is explicitly required by the spec (FR-005).

### Significance Line Separator (MomentCard)
The italic significance line at the bottom gets:
```tsx
<p className="pt-3 mt-3 text-xs italic" style={{ borderTop: '1px solid rgba(31,41,55,0.6)' }}>
```
This guarantees a visible separator regardless of body length.

### Year Watermark Z-Index
The current MomentCard renders a gradient fallback header with a large faint year. Content rendered below it is in document flow already, so no z-index conflict exists. The watermark is in its own header strip — not behind the content. Verification: spot-check in dev tools.

### Group Letter Anchor
Current: `text-3xl` Bebas Neue (~30px). Bump to `text-4xl` (36px) but reading the spec — `28–32px` is the floor. Will set explicit `fontSize: 32`.

### Brighter Top-2 (Post-Kickoff)
Already implemented in 005: `text-neutral-50` on top-2 vs `text-neutral-300` on positions 3–4 when `tournamentStarted`. No change needed.

### Impact Card Grid `min-width: 0`
CSS grid children default to `min-width: auto` which can prevent shrinking. Add `min-w-0` to each grid item OR `min-w-0` on the inner `motion.div` wrapper in `ImpactStoryCard`.

---

## Phase 0 Research

See [research.md](./research.md).

## Phase 1 Contracts

See [contracts/component-contracts.md](./contracts/component-contracts.md).
