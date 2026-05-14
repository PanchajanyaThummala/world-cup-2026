# Feature Specification: Fix Container Padding & Layout Consistency

**Feature Branch**: `005-fix-padding-layout`
**Created**: 2026-05-14
**Status**: Draft

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — No Content Touches Viewport Edge (Priority: P1)

A fan opens the site on any viewport size and notices that every section's content sits comfortably within consistent left/right gutters. Section titles like "The Group Stage" never get cut off on the left edge. No card or text element runs flush against the viewport boundary anywhere on the page. The site feels like it has been carefully laid out — every element has breathing room from the edges.

**Why this priority**: Edge-touching content is the most visible layout bug. It signals "broken" instantly to any viewer.

**Independent Test**: Open the site at desktop (1440px), tablet (768px), and mobile (375px) viewports. Scroll through every section. No text, no card, no image touches the viewport's left or right edge. All sections share the same horizontal gutter width.

**Acceptance Scenarios**:
1. **Given** the fan views any section at 1440px desktop, **Then** all content sits within a centered container with at least 48px gutter on each side
2. **Given** the fan views any section at 768px tablet, **Then** content has at least 24px gutter on each side
3. **Given** the fan views any section at 375px mobile, **Then** content has at least 16px gutter on each side
4. **Given** the fan scrolls between sections, **Then** the left edge of every section heading aligns with every other section heading at the same viewport size

---

### User Story 2 — Group Cards Align in a Consistent Grid (Priority: P1)

A fan viewing the Groups section sees a tidy grid where every group card has the same height, top edge, and right boundary. Group A and Group B align side-by-side at the same vertical position. Group B does not stretch wider than Group A. Cards do not have wasted whitespace below their tables.

**Why this priority**: Misaligned cards in a grid scream "amateur layout." Critical for the data-density section.

**Independent Test**: Open the Groups section. All 12 group cards form a perfect grid — same width, same height, same alignment. No card stretches past its column. No card sits higher or lower than its row neighbors.

**Acceptance Scenarios**:
1. **Given** the fan views the Groups section, **Then** every group card has identical width within its row
2. **Given** the fan views the Groups section, **Then** every group card has the same height (content-driven, but rows align via grid)
3. **Given** the fan views Group A and Group B side by side, **Then** their top edges align at exactly the same Y coordinate
4. **Given** a group card has fewer rows of content than its siblings, **Then** it does not have visible empty whitespace below the table — the card height matches its content

---

### User Story 3 — Navigation Items Never Clip (Priority: P1)

A fan opens the site on any viewport and sees all 9 navigation items (Home, Groups, Venues, History, Impact, Legends, Facts, Bracket) fully visible. The last item "Bracket" never gets clipped off the right edge. On narrow viewports, the navigation either fits, scrolls horizontally inside its container, or collapses to a mobile menu — but it never overflows the viewport silently.

**Why this priority**: Clipped navigation = broken navigation. Users can't reach the section.

**Independent Test**: Open the site at 1024px, 1280px, and 1440px. All 9 nav items are fully visible and clickable. At <768px the nav collapses to a usable mobile pattern.

**Acceptance Scenarios**:
1. **Given** the fan views the navbar at 1280px desktop, **Then** all 9 nav items are fully readable with no clipping
2. **Given** the fan views the navbar at 1024px, **Then** nav items either fit, condense (shorter labels), or scroll horizontally without overflowing the viewport
3. **Given** the fan views the navbar at <768px mobile, **Then** the nav collapses to a hamburger menu or compact icon row

---

### User Story 4 — Remove Incorrect Match Info from Countdown Banner (Priority: P1)

The countdown banner currently reads "Mexico v TBD · Estadio Azteca" on desktop — but the second match opponent is not confirmed, so showing "Mexico v TBD" as a definitive matchup is misleading. Remove this text entirely from the banner. The banner should show only the countdown timer + label + venue context (if shown at all).

**Why this priority**: Displaying incorrect or speculative match info undermines the site's credibility as a tournament information source.

**Independent Test**: Open the site. The countdown banner does NOT contain the text "Mexico v TBD". The banner contains only: "Kickoff in" label, 4 countdown segments (days/hrs/min/sec), and optionally a neutral venue/event label like "Opening match · Estadio Azteca".

**Acceptance Scenarios**:
1. **Given** the fan views the countdown banner, **Then** no text containing "v TBD" or "vs TBD" appears
2. **Given** the banner is on desktop, **Then** the right side of the banner has padding from the viewport edge (at least 16px)
3. **Given** the banner shows a venue reference, **Then** it uses a factual statement like "Opening match · Mexico City" rather than a speculative matchup

---

### User Story 5 — Banner Has Proper Edge Padding (Priority: P2)

The countdown banner content currently crowds the right edge of the viewport with no breathing room. All banner content respects a minimum padding from both left and right viewport edges, matching the rest of the site's gutter system.

**Why this priority**: Edge-touching banner is visible on every page load.

**Acceptance Scenarios**:
1. **Given** the fan views the banner at any width, **Then** content has at least 16px padding from both viewport edges
2. **Given** the banner has multiple elements, **Then** they wrap gracefully on narrow viewports without being clipped

---

### User Story 6 — Remove Misleading Gold Treatment from Empty Standings (Priority: P2)

Currently, the top 2 rows of every group's standings table are highlighted in gold with the points cell showing "0" in gold — but pre-tournament, every team has 0 points. Highlighting "0 pts" in gold is misleading because gold should signal qualification or achievement, not "zero progress." Before any matches are played, all 4 team rows should be visually equal — no gold treatment. The gold qualifier treatment activates only once at least one match has been played in that group.

**Why this priority**: Misleading visual signals damage the site's trustworthiness. Gold = good news; using it for "zero" is wrong.

**Independent Test**: Open any group card pre-tournament. All 4 team rows look visually identical (no gold tint, no gold left border, no gold points). After matches are played (matches.played > 0), top 2 rows get the gold treatment.

**Acceptance Scenarios**:
1. **Given** all teams in a group have 0 matches played, **Then** no row has gold tint, gold border, or gold points styling
2. **Given** at least one match has been played in a group, **Then** the top 2 rows by points get the gold qualifier treatment
3. **Given** the standings show zero matches played, **Then** the points column uses neutral text styling

---

### User Story 7 — Consistent Team Name Font Weights (Priority: P3)

Currently some team names appear bold while others appear regular weight, with no semantic reason for the difference (it's just artifact of which rows are "top 2" with gold treatment). Make all team names use the same font weight by default. Reserve weight changes for clearly-defined semantic differences (e.g., once a team has qualified, bump its weight).

**Why this priority**: Inconsistent type weights look unintentional and undermine professionalism.

**Acceptance Scenarios**:
1. **Given** the fan views any group's standings, **Then** all 4 team name texts have the same font weight before any matches are played
2. **Given** team weights differ, **Then** the difference is tied to a clear semantic rule (e.g., "qualified for knockouts")

---

### User Story 8 — Responsive Layout at Small Viewports (Priority: P3)

A fan opens the site on mobile (375px width). Every section renders correctly: no horizontal scrolling (except the bracket section, which has its own horizontal scroll), no clipped content, no overflowing elements. Touch targets are at least 44×44px. The site is fully usable on mobile.

**Why this priority**: 60%+ of web traffic is mobile. A site that breaks on mobile is unusable.

**Acceptance Scenarios**:
1. **Given** the fan opens the site at 375px viewport, **Then** no section has horizontal scroll except the Bracket section
2. **Given** the fan taps any interactive element on mobile, **Then** the touch target is at least 44×44px
3. **Given** the fan navigates the page on mobile, **Then** all 9 sections are reachable via the mobile nav pattern

---

### Edge Cases

- What if the viewport is extremely narrow (320px iPhone SE)? → Content remains readable with minimum 16px gutter; nav collapses to compact menu
- What if the viewport is extremely wide (>2000px ultra-wide)? → Content is capped at max-width 1280px and centered with the rest of the space as gutters
- What if a navigation label is translated to a longer language later? → Pattern must accommodate variable label widths gracefully

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All sections MUST share a single horizontal gutter system: 16px mobile / 24px tablet / 48px desktop
- **FR-002**: Section title text MUST never be clipped on the left or right viewport edge
- **FR-003**: Group cards MUST align in a strict grid — same width within row, same top edge, content-driven heights
- **FR-004**: All 9 nav items MUST be fully visible at viewports ≥1024px, OR collapse to mobile menu below that
- **FR-005**: The countdown banner MUST NOT contain "Mexico v TBD", "vs TBD", or similar speculative matchup text
- **FR-006**: The countdown banner content MUST have minimum 16px padding from both viewport edges
- **FR-007**: Group standings rows MUST NOT use gold qualifier styling when all teams have 0 matches played
- **FR-008**: All team names in standings MUST use the same font weight when no matches have been played
- **FR-009**: At 375px viewport, no section MUST cause horizontal page scroll except the Bracket section
- **FR-010**: All interactive elements MUST have minimum 44×44px touch target on mobile

### Key Entities

- **Gutter system**: token-driven horizontal padding (16/24/48 px responsive)
- **Group card**: must support content-driven heights, no fixed min-height fill

---

## Success Criteria *(mandatory)*

- **SC-001**: Zero section title text gets clipped at any viewport (1440 / 1024 / 768 / 375 px)
- **SC-002**: All 12 group cards align in a perfect grid — verified by eye and by measuring top-edge Y coordinate
- **SC-003**: All 9 navbar items are fully visible at 1024px+
- **SC-004**: The countdown banner contains zero speculative match info — verified by text search of rendered HTML
- **SC-005**: Pre-tournament group standings show zero gold-tinted rows
- **SC-006**: The site has zero horizontal page overflow at 375px (excluding bracket section)
- **SC-007**: All 40 existing tests continue to pass after these layout fixes

---

## Assumptions

- The existing horizontal padding tokens may need to be promoted to a single source of truth (CSS variable or layout primitive)
- The mobile nav at <768px collapses to a hamburger-style toggle revealing a vertical list
- "Match played" status is derived from the existing `mp` (matches played) field on `GroupStanding` entities
- Gold qualifier styling activation threshold: `standings.some(s => s.mp > 0)` per group
- The "Mexico v TBD · Estadio Azteca" text in the banner is replaced with a neutral fallback like "Opening match · Mexico City" or removed entirely
- Section padding tokens already exist (`--section-py`) — a complementary `--gutter-x` token will be added
- All existing tests pass: 40/40 baseline must remain green after the fixes
