# Feature Specification: Palette Selection Demo

**Feature Branch**: `009-palette-demo`
**Created**: 2026-05-14
**Status**: Draft

---

## User Scenarios & Testing

### User Story 1 — Browse 5 Palette Options (P1)

The designer opens `/palette` in the browser and sees 5 complete palette previews side by side. Each preview shows: a mini hero section, a group standings card sample, and color swatches. The visual context is enough to feel the personality of each palette without imagining it.

**Acceptance Scenarios**:
1. Opening `/palette` shows 5 named palette cards visible without scrolling (on desktop)
2. Each card shows: palette name, hero mock, standings card mock, 5 color swatches with hex codes
3. Cards are visually distinct — the 5 palettes look clearly different from each other

### User Story 2 — Expand to Full-Screen Preview (P1)

The designer clicks any palette card and sees a full-screen immersive preview of that palette applied to a larger hero + card layout. A "Select this palette" button and a "← Back" link are visible.

**Acceptance Scenarios**:
1. Clicking a palette card expands to full-screen view
2. Full-screen shows: large hero text, full-width stat strip, 2 group cards, an impact card
3. "Select this palette" button is prominently visible
4. "Back" link returns to the gallery

### User Story 3 — Confirm Selection (P1)

The designer clicks "Select this palette" and sees a confirmation message showing the chosen palette name and its hex values. This acts as the design decision record.

**Acceptance Scenarios**:
1. Clicking "Select this palette" shows palette name + all hex tokens
2. A copy button copies the palette tokens to clipboard for use in the next spec

---

## Requirements

- **FR-001**: `/palette` route MUST show all 5 palette previews without scrolling on desktop (1280px+)
- **FR-002**: Each preview MUST include hero mock, standings card mock, and color swatches with hex codes
- **FR-003**: Clicking any preview MUST expand to full-screen palette view
- **FR-004**: Full-screen view MUST have "Select this palette" and "← Back" controls
- **FR-005**: Selection confirmation MUST display all palette hex tokens
- **FR-006**: This route is dev-only — no link in the main navbar

---

## Success Criteria

- **SC-001**: All 5 palettes render at `/palette` in under 2 seconds
- **SC-002**: Each palette is visually distinct — a viewer can identify which is which at a glance
- **SC-003**: Full-screen preview accurately represents how the palette would feel on the real site
- **SC-004**: 40/40 existing tests continue passing (palette page adds no new required tests)

---

## Assumptions

- The 5 palettes are fixed: Midnight Blue, Emerald Dark, Crimson Sport, Gold Upgraded, Purple Haze
- This is a temporary dev tool — it can be a standalone React page, not integrated into the nav
- The selection confirmation is visual only — no automated theme switching in this feature
- Route accessible at `localhost:5173/palette` during development
