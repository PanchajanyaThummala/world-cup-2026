# Specification: Premium Design Revamp

**Feature Branch**: `011-premium-design-revamp`
**Created**: 2026-05-15
**Status**: Ready for planning

## Overview

Transform the World Cup 2026 fan site from a clean but flat dark site into a cinematic, editorial-grade premium experience. The aesthetic target is Nike/ESPN+/Adidas campaign quality — every section animated with intent, every surface textured with depth, every interaction physical and spring-like. Acid Gold colour tokens remain unchanged.

## User Scenarios & Testing

### User Story 1 — Cinematic Hero Entry (P1)

**Acceptance Scenarios**:
1. Hero headline "WORLD CUP" reveals character-by-character with 30ms stagger per letter on mount.
2. Background image parallaxes at 20% scroll speed; content at 30%.
3. "WORLD CUP" text has an animated gold shimmer on a 4s loop.

### User Story 2 — Premium Section Depth (P1)

**Acceptance Scenarios**:
1. Each section has a subtle radial warm-gold light source (4-8% opacity) at top-left or top-right alternating.
2. Children stagger in with 80ms delays and spring physics (stiffness 300, damping 30) on viewport entry.
3. A 1px gold gradient line divides every section.

### User Story 3 — Glassmorphism Card System (P1)

**Acceptance Scenarios**:
1. Card background: `rgba(255,215,0,0.03)` + `backdrop-filter: blur(20px)` + top inner glow.
2. Card hover: border full gold, y: -6, scale: 1.02, inner glow appears, all within 200ms.
3. Mobile tap: scale: 0.98 press feedback.

### User Story 4 — Premium Standings Tables (P1)

**Acceptance Scenarios**:
1. Rank shown as a numbered circle badge (gold for top-2 when mp > 0, muted otherwise).
2. Top-2 qualifier rows: 3px gold left-border, gold background tint, gold Pts.
3. Table header: small-caps gold labels, hairline gold bottom border.

### User Story 5 — Shimmer & Motion Polish (P2)

**Acceptance Scenarios**:
1. Section eyebrow labels get an animated underline drawing left-to-right on viewport entry.
2. Hero CTA button has subtle magnetic cursor pull (max 6px offset) on hover.
3. All card stagger animations use spring physics, not linear easing.

### Edge Cases
- `prefers-reduced-motion`: all motion disabled, all colour/glass/glow states preserved.
- `backdrop-filter` unsupported: fallback to `rgba(10,8,0,0.9)` solid background.

## Requirements

- **FR-001**: "WORLD CUP" text animates character-by-character on hero mount.
- **FR-002**: Every section background has a radial gold gradient light source (alternating corners, 4-8% opacity).
- **FR-003**: Card primitive upgraded: blur(20px), rgba(255,215,0,0.03) bg, inner glow, gold border on hover.
- **FR-004**: StandingsTable rank shown as circle badge; top-2 rows get 3px gold left accent, gold pts.
- **FR-005**: Eyebrow labels have animated left-to-right underline on scroll entry.
- **FR-006**: Gold shimmer gradient animates across "WORLD CUP" hero text on 4s loop.
- **FR-007**: Section gold divider lines between every section.
- **FR-008**: All 40 existing tests must pass.

## Success Criteria

- **SC-001**: Every section visually richer than feature 010 — depth, light, texture visible.
- **SC-002**: 40/40 tests pass.
- **SC-003**: Hero entry completes within 2.5s at 60fps.
- **SC-004**: Card hover is smooth and immediate at 60fps.
- **SC-005**: Site fully usable with prefers-reduced-motion.

## Assumptions

- Framer Motion 12 already installed. No new npm deps.
- Acid Gold tokens (#050400, #FFD700, #FFFFF0) unchanged.
- Tailwind v4 in use throughout.
