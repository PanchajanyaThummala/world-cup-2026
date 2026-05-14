# Research: Card Audit

**Date**: 2026-05-14

---

## Decision 1: When to Keep `overflow: hidden`

**Decision**: Keep `overflow: hidden` only when a card has an absolutely-positioned decorative element (photo bg, gradient watermark, accent bar) that would otherwise spill past the rounded corners. In every other case, drop it.

**Rationale**: `overflow: hidden` is the common culprit for clipped text content. Used as default it's a foot-gun — used surgically where decorative elements truly need clipping it's necessary.

**Cards keeping overflow-hidden**:
- `Card.tsx` (primitive — its own border-radius needs to clip child glass effect)
- `LegendCard` (absolute photo bg)
- `ImpactStoryCard` (absolute accent bar)
- `BracketSlot` (rounded inner row separator)
- `MomentCard` photo header strip only (NOT the outer card)

**Cards dropping overflow-hidden**:
- `MomentCard` outer wrapper — content is text only, no decorative absolutes that need clipping

**Alternatives**:
- Drop `overflow: hidden` everywhere and use `clip-path: inset()` instead: more verbose, harder to maintain

---

## Decision 2: `min-height` vs `height` vs `h-full`

**Decision**: 
- Never use `height: Xpx` on card containers
- Use `min-height: Xpx` only when a true floor matters (BracketSlot empty state must look balanced even with minimal content)
- Use `h-full` when a card lives in a grid with `auto-rows-fr` and must stretch to fill the row's allocated height

**Rationale**: `auto-rows-fr` already gives us equal row heights for the cards we want aligned. `h-full` makes each card fill its allocated cell. `min-h` is the safety net. `height` is the bug.

---

## Decision 3: Padding Values

**Decision**:
- Outer card padding: `p-6` (24px) standard; `p-7` (28px) for editorial cards
- Table row vertical padding: `py-3` (12px)
- Grid gaps: `gap-8` (32px) for all card grids
- ListItem padding (legends content overlay): `p-7` (28px) — bumped from `p-6`

**Rationale**: 8px grid system; values must be multiples of 8 (or 4 for micro-tuning). 24/28/32 all comply.

---

## Decision 4: Content Layer Z-Index Pattern

**Decision**: Inside any card with absolute-positioned decorative elements, the content wrapper gets `position: relative; z-index: 1` explicitly. Decorative elements stay at `z-index: 0` (default).

**Rationale**: Removes ambiguity. Content always renders above decorations. Pattern is consistent across LegendCard, ImpactStoryCard, MomentCard photo header.

---

## Decision 5: Group Letter Sizing

**Decision**: 32px (`fontSize: 32`) with Bebas Neue weight 400, gold-400 color.

**Rationale**: Spec says 28–32px range. 32px gives the most visual anchor strength. Bebas Neue at 32px reads as bold without needing the 700 weight.

---

## Decision 6: Standings Row Separator

**Decision**: `border-b border-neutral-800/40` on every row (already in place from feature 005, just lighter opacity from `/30` → `/40` for slightly more visibility).

**Rationale**: 1px subtle border at 40% opacity is visible but not harsh — matches "subtle 1px" spec.

---

## Decision 7: Significance Line Always Visible

**Decision**: In MomentCard, the italic significance line wraps in its own container with:
```css
margin-top: 12px;
padding-top: 12px;
border-top: 1px solid rgba(31,41,55,0.6);
```

**Rationale**: Visual separator from the body narrative. Top border + padding ensures the eye recognizes it as a distinct emotional payoff.

Removing `overflow: hidden` from the outer MomentCard wrapper ensures it never gets clipped — the card grows to fit.

---

## Decision 8: `min-width: 0` on Grid Children

**Decision**: Add `min-w-0` to every `<motion.div>` that wraps a card directly inside a CSS grid (the cells).

**Rationale**: CSS Grid default `min-width: auto` prevents grid items from shrinking below their intrinsic content size — which is what causes long Badge text in narrow columns to push past the grid container. Setting `min-width: 0` allows the cell to shrink and the content to wrap or truncate as expected.

**Affected grids**: ImpactSection (2-col), FactsSection (3-col), LegendsSection (asymmetric 3-col), VenuesSection (4-col), GroupsSection (4-col), BracketSection inner (4-col).
