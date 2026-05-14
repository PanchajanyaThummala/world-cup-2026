# Component Contracts: Card Audit

No new components. Behavioral contracts for updated components below.

## Card.tsx (primitive)
- Outer wrapper: `overflow: hidden` (kept for rounded glass corners)
- Children render in a `position: relative; z-index: 1` wrapper layer

## GroupCard
- Inner padding: `p-6` (24px)
- Group letter: `fontSize: 32`, Bebas Neue, gold-400, leading-none
- Wraps StandingsTable

## StandingsTable
- Row vertical padding: `py-3` (12px)
- Each `<tr>` has `border-b border-neutral-800/40` (subtle separator)
- Top-2 rows (when `tournamentStarted`): `text-neutral-50` + gold tint background; positions 3–4: `text-neutral-300`

## VenueCard
- No fixed `min-h`; content drives height
- Layout: country badge → name + city → divider → capacity
- Outer padding: `p-6`

## MomentCard
- Outer wrapper: NO `overflow: hidden` (drop it)
- Photo header (if photo): its own `overflow: hidden` scope
- Significance line: `mt-4 pt-4 border-t border-neutral-800/60 text-xs italic`
- Card body padding: `p-6`

## ImpactStoryCard
- Outer: `overflow: hidden` (kept for accent bar)
- Content wrapper: `position: relative; z-index: 1`
- Outer wrapper class includes `min-w-0` to allow grid shrinking
- Padding: `p-7` (28px)

## LegendCard
- Outer: `overflow: hidden` (kept for photo bg)
- Content overlay: `position: absolute inset-0` already; ensure `z-10` class
- Padding inside content overlay: `p-7` (28px)

## BracketSlot
- Filled state: `min-height: 72px`
- Empty state: `min-height: 72px` (already set)

## Section Grids
- All card grids use `gap-8` (32px) — bumped from `gap-4/5/6`
- All grid items wrap card in container with `min-w-0` class
