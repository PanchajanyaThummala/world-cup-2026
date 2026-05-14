# Feature Specification: Premium Visual Overhaul — Glossy Futuristic $10k Design

**Feature Branch**: `003-premium-visual-overhaul`
**Created**: 2026-05-13
**Status**: Draft

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Instant Wow: Glossy Futuristic Hero (Priority: P1)

A football fan opens the website and is instantly stunned. The hero feels like the opening of a blockbuster sports broadcast — real football (soccer) action imagery, sweeping light effects, depth, glass panels, and a sense that this is a premium production. Every element has shine, glow, or depth. Nothing is flat or boxy.

**Why this priority**: First impression is everything. If the hero doesn't feel $10k, nothing else matters.

**Independent Test**: Open the site. Without scrolling, the page should look like a premium ESPN+/Nike/FIFA broadcast graphic — real football imagery, glass UI elements, dramatic lighting, motion.

**Acceptance Scenarios**:
1. **Given** the page loads, **Then** a real football action photo (player with ball, stadium, or trophy) fills the hero — not a gradient
2. **Given** the hero is visible, **Then** glass card elements (backdrop-blur, semi-transparent with border glow) are present
3. **Given** the fan scrolls, **Then** parallax depth layers move independently — photo, content, and glow layers at different speeds
4. **Given** the fan watches the hero animate in, **Then** elements reveal with staggered cinematic motion — not all at once

---

### User Story 2 — Immersive Scroll Animations (Priority: P1)

Every section the fan scrolls into feels alive. Cards don't just fade in — they lift, rotate slightly, or slide from unexpected angles. Section transitions have momentum. The experience feels like an interactive magazine that responds to movement.

**Why this priority**: Animation is what separates a $1k site from a $10k site. Static reveals look cheap.

**Independent Test**: Scroll through all 8 sections. Every card should animate in with a distinct motion — no two sections should feel identical.

**Acceptance Scenarios**:
1. **Given** the fan scrolls into any section, **Then** cards reveal with directional motion (not just fade-up)
2. **Given** the fan hovers any card, **Then** a visible interactive response occurs — glow, lift, shimmer, or border animate
3. **Given** the fan is on the Legends section, **Then** player cards have a cinematic reveal — large, dramatic, not boxy

---

### User Story 3 — Real Football (Soccer) Imagery Throughout (Priority: P1)

Every image on the site is unambiguously football (soccer). The hero shows a football pitch, stadium, or player kicking a round ball. The Legends section shows football players. No American football helmets, gridiron fields, or oval balls anywhere.

**Why this priority**: The previous images were American football (NFL). This is a FIFA World Cup site — every photo must show football/soccer.

**Independent Test**: A user from any country should look at any image on the site and immediately know it is about football (soccer/fútbol), not any other sport.

**Acceptance Scenarios**:
1. **Given** the hero loads, **Then** the background shows a football stadium, pitch, or football action shot
2. **Given** the Legends section is visible, **Then** all player photos show football players — round ball, football boots, pitch, or football kit
3. **Given** any image on the site, **Then** no American football equipment, helmets, or oval balls are visible

---

### User Story 4 — Glass Morphism UI System (Priority: P2)

Cards throughout the site use a glass morphism visual style — semi-transparent dark backgrounds, subtle backdrop blur, glowing borders, and inner light reflections. Cards feel like premium frosted glass panels, not flat dark boxes.

**Why this priority**: Glass morphism is the visual language of premium modern UI. Flat dark cards look outdated.

**Independent Test**: View any card (group, venue, fact, legend). It should have a visible frosted glass quality — translucent, with a glowing border and subtle inner glow.

**Acceptance Scenarios**:
1. **Given** a fan views any card, **Then** the card background is translucent (not fully opaque black)
2. **Given** the card has a border, **Then** the border has a subtle glow or gradient (not a plain flat line)
3. **Given** the fan hovers a card, **Then** the glass effect intensifies — brighter border glow, slight lift

---

### User Story 5 — Update Log / Changelog (Priority: P2)

A changelog is maintained that records every major update made to the site. Visible as `CHANGELOG.md` in the repo root. This lets the team track what changed, when, and why — project management discipline.

**Why this priority**: User explicitly requested a main log of updates.

**Independent Test**: `CHANGELOG.md` exists at repo root with at least 3 entries covering the work done so far.

**Acceptance Scenarios**:
1. **Given** the repo is checked, **Then** `CHANGELOG.md` exists with semantic version entries
2. **Given** a new feature is shipped, **Then** a new entry is added to CHANGELOG.md before merging to main

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hero MUST show a real football (soccer) image — stadium, pitch, or player with round ball
- **FR-002**: ALL images on the site MUST show football (soccer) content — zero American football imagery
- **FR-003**: Cards MUST use glass morphism: `backdrop-filter: blur`, translucent background, glowing border
- **FR-004**: Every section MUST have a distinct scroll-reveal animation — no two sections identical
- **FR-005**: Hover states on all cards MUST produce a visible interactive effect (glow, lift, shimmer)
- **FR-006**: Parallax depth MUST be present in the hero — at least 2 layers moving at different speeds
- **FR-007**: `CHANGELOG.md` MUST exist at repo root with entries for all 3 features built so far
- **FR-008**: The overall aesthetic MUST feel glossy and futuristic — no flat/matte/boxy appearance

---

## Success Criteria *(mandatory)*

- **SC-001**: Any user immediately identifies all imagery as football (soccer) — zero ambiguity
- **SC-002**: Every card on the page has a visible glass effect (translucent bg + glowing border)
- **SC-003**: The site receives a qualitative rating of "premium / broadcast quality" from the user on first view
- **SC-004**: `CHANGELOG.md` has ≥3 versioned entries covering features 001, 002, 003
- **SC-005**: Build passes with zero TypeScript errors after all changes

---

## Assumptions

- Football (soccer) images will be sourced specifically searching "soccer" not "football" on Unsplash to avoid American football results
- Glass morphism uses CSS `backdrop-filter: blur(12px)` with `background: rgba(13,17,23,0.6)` — supported in all modern browsers
- Existing Framer Motion animations are upgraded, not replaced from scratch
- The player-1.jpg, player-2.jpg files may need replacement if they show American football — verified first
