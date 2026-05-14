# Feature Specification: Card & Tile Audit — Heights, Padding, Hierarchy

**Feature Branch**: `006-card-audit-cleanup`
**Created**: 2026-05-14
**Status**: Draft

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Cards Never Clip Their Content (Priority: P1)

A fan opens any section and notices that every card on the page expands to fit its content perfectly. No text is cut off at the bottom of a card. No element is hidden behind a card boundary. When a card has more content than its neighbor, it grows taller, and the row's grid maintains visual order without forcing taller cards to truncate.

**Why this priority**: Clipped content is the most visible quality defect. A fan who sees a sentence ending mid-word will not trust the site.

**Independent Test**: Open every section and inspect every card. No content is clipped at the bottom. No overflow scrollbars appear on individual cards. Cards grow content-first.

**Acceptance Scenarios**:
1. **Given** a fan views any card on the site, **Then** all text inside that card is fully visible — nothing is hidden by the card's bottom edge
2. **Given** a card has more text than its row siblings, **Then** the card's height increases to fit the text — there is no overflow:hidden cutting it off
3. **Given** a card has decorative overflow (such as a background watermark), **Then** the content layer renders above the watermark via z-index and remains fully visible

---

### User Story 2 — Generous, Consistent Padding Inside All Cards (Priority: P1)

A fan reading any card sees text that has breathing room from every edge of the card. No text touches the card border. Row spacing inside tables and lists is comfortable — not cramped. The card feels like a well-printed magazine card, not a cramped database row.

**Why this priority**: Tight padding signals "amateur." Generous padding signals "premium."

**Independent Test**: Inspect any card. Inner content has at least 24px padding from all 4 card edges. Inside tables/lists, rows have at least 10px vertical padding.

**Acceptance Scenarios**:
1. **Given** any card on the site, **Then** content has minimum 24px (1.5rem) padding on all 4 sides
2. **Given** a table row inside a card (e.g., standings, bracket), **Then** vertical padding per row is 10–12px
3. **Given** a grid of cards in a section, **Then** the gap between cards is at least 32px (2rem)

---

### User Story 3 — Clear Typography Hierarchy Inside Every Card (Priority: P1)

A fan glancing at a card immediately sees a clear visual hierarchy: the primary value (capacity number, points, year) stands out as large bold gold. The secondary label (e.g., "CAPACITY", "PTS") is small, uppercase, tracked-out, muted. Body text sits in the middle — readable but quieter than the primary value. The same size and color never appear twice with different semantic roles.

**Why this priority**: Hierarchy is what makes a card scannable. Flat hierarchy = unreadable density.

**Independent Test**: On every card, identify 3 distinct text styles: primary value, label, body. Each is visually distinguishable at a glance.

**Acceptance Scenarios**:
1. **Given** a card contains a primary numeric value (capacity, points, year), **Then** it appears in large bold gold text
2. **Given** a card contains a secondary label, **Then** it is 10–11px, uppercase, letter-spacing 0.1em, in a muted neutral color
3. **Given** a card contains body text, **Then** it is 13–14px with line-height 1.65 in a muted color — visually distinct from the label

---

### User Story 4 — Venue Cards Restructured for Clarity (Priority: P2)

A fan viewing a venue card sees a clear, predictable information sequence: country badge at top, venue name + city/state below, a thin divider, then capacity figure with event context. Dead whitespace below the capacity number is removed — the card ends where the content ends.

**Why this priority**: Venue cards are the most data-dense, repeated card type. Fix here pays off 16 times.

**Acceptance Scenarios**:
1. **Given** a fan views any venue card, **Then** the visual order from top to bottom is: country badge → venue name + city/state → divider → capacity + event info
2. **Given** the card has no special "Final" or "Opening" event tag, **Then** the event-info row simply shows capacity without trailing whitespace
3. **Given** a venue card has minimal content, **Then** the card height matches that content — no fixed-min-height dead space

---

### User Story 5 — Timeline Cards Don't Clip the Significance Line (Priority: P2)

A fan reading a nostalgia timeline card always sees the italic significance/legacy line at the bottom of the card. The year watermark text behind the card never overlaps or hides the actual content. The italic line is visually separated from the body narrative by a top border and padding-top.

**Why this priority**: The italic line is the emotional payoff of the editorial section. Clipping it is killing the message.

**Acceptance Scenarios**:
1. **Given** a fan views a nostalgia moment card, **Then** the italic significance line is always fully visible
2. **Given** the year is rendered as a watermark background, **Then** content text sits visually above it (year at z-index 0, content at z-index 1)
3. **Given** a card has more body text than expected, **Then** the card grows tall enough to show the italic line — never clips it

---

### User Story 6 — Group Cards Have Better Rhythm and a Visual Anchor (Priority: P2)

A fan scanning the Groups section sees each group card with: (1) a large 28–32px bold group letter as the visual anchor, (2) generous row spacing inside the standings table, (3) a subtle 1px bottom border between table rows. When the tournament has started, top-2 teams are visually slightly brighter than the others.

**Why this priority**: The Groups section is the most viewed data section. Better rhythm improves comprehension dramatically.

**Acceptance Scenarios**:
1. **Given** any group card, **Then** the group letter ("A", "B", etc.) is 28–32px bold as the card's visual anchor
2. **Given** the standings table inside a group card, **Then** each row has a subtle 1px bottom border (faint, not harsh)
3. **Given** top-2 teams have been determined post-kickoff, **Then** their text color is slightly brighter than positions 3–4

---

### User Story 7 — Impact Cards Don't Clip Category Tags (Priority: P2)

A fan reading the "Beyond the Pitch" impact section sees right-column cards that fully display their category badges. The badge never gets cut off by the grid container. The text underneath wraps correctly without forcing the badge into clipping.

**Why this priority**: Category tags carry semantic info — clipping them loses the meaning.

**Acceptance Scenarios**:
1. **Given** a fan views the Impact section at any viewport, **Then** all category tags on right-column cards are fully visible
2. **Given** a category tag has long text (e.g., "Human Rights"), **Then** the tag remains intact — no truncation, no clipping past grid boundary
3. **Given** a card sits in a CSS grid cell, **Then** `min-width: 0` is applied so it cannot push outside its grid column

---

### User Story 8 — No Hardcoded `height: Xpx` on Any Card (Priority: P3)

Every card component uses `min-height` instead of `height` so content can always expand downward. There are zero hardcoded fixed pixel heights on card containers.

**Why this priority**: A defensive structural fix that prevents future regressions of US1.

**Acceptance Scenarios**:
1. **Given** a code audit of all card components, **Then** zero card containers have a hardcoded `height: Xpx` CSS property
2. **Given** a card has a height constraint, **Then** that constraint is expressed as `min-height: Xpx` only
3. **Given** any card needs to grow taller than its `min-height`, **Then** it grows freely without overflow

---

### Edge Cases

- What if a card has extremely long body text? → Card grows tall; in a grid row with `auto-rows-fr`, the row stretches to match
- What if a card has very little content? → Card respects `min-height` if set; no forced fill, no dead whitespace below
- What if a section is rendered on a narrow viewport? → Cards stack in single column; padding/rhythm rules still apply per card

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: No card component MAY use a fixed pixel `height` — only `min-height` if needed
- **FR-002**: No card MAY use `overflow: hidden` unless required for a decorative element; if used, content must be rendered above via `position: relative; z-index: 1`
- **FR-003**: Every card MUST have inner padding of at least 24px (1.5rem) on all sides
- **FR-004**: Table/list rows inside cards MUST have 10–12px vertical padding
- **FR-005**: Grid gap between cards MUST be at least 32px (2rem)
- **FR-006**: Cards MUST establish a 3-tier typography hierarchy: primary value (large bold gold), secondary label (10–11px uppercase tracked muted), body (13–14px line-height 1.65 muted)
- **FR-007**: Body text MUST NOT share the same size and color as labels — they MUST be visually distinct
- **FR-008**: Venue cards MUST follow the layout order: country badge → name + location → divider → capacity + event info
- **FR-009**: Venue cards MUST NOT have visible dead whitespace below the capacity row
- **FR-010**: Nostalgia timeline cards MUST always show the italic significance line — no clipping
- **FR-011**: Year watermark backgrounds on timeline cards MUST sit at z-index 0 with content at z-index 1
- **FR-012**: The italic significance line MUST be separated from body text by a top border + padding-top
- **FR-013**: Group cards MUST display the group letter at 28–32px bold as the visual anchor
- **FR-014**: Standings table rows inside group cards MUST have a 1px subtle bottom border
- **FR-015**: Post-kickoff, top-2 team rows MUST have slightly brighter text color than positions 3–4
- **FR-016**: Impact section grid children MUST apply `min-width: 0` to prevent overflow past the grid container
- **FR-017**: Category tags on impact cards MUST never be clipped at any viewport
- **FR-018**: Colors, fonts, and overall layout MUST remain unchanged — only the structural fixes in FR-001 to FR-017 are in scope

---

## Success Criteria *(mandatory)*

- **SC-001**: Zero text content is clipped on any card at any viewport (manual audit of all 9 sections)
- **SC-002**: A code grep for `height:` (with a px value) on card components returns zero matches in card files
- **SC-003**: A code grep for `overflow: hidden` or `overflow-hidden` on card files returns no matches except where decorative (with z-index'd content layer)
- **SC-004**: Inner padding on every audited card measures ≥ 24px via DevTools
- **SC-005**: Standings tables show ≥ 10px vertical row padding
- **SC-006**: All 40 existing tests continue to pass after the audit
- **SC-007**: No new colors, fonts, or layouts introduced — only structural fixes

---

## Assumptions

- All card components live under `src/components/features/**` and `src/components/ui/Card.tsx`
- Auto-rows-fr (already applied in feature 005) stays — combined with min-height rather than fixed height ensures grid alignment AND content expansion
- Existing colors and fonts (gold/neutral tokens, Bebas/Oswald/Inter) are unchanged
- "Generous" padding numbers are the floor — `p-6` (24px) minimum; `p-7` (28px) acceptable for larger cards
- Group letter "visual anchor" at 28–32px replaces the current Bebas Neue 30px-ish rendering — verifies via inspection
- Brighter text for top-2 teams post-kickoff is a continuation of the existing `text-neutral-50` vs `text-neutral-300` pattern
- Year watermark on timeline cards refers to the large faint year text used as a gradient fallback in `MomentCard`; ensure z-index is layered correctly
