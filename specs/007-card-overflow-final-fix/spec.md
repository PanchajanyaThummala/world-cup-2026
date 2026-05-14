# Feature Specification: Card Overflow Final Fix

**Feature Branch**: `007-card-overflow-final-fix`
**Created**: 2026-05-14
**Status**: Draft

---

## User Scenarios & Testing

### User Story 1 — No Text Touches Any Card Edge (P1)

Every card on the site has generous, visible breathing room between its content and its border. Group letters are fully visible. Venue tiles don't repeat "United States" that's already shown as a section header. History/Impact/Facts/Legends cards have text that wraps cleanly within the card boundary.

**Acceptance Scenarios**:
1. Groups: group letter (A–L) is fully visible, not cut — 32px padding on all sides
2. Venues: country label only appears once (section sub-heading), NOT inside each tile
3. History: narrative text wraps cleanly; significance line visible with separator
4. Impact/Facts/Legends: no text touches the card border

### User Story 2 — Long Words Never Escape Padding (P1)

Any long word (e.g., "Bosnia-Herzegovina", "geopolitical") wraps within the card boundary. No word overflows the padding zone.

**Acceptance Scenarios**:
1. Any card body text containing a long word wraps at the card's inner edge
2. Card titles that are long wrap to 2 lines rather than overflowing

---

## Requirements

- **FR-001**: Card base padding MUST be 32px (not 24px) on all sides globally
- **FR-002**: Venue tile MUST NOT show country name/flag — section sub-header already shows it
- **FR-003**: All card body text MUST use `overflow-wrap: anywhere` to prevent overflow
- **FR-004**: Group letter MUST have no letterSpacing so Bebas Neue characters don't clip
- **FR-005**: All card content wrappers MUST have `min-width: 0` to allow flex/grid shrinking
- **FR-006**: 40/40 existing tests must continue passing

---

## Success Criteria

- **SC-001**: Visual inspection of all 9 sections — zero text touches a card border
- **SC-002**: Groups show full-width group letter with no clipping
- **SC-003**: Venue tiles show venue name and city only — no country label inside tile
- **SC-004**: All tests pass
