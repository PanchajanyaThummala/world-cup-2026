# Research: Fix Padding & Layout

**Date**: 2026-05-14

---

## Decision 1: Single Gutter Token vs Per-Container Padding

**Decision**: CSS custom property `--gutter-x` defined at `:root`, scoped per breakpoint.

**Rationale**: Single source of truth. Any future change is one line. Tailwind's `px-6` / `md:px-12` ad hoc usage causes the very inconsistency we're fixing.

**Alternatives**: Tailwind utility classes everywhere (current state — fragmented).

---

## Decision 2: Grid Equal-Height Strategy

**Decision**: `grid auto-rows-fr` on the Groups grid container + `h-full flex flex-col` on the cards.

**Rationale**: Auto-rows-fr (`fr` = fractional unit) makes every row share the height of the tallest cell in that row. Drops the need for fixed `min-h-*`, which was causing wasted whitespace.

**Alternatives**:
- Fixed `min-h`: causes whitespace
- CSS subgrid: better but inconsistent browser support pre-2024 (now fine in 2026, but auto-rows-fr is simpler)
- Flexbox with manual height matching: requires JS

---

## Decision 3: Mobile Nav Pattern

**Decision**: Hamburger button at top-right, opens a fullscreen overlay panel sliding from right via Framer Motion. Closes on link click or backdrop tap.

**Rationale**: Standard, accessible, works without JS state libraries. Framer Motion `AnimatePresence` handles enter/exit cleanly.

**Alternatives**:
- Horizontal scroll on the nav: confusing, easy to miss items
- Bottom tab bar: doesn't fit a content-heavy site
- Collapsible dropdown from navbar: works but less spacious

---

## Decision 4: When to Show Gold Qualifier Treatment

**Decision**: Show gold treatment for top-2 rows only when `standings.some(s => s.mp > 0)` — i.e., after at least one match has been played in the group.

**Rationale**: Pre-tournament, all teams are at 0-0-0-0. Highlighting any row in gold is meaningless and misleading. The gold treatment should signify "based on current results, these teams are projected to qualify" — which is only true after results exist.

**Alternatives**:
- Always show top 2 in gold: misleading pre-tournament
- Never show in gold: loses useful info during tournament
- Show top 2 by FIFA ranking pre-tournament: inaccurate and arbitrary

---

## Decision 5: Countdown Banner Text Without Speculation

**Decision**: Replace `"Mexico v TBD · Estadio Azteca"` with `"Opening match · Mexico City"` — factual, no inferred opponent.

**Rationale**: FIFA has not yet drawn the second team for the opening match (per current public schedule). Displaying "v TBD" combined with the venue suggests an opponent slot exists in the schedule, which is misleading.

**Alternatives**:
- Empty: leaves dead space on the banner desktop
- Date detail only: "June 11, 2026 · 20:00 ET": adequate but redundant with the countdown itself
- Tournament tagline: "Football's biggest stage": good but disconnects from the kickoff context

---

## Decision 6: Desktop Breakpoint for Mobile Nav

**Decision**: Mobile nav appears at `<1024px` (Tailwind `lg`). Desktop nav appears at `≥1024px`.

**Rationale**: 8 inline nav items + logo + countdown context need ~1000px to breathe. At 1024px we have enough room; below that the hamburger pattern works better.

---

## Decision 7: Touch Target Size

**Decision**: All interactive elements have minimum 44×44px hit area (WCAG AAA).

**Rationale**: Industry standard. Cards already meet this naturally. Nav links and buttons need `min-h-[44px]` on mobile.
