# Feature Specification: Moment Card Images

**Feature Branch**: `013-moment-card-images`

**Created**: 2026-05-25

**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — View photo on a moment card (Priority: P1)

A site visitor scrolling through the History section sees a real photograph on the 2002 "Senegal Stun France" moment card, making the card more visually compelling and contextually rich.

**Why this priority**: The image for moment-011 is already provided. This is the immediate deliverable.

**Independent Test**: Navigate to the History section. The 2002 Senegal card displays the provided photograph with the same visual treatment as existing photo cards (darkened, with gradient overlay).

**Acceptance Scenarios**:

1. **Given** the History section is visible, **When** the user scrolls to the 2002 moment card, **Then** the photograph is displayed in the card header area, darkened and with a gradient overlay at the bottom.
2. **Given** a moment card has no photo assigned, **When** the user views it, **Then** the card renders the gold accent bar header (existing fallback) — no broken image or blank space.

---

### User Story 2 — Developer adds a new moment image (Priority: P2)

A developer receives a new image file for a historic moment, copies it to the images folder, and maps it to the correct moment in the data file — with a consistent, predictable naming convention.

**Why this priority**: The user stated more images will be provided over time. The folder structure and naming convention must be established now so future additions follow the same pattern.

**Independent Test**: Copy a new image file to `public/images/moments/`, add the filename to the correct entry in `moments.ts`, and reload the site — the card shows the new photo with no other code changes required.

**Acceptance Scenarios**:

1. **Given** a new image file placed in `public/images/moments/`, **When** the `photo` field on the matching moment entry is updated to `images/moments/<filename>`, **Then** the card displays the photo after a page reload.
2. **Given** an incorrectly named or missing file, **When** the page loads, **Then** the card gracefully falls back to the gold accent bar — no site crash or broken layout.

---

### Edge Cases

- What if the image file format is AVIF and the browser does not support it? The card falls back to the gold accent bar (existing `<img>` error handling).
- What if two moments are given images simultaneously? Both should display independently — no shared state.
- What if the image has a very different aspect ratio? The card header has a fixed height (160px) and uses cover/center cropping — any image will fill the space.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST have a dedicated folder `public/images/moments/` for historic moment photographs.
- **FR-002**: The 2002 "Senegal Stun France" moment card (moment-011) MUST display the provided image (`GettyImages-1450134354-2.avif`), copied into `public/images/moments/`.
- **FR-003**: The `photo` field on the `moment-011` data entry MUST be updated to point to the new image path.
- **FR-004**: Moment cards with a `photo` value MUST display the image with a dark overlay and gradient, consistent with the visual style already used by moment-009 and moment-015.
- **FR-005**: Moment cards without a `photo` value MUST continue to display the existing gold accent bar fallback — no regression.
- **FR-006**: The image filename in the moments folder MUST follow a human-readable naming convention (e.g., `2002-senegal-france.avif`) so future additions are easy to identify.

### Key Entities

- **HistoricMoment**: Existing data type. Has optional `photo?: string` field pointing to a public image path relative to the site root (e.g., `images/moments/2002-senegal-france.avif`).
- **Moments image folder**: `public/images/moments/` — the canonical home for all moment card photographs.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of moment cards with a `photo` value display their photograph — 0 broken images.
- **SC-002**: 100% of moment cards without a `photo` value display the gold accent bar fallback — 0 regressions.
- **SC-003**: A developer can add a new moment image in under 2 minutes by following the folder + data-field convention (no additional code changes required).
- **SC-004**: The 2002 Senegal card photograph is visible in the History section on first load without any flash or layout shift.

---

## Assumptions

- The existing `photo` field and card rendering logic (`MomentCard.tsx`) already handles images correctly for moment-009 and moment-015 — this feature reuses that pattern.
- The provided AVIF file is the final, intended image for moment-011; no resizing or conversion is required by the feature itself.
- Image copyright/licensing is the responsibility of the site owner — this feature only handles placement and display.
- All future moment images will be placed in `public/images/moments/` following the same naming convention established here.
- Mobile and desktop display both use the same 160px-height cropped header; no responsive image variants are needed for this feature.
