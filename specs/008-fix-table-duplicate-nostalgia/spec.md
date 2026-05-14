# Feature Specification: Fix Table Split, Duplicate Groups, Nostalgia Cards

**Feature Branch**: `008-fix-table-duplicate-nostalgia`
**Created**: 2026-05-14
**Status**: Draft

---

## User Scenarios & Testing

### User Story 1 — Flag and Team Name on One Line (P1)
A fan reads the group standings and sees each team's flag emoji and country name displayed on a single horizontal line — not stacked. "🇲🇽 Mexico" reads as one unit on one line.

**Acceptance Scenarios**:
1. Every row in every group standings table shows flag + name on ONE line
2. Long names like "Bosnia and Herzegovina" or "Côte d'Ivoire" truncate or shrink gracefully — they don't push the flag to the line above
3. All stat columns (MP, W, D, L, Pts) remain aligned and readable

### User Story 2 — Group Tables Appear Only Once (P1)
A fan scrolls the page and sees the 12 group standings tables in the Groups section only. They do NOT appear again inside the Bracket section. The Bracket section shows only the knockout bracket visualization.

**Acceptance Scenarios**:
1. Groups section: 12 group cards with standings — ✓ present
2. Bracket section: shows only Round of 32 → Final knockout bracket — NO group cards
3. Bracket section heading reads "Road to the Final" with just the knockout visualization

### User Story 3 — Nostalgia Cards Fully Readable (P1)
A fan reads a "Moments That Defined the Game" card and can see: the moment title, the full narrative paragraph, and the italic significance line at the bottom — all visible, none clipped, all within the card padding.

**Acceptance Scenarios**:
1. Every nostalgia card shows the full narrative text — no clipping at card bottom
2. The italic significance line is always visible with a top border separating it from the narrative
3. The year watermark (in gradient fallback cards) sits behind the content — not in front

---

## Requirements

- **FR-001**: Standings table team cell MUST keep flag and name on a single line at all card widths
- **FR-002**: Long team names MUST wrap within the name span — never push the flag off the line
- **FR-003**: Bracket section MUST NOT contain any group standing cards or tables
- **FR-004**: Nostalgia cards MUST show all content without overflow or clipping
- **FR-005**: Global `min-width: 0` on `span` elements MUST be removed — it was causing flex wrap in table cells
- **FR-006**: 40/40 tests must continue passing

---

## Success Criteria

- **SC-001**: Every group card row shows flag + name inline — verified by visual inspection
- **SC-002**: Page grep for GroupCard inside BracketSection returns zero matches
- **SC-003**: Every nostalgia card significance line is visible below a separator line
- **SC-004**: 40/40 tests pass after all changes
