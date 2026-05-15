# Specification: Acid Gold Colour System Redesign

**Feature Branch**: `010-acid-gold-redesign`  
**Created**: 2026-05-15  
**Status**: Ready for planning  

---

## Overview

Replace the current dark-navy/muted-gold colour scheme across the entire World Cup 2026 fan website with the Acid Gold system. The new palette uses a near-black warm canvas (`#050400`) with brilliant pure gold (`#FFD700`) as the dominant accent, delivering an editorial-minimalism aesthetic where every gold element pops against the pure black background with a confirmed 18.8:1 contrast ratio (WCAG AAA).

---

## User Scenarios & Testing

### User Story 1 - Unified Acid Gold Token Layer (Priority: P1)

As a first-time visitor, I see a unified visual identity across every section of the page — the background is warm near-black, accents are brilliant gold, and text is ivory white — so the site feels intentional and premium rather than patchy.

**Why this priority**: The token layer is the foundation that every other story depends on. Getting it right first makes all subsequent stories mechanical applies.

**Independent Test**: Open the site in a browser; every section background should be `#050400`, every gold accent `#FFD700`, every body text `#FFFFF0`. Run the existing 40 tests to confirm no regressions.

**Acceptance Scenarios**:

1. **Given** the site loads, **When** I inspect any section background, **Then** it shows the warm near-black `#050400`, not a cool-grey or navy.
2. **Given** any gold accent element (headline stroke, stat number, nav active link), **When** I check its colour, **Then** it is pure `#FFD700`, not muted `#C9A84C`.
3. **Given** any body paragraph, **When** I check its colour, **Then** it is ivory `#FFFFF0`, not pure white `#FFFFFF`.
4. **Given** a card component, **When** I inspect its background, **Then** it uses surface token `#0A0800`, distinct from the page background `#050400`.

---

### User Story 2 - Section-by-Section Palette Application (Priority: P1)

As a visitor scrolling top-to-bottom, every section — hero, stats strip, navbar, countdown banner, groups, venues, nostalgia, impact stories, legends, facts, bracket, footer — renders in the Acid Gold palette with zero remnants of the old scheme.

**Why this priority**: Consistency across sections is what makes the redesign feel complete. A single un-updated section breaks the editorial feel.

**Independent Test**: Visually audit each of the 10+ sections top-to-bottom; no old muted gold (`#C9A84C`), no cool-dark backgrounds (`#080A0F`), no grey text.

**Acceptance Scenarios**:

1. **Given** the hero section, **When** rendered, **Then** the gradient overlays use Acid Gold tokens and the text is ivory.
2. **Given** the countdown banner, **When** time units are displayed, **Then** the number figures use `#FFD700`.
3. **Given** the group standings table, **When** the tournament has started (mp > 0), **Then** the top-2 qualifying rows have a subtle gold-tinted background.
4. **Given** any card type (GroupCard, VenueCard, FactCard, etc.), **When** rendered, **Then** the background uses the surface token and the border is a subtle gold.
5. **Given** the footer, **When** rendered, **Then** text and background use palette tokens.

---

### User Story 3 - Editorial Motion & Touch Standards (Priority: P2)

As a visitor, hover interactions feel instant and physical — cards lift slightly with a gold border glow in under 300ms — and the site is fully usable if I have reduced-motion enabled in my OS.

**Why this priority**: Motion quality is a perceived quality signal. Reduced-motion support is an accessibility requirement.

**Independent Test**: Enable `prefers-reduced-motion: reduce` in OS settings and verify all interactions remain functional with no animations. Disable it and verify card hover completes within 300ms.

**Acceptance Scenarios**:

1. **Given** a card component, **When** I hover over it, **Then** it scales to 1.02 and its border transitions to `#FFD700` within 150–300ms.
2. **Given** `prefers-reduced-motion: reduce` is active, **When** I hover over a card, **Then** no scale or transition plays, but the hover border colour still changes instantaneously.
3. **Given** any button or nav link, **When** I check its clickable area, **Then** the hit target is at least 44×44px.
4. **Given** any icon used for navigation or structure, **When** I inspect the DOM, **Then** it is an SVG element, not an emoji character.

---

### Edge Cases

- What happens when a group has 0 matches played? → Top-2 rows show NO gold highlight (only apply after mp > 0).
- What if a CSS custom property is missing? → Component falls back to the token default; no blank/invisible elements.
- What if the user has both `prefers-reduced-motion` and a slow device? → Zero transition cost; state changes are instant.

---

## Requirements

### Functional Requirements

- **FR-001**: CSS MUST define Acid Gold colour tokens as custom properties: `--color-bg-base: #050400`, `--color-bg-surface: #0A0800`, `--color-primary: #FFD700`, `--color-text-primary: #FFFFF0`, `--color-text-secondary: #8B7A00`, `--color-border: rgba(255,215,0,0.15)`, `--color-border-hover: #FFD700`.
- **FR-002**: All components MUST reference colour tokens via CSS custom properties, not hard-coded hex values.
- **FR-003**: The Card primitive MUST apply surface background, subtle gold border, and a hover state that brightens the border to `--color-border-hover` within 150–300ms.
- **FR-004**: The StandingsTable MUST apply a gold-tinted row background (`rgba(255,215,0,0.08)`) to the top-2 rows only when the group has at least 1 match played.
- **FR-005**: A `@media (prefers-reduced-motion: reduce)` block MUST set `transition: none` and `animation: none` on all animated elements.
- **FR-006**: All interactive elements (buttons, nav links, card hover targets) MUST have a minimum touch area of 44×44px.
- **FR-007**: No emoji characters MUST be used as structural or navigational icons; SVG icons are required.
- **FR-008**: All existing automated tests (currently 40) MUST continue to pass after the colour changes.

### Key Entities

- **Colour Token Set**: The seven CSS custom properties defining the Acid Gold palette, declared in `globals.css` and consumed by all components.
- **Card Primitive**: `src/components/ui/Card.tsx` — the shared surface used by GroupCard, VenueCard, MomentCard, ImpactStoryCard, LegendCard, FactCard, BracketSlot.
- **Section Wrappers**: Background containers for each of the 10+ named sections on the page.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Zero instances of old colour values (`#C9A84C`, `#080A0F`, `#0D1117`, `#161B26`) remain in any rendered component after the redesign.
- **SC-002**: All 40 automated tests pass without modification.
- **SC-003**: Every gold-on-dark colour pair achieves ≥ 18:1 contrast ratio (WCAG AAA), verifiable with a browser contrast tool.
- **SC-004**: All hover/focus transitions on cards and buttons complete within ≤ 300ms on a standard laptop browser.
- **SC-005**: With `prefers-reduced-motion: reduce` active, the site remains fully navigable with no broken or invisible interactive states.
- **SC-006**: No emoji characters appear in the DOM as structural or navigational elements.

---

## Assumptions

- Fonts (Bebas Neue, Inter, Oswald) are unchanged — this is a colour-only redesign.
- Layout, spacing, and component structure remain unchanged.
- The site is dark-mode only; no light-mode variant is in scope.
- The 40 existing tests cover component rendering; colour assertions are out of scope for those tests (no test modifications needed).
- Tailwind v4 CSS variable integration allows `bg-[var(--color-bg-base)]` syntax without config changes.
- Framer Motion animation durations will be tuned in-place within existing animation objects; no new dependencies required.
