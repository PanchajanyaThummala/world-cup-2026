# Feature Specification: Countdown Header + UI Polish Pass

**Feature Branch**: `004-ui-polish-countdown`
**Created**: 2026-05-14
**Status**: Draft

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Tournament Countdown Banner (Priority: P1)

A fan visits the site and immediately sees a slim premium countdown banner pinned to the top of the page. The banner shows the time remaining until the tournament's opening match: Mexico vs TBD, June 11, 2026, at Estadio Azteca. The countdown updates every second, showing days, hours, minutes, and seconds in a clean monospaced layout. When the tournament starts, the banner switches to "Tournament Live" mode showing the current matchday.

**Why this priority**: A countdown is the single most effective hook for sports event sites. It creates immediate engagement and gives the page a clear purpose.

**Independent Test**: Open the site. A countdown banner is visible at the very top, anchored above the navbar, showing days/hours/minutes/seconds counting down in real time.

**Acceptance Scenarios**:
1. **Given** the fan opens the site, **Then** a sticky banner appears at the top showing "Kickoff in: NN days HH:MM:SS"
2. **Given** the countdown is running, **Then** the seconds tick down every 1 second visually
3. **Given** the current date is past June 11, 2026, **Then** the banner switches to "Tournament Live" mode
4. **Given** the fan is on mobile, **Then** the banner remains readable — long countdown text wraps to two lines if needed

---

### User Story 2 — Fix Broken Inline Strings (Priority: P1)

The site has visible rendering bugs where flags and text concatenate without spacing, producing strings like "MexicoMexico", "USADallas/Arlington", "🇲🇽Mexico". A fan reading any card should see a properly spaced flex layout: flag (in its own visual slot) + text (in its own visual slot) — never a wall of concatenated characters. The cause must be fixed at the component level, not patched with CSS margins.

**Why this priority**: Visible text concatenation looks broken and unprofessional. It undermines the premium aesthetic instantly.

**Independent Test**: Open every section (Venues, Legends, Bracket). No visible text on the page contains two adjacent words running together without a space (e.g., "USADallas"). Every flag-and-name pairing is visibly separated.

**Acceptance Scenarios**:
1. **Given** a venue card is visible, **Then** the country flag and city name are on separate flex items with measurable spacing between them
2. **Given** a legend card is visible, **Then** the nation flag and nation name are visibly separated
3. **Given** a bracket slot shows a team, **Then** the team flag and team name are visibly separated
4. **Given** any flag emoji fails to render (e.g., older OS), **Then** the country code fallback (e.g., "MX") does NOT visually merge with the adjacent country name

---

### User Story 3 — Premium Stats Information Band (Priority: P1)

The stats strip below the hero (48 Teams / 12 Groups / 16 Venues / 104 Matches / 32 Days) currently looks like loose counters. It should be redesigned as a deliberate, designed information band that bridges the hero and the content below — tightly aligned, with clear visual rhythm, and a subtle visual treatment that signals "this is curated tournament data."

**Why this priority**: The strip sits right after the hero — it sets the tone for the rest of the page. If it looks unfinished, the whole site feels amateur.

**Independent Test**: Scroll to the stats strip. The 5 stats should look like one cohesive horizontal band, not 5 loose stacked items. Vertical and horizontal spacing must feel deliberate.

**Acceptance Scenarios**:
1. **Given** the fan views the stats band, **Then** all 5 stats sit in a single visually unified row (or 2 rows on mobile) with consistent spacing
2. **Given** the band is visible, **Then** dividers or subtle visual separators distinguish each stat without harsh lines
3. **Given** the numbers animate in, **Then** they pulse subtly on completion to confirm the count finished

---

### User Story 4 — Rebuilt Group Standings Cells (Priority: P2)

Group standings cells currently feel cramped — team names overflow, columns are too narrow, padding is inconsistent. Rebuild the standings table with proper cell padding, controlled column widths (team column takes 40%, stat columns equal width), and a clear visual hierarchy that puts the top 2 qualifying teams in a distinct gold treatment.

**Why this priority**: Groups is the most data-dense section. If it feels cramped, the site feels cheap.

**Independent Test**: Open the Groups section. Every group card's standings table reads cleanly — team names are not clipped, columns align across all 12 groups, top-2 teams are visually distinct.

**Acceptance Scenarios**:
1. **Given** a group card is visible, **Then** all 4 team names are fully readable without truncation or overflow
2. **Given** the standings table is rendered, **Then** team column width is wider than stat columns
3. **Given** a top-2 qualifying team is shown, **Then** that row has a distinct gold accent (not just gold text — a left border or background tint)

---

### User Story 5 — Venue Card Multi-Line Layout (Priority: P2)

Venue cards currently render `USADallas/Arlington` as a single concatenated line. Rebuild each card with three clear, separately laid-out information rows: (1) Country with flag, (2) City (and state if applicable), (3) Capacity figure. Each row has its own line and its own visual treatment.

**Why this priority**: Venue data is critical reference content. Cramped concatenation undermines its readability.

**Independent Test**: Open the Venues section. Every venue card has 3 visually distinct rows: country, city/state, capacity. No row contains two unrelated values concatenated.

**Acceptance Scenarios**:
1. **Given** a venue card is visible, **Then** country (with flag) is on its own line
2. **Given** a venue card is visible, **Then** city (and optional state) is on its own line below the country
3. **Given** a venue card is visible, **Then** capacity is on its own line with a clear label
4. **Given** a venue is the Final or Opening venue, **Then** that label appears prominently as a separate badge

---

### User Story 6 — Hero CTA Refinement (Priority: P3)

The hero CTA button "Explore the Tournament" currently has inconsistent letter-spacing and padding. Refine its visual rhythm: tighter letter-spacing, larger horizontal padding, subtle gold glow that pulses gently. The button should feel like a premium broadcast graphic.

**Why this priority**: The CTA is the only interactive element above the fold. It deserves polish.

**Independent Test**: View the hero on desktop. The CTA button has visibly generous horizontal padding, clean letter-spacing, and a subtle pulse glow.

**Acceptance Scenarios**:
1. **Given** the hero loads, **Then** the CTA button has a minimum 32px horizontal padding
2. **Given** the page is idle for 2 seconds, **Then** the CTA button has a gentle gold glow pulse animation (2s loop)
3. **Given** the fan hovers the button, **Then** the glow intensifies and the button lifts slightly

---

### User Story 7 — Unified Vertical Section Rhythm (Priority: P3)

Currently, vertical spacing between sections is inconsistent — some feel tightly packed, others too sparse. Establish a single unified vertical rhythm: every section gets the same top/bottom padding, every section heading gets the same bottom margin, every section transition uses the same gradient separator pattern.

**Why this priority**: Visual rhythm is the signature of premium design. Inconsistent spacing is the #1 amateur tell.

**Independent Test**: Scroll the entire page slowly. Every section start and end feels rhythmically identical — no section feels squeezed or stretched relative to its neighbors.

**Acceptance Scenarios**:
1. **Given** the fan scrolls through any section, **Then** the top padding above the heading is measurably identical across all sections
2. **Given** a section ends, **Then** the visual transition to the next section is identical (same gradient, same gap)
3. **Given** any section is in view, **Then** the heading-to-content gap is consistent across all sections

---

### User Story 8 — Reduce Uppercase Label Pollution (Priority: P3)

Currently many labels are in ALL CAPS — eyebrows, badge text, navigation, button labels. Reduce uppercase usage to micro-labels only (badges, eyebrows). All navigation, buttons, and content should use sentence case for readability.

**Why this priority**: Excessive uppercase makes text feel shouty. Premium sites reserve caps for micro-labels.

**Independent Test**: Open the page. The only uppercase text should be: eyebrow lines above section headings, badge text, and the countdown label "KICKOFF IN". Everything else is sentence case.

**Acceptance Scenarios**:
1. **Given** the fan views the navbar, **Then** nav items use sentence case ("Groups" not "GROUPS")
2. **Given** the CTA button is visible, **Then** its label uses sentence case
3. **Given** an eyebrow line is visible above a heading, **Then** it remains uppercase (eyebrow exception)

---

### User Story 9 — Bracket TBD Visual Hierarchy (Priority: P3)

The bracket currently shows endless "TBD" placeholders that look like a broken state. Add visual hierarchy: empty slots should look like designed empty states — a subtle dashed border, a clock icon, "Awaiting result" text, and a slight opacity reduction. When team data fills in, the slot transforms to its filled state. The empty state should feel intentional, not broken.

**Why this priority**: The site launches before the tournament — every knockout slot will be empty. Empty states must feel premium.

**Independent Test**: Open the Bracket section. Every empty slot looks intentionally empty — dashed border, opacity 0.7, text "Awaiting…" or similar. No slot looks like a layout error.

**Acceptance Scenarios**:
1. **Given** a bracket slot has both teams as TBD, **Then** the slot has a dashed border style and slightly reduced opacity
2. **Given** a bracket slot has TBD teams, **Then** the slot shows a subtle clock or dash icon instead of just the word TBD
3. **Given** later when teams are added, **Then** the slot transforms to a solid border with full opacity

---

### Edge Cases

- What if the countdown clock crosses midnight or daylight saving time? → Use UTC math internally; display in user's local timezone
- What if the tournament has already started? → Switch banner to "Tournament Live — Matchday N" mode
- What if a country flag emoji fails to render on older systems? → Render a colored text-only fallback (e.g., "MX") that does NOT collide with the next text node
- What if the user has `prefers-reduced-motion`? → Disable the CTA pulse and stat band animations

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A countdown banner MUST appear at the top of the page (above navbar) showing days, hours, minutes, seconds until 2026-06-11 20:00 ET (Mexico City opening match)
- **FR-002**: The countdown MUST update every second
- **FR-003**: When the current date is past 2026-06-11, the banner MUST switch to "Tournament Live" mode
- **FR-004**: All flag + country/team name pairings MUST use a flex layout with explicit visible spacing — never concatenated strings
- **FR-005**: The stats strip MUST visually present 5 stats as one unified information band, not 5 loose stacked counters
- **FR-006**: Group standings table cells MUST have controlled column widths (team col wider than stat cols) and no text truncation/overflow
- **FR-007**: Top-2 qualifying teams in each group MUST have a visually distinct row treatment (gold accent on row, not just gold text)
- **FR-008**: Venue cards MUST render country, city, and capacity on 3 separate visual rows
- **FR-009**: The hero CTA button MUST have a subtle gold pulse animation (disabled when `prefers-reduced-motion`)
- **FR-010**: All sections MUST share identical top/bottom padding and identical heading-to-content gap
- **FR-011**: Navigation labels and button labels MUST use sentence case, not ALL CAPS
- **FR-012**: Empty bracket slots MUST have a distinct visual treatment (dashed border, reduced opacity, icon) — not just the text "TBD"

### Key Entities

- **Countdown**: target ISO datetime (2026-06-11T20:00:00-04:00 ET), current state ("countdown" or "live")
- **VenueRow**: country (with flag), city (with state), capacity (with label)

---

## Success Criteria *(mandatory)*

- **SC-001**: The countdown is visible at the top of the page within 1 second of load
- **SC-002**: The countdown second value visibly ticks down at least 5 times per minute
- **SC-003**: Zero instances of visibly concatenated flag-and-text strings on the page (audit by manual inspection of all 9 sections)
- **SC-004**: All 12 group cards show 4 fully readable team names with no truncation
- **SC-005**: All 16 venue cards display country, city, and capacity on separate rows
- **SC-006**: Visual rhythm between sections feels identical (verified by scroll-through inspection)
- **SC-007**: Uppercase text appears only on eyebrow lines, badges, and the countdown label "KICKOFF IN"
- **SC-008**: Empty bracket slots look intentionally empty (not broken) — verified by user inspection
- **SC-009**: All 37 existing tests continue to pass after refactoring

---

## Assumptions

- The opening match is Mexico vs TBD at Estadio Azteca on 2026-06-11, kickoff 20:00 ET (per FIFA scheduling announcements)
- The site is statically deployed — countdown runs client-side only, no server time sync
- User's browser clock is treated as authoritative for the countdown
- The countdown banner sits above the navbar (creates a slim top stripe ~32–40px tall)
- The user's local timezone is auto-detected for display
- "Sentence case" means capitalize first letter of phrase only ("Explore the tournament"), not Title Case
- The existing test suite continues to validate all components after refactoring; new tests added only for new components (countdown banner, venue row layout)
