# Feature Specification: Visual Upgrade — Editorial Layout & Player Imagery

**Feature Branch**: `002-visual-upgrade`

**Created**: 2026-05-13

**Status**: Draft

**Input**: Fix congested layout, add real player action photos to hero, add a Legends section, integrate player images into nostalgia timeline, improve editorial magazine spacing throughout — less crowded, more cinematic like Nike/ESPN+ campaigns.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Spacious Hero with Real Photography (Priority: P1)

A fan opens the website and is immediately stopped in their tracks. The hero fills the entire screen with a dramatic stadium or player action photo, dark-treated and cinematic. The title text is large and uncluttered — not competing with stats, pills, and balls all at once. There is generous breathing room between each element. The fan feels like they've landed on a premium sports editorial, not a crowded dashboard.

**Why this priority**: First impression defines the entire experience. A congested hero undermines all other quality. Fixing it unlocks the premium feel throughout.

**Independent Test**: Open the site. The hero section should have no more than 3 visible content zones: a background photo, the title text, and a single supporting detail. Nothing should feel cramped or stacked too tightly.

**Acceptance Scenarios**:

1. **Given** a fan opens the homepage, **When** the hero loads, **Then** a full-screen photographic background (stadium or player action) is visible behind the title with a dark overlay that keeps text legible.
2. **Given** the fan views the hero on desktop, **Then** the title text, date line, and host nations are the only elements visible above the fold — stats and counters appear only after a subtle scroll or are placed below the fold.
3. **Given** the fan is on mobile (375px), **When** the hero loads, **Then** the photo is visible, text is large and readable, and nothing overflows horizontally.

---

### User Story 2 — Legends Visual Section (Priority: P2)

A fan scrolling the site encounters a dedicated "Legends" section — a full-bleed, visually dramatic showcase of iconic player imagery. Each legend has a large photo, their name in display type, their nation, and their era. The layout feels like a magazine spread: asymmetric, bold, editorial. The fan immediately recognises the visual language of premium sports content.

**Why this priority**: Player imagery is the emotional core of football fandom. Without it the site is data, not story. This section makes the site feel alive.

**Independent Test**: Navigate to the Legends section. At least 4 legendary players should appear with photos, names, nations, and eras. The layout should not be a uniform grid — it should alternate sizes and orientations.

**Acceptance Scenarios**:

1. **Given** a fan scrolls to the Legends section, **Then** they see at least 4 player showcase cards with: player photo, name in bold display type, country name and flag, and era label.
2. **Given** the fan views on desktop, **Then** cards are arranged in an asymmetric editorial layout — not a uniform 4-column grid.
3. **Given** the fan hovers a player card, **Then** the photo subtly zooms in and the player name glows gold.
4. **Given** a photo fails to load, **Then** a dark gradient placeholder appears — no broken image icons.

---

### User Story 3 — Photos in Nostalgia Timeline (Priority: P2)

A fan reading the nostalgia timeline sees each historic moment paired with a relevant photo — a stadium shot, action image, or trophy. The photo sits beside or behind the text card, adding visual context. The timeline feels like a premium illustrated history book, not a list of text cards.

**Why this priority**: The nostalgia section already has great writing — photos make it emotionally resonant and visually rich.

**Independent Test**: Navigate to the History section. At least 3 moment cards should show a photo. Cards without a photo should show an era-appropriate gradient or pattern as a graceful fallback.

**Acceptance Scenarios**:

1. **Given** a fan reads a moment card, **When** the card has a photo assigned, **Then** the photo fills the visual portion of the card with a dark treatment (luminosity blend or dark overlay).
2. **Given** no photo is available for a moment, **Then** a dark gradient with the year displayed large in the background appears as a styled fallback.
3. **Given** the fan views on mobile, **Then** the photo appears above the text content without clipping.

---

### User Story 4 — Consistent Breathing Room Throughout (Priority: P1)

A fan scrolling the entire page notices consistent, generous spacing between all sections and within all cards. No section feels like it was squeezed in. Section headings have room to breathe above and below. Cards have inner padding that doesn't feel tight. The overall rhythm of the page feels deliberate and unhurried — like a luxury editorial magazine.

**Why this priority**: Spacing is the invisible quality signal. A congested layout signals amateur design regardless of content quality.

**Independent Test**: Scroll the entire page. No two sections should feel visually merged. Every heading should have visible space above it. Card content should not touch card edges.

**Acceptance Scenarios**:

1. **Given** a fan scrolls through any section, **Then** section headings have at least one full card-height of space above them separating from the previous section.
2. **Given** a fan reads any card (group, venue, fact, impact), **Then** text content has visible padding on all four sides — no text touches the card border.
3. **Given** the hero section ends, **Then** there is a clear visual transition (fade, separator, or space) before the next section begins.

---

### Edge Cases

- What if a player photo fails to load? → Show a dark gradient with the era/year label as a styled fallback — never a broken image.
- What if the hero background is slow to load? → Show the dark gradient background first, image fades in when ready — no layout shift.
- What if the fan is on a very small screen (320px)? → Photos scale correctly, text remains legible, no horizontal overflow.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The hero section MUST display a full-screen photographic background with a dark overlay — text legible at all times
- **FR-002**: The hero above-the-fold content MUST contain no more than 3 distinct content zones (photo bg, title, date/host)
- **FR-003**: A "Legends" section MUST be added to the page between Impact and Facts with at least 4 player showcase cards
- **FR-004**: Each Legends card MUST include: player photo (or gradient fallback), name, country and flag, era label
- **FR-005**: The Legends section layout MUST be asymmetric — not a uniform equal-sized grid
- **FR-006**: At least 3 nostalgia moment cards MUST show a photographic or styled visual (photo or gradient)
- **FR-007**: All cards across the site MUST have visible inner padding — text must not touch card edges
- **FR-008**: All section transitions MUST have clear visual separation (space, gradient, or border)
- **FR-009**: All images MUST degrade gracefully to gradient placeholders if the file is missing or slow to load
- **FR-010**: The full page MUST remain mobile-responsive at 375px with no horizontal overflow

### Key Entities

- **Legend**: Player name, country name, country flag emoji, era (e.g. "1970s Maestro"), photo path or null
- **VisualCard**: Any card component — must enforce minimum padding of 24px on all sides

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user viewing the hero cannot identify more than 3 content zones above the fold
- **SC-002**: The Legends section contains at least 4 player entries with name, country, and visual element
- **SC-003**: At least 3 nostalgia cards display a photo or styled visual — not plain text on dark background
- **SC-004**: Every card on the page has visible inner padding — measurable by inspecting any card element
- **SC-005**: No section on the page visually merges with the next — each has a clear start and end
- **SC-006**: The page Lighthouse Performance score remains ≥ 80 after adding images (lazy-loaded)
- **SC-007**: All images degrade to gradient fallbacks — zero broken image icons visible at any viewport size

---

## Assumptions

- Player photos will be sourced from Unsplash/Pexels (already downloaded to `public/images/`) or use styled gradient fallbacks for legends without available photos
- "Legends" players will be curated fictional-adjacent legendary archetypes (e.g. "The Brazilian Wizard — 1970s", "The Golden Boot — 1986") since licensed player likenesses require attribution — or real player names without trademarked imagery
- The hero background image is already downloaded at `public/images/hero-bg.jpg`
- This feature updates existing components rather than creating entirely new pages
- The Legends section will be inserted between the Impact and Facts sections in the page order
- Gradient fallbacks use the existing gold/neutral color tokens — no new colors introduced
