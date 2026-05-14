---
description: "Premium visual overhaul — glass morphism, soccer imagery, $10k aesthetic"
---

# Tasks: Premium Visual Overhaul

**Branch**: `003-premium-visual-overhaul`

---

## Phase 1: Fix Soccer Images

- [x] T001 Search and download verified SOCCER images to `public/images/`: hero (soccer stadium night crowd), player-action-1 (player kicking ball), player-action-2 (footballer celebration/dribble) — overwrite existing player-1.jpg, player-2.jpg with confirmed soccer images

## Phase 2: Glass Morphism System

- [x] T002 Update `src/components/ui/Card.tsx` — replace flat opaque bg with glass: `rgba(13,17,23,0.65)`, `backdrop-filter: blur(12px)`, gold-tinted border, inset top highlight; hover: gold glow shadow + border brighten
- [x] T003 [P] Update `src/components/features/groups/GroupCard.tsx` — increase min-height, `p-6` inner padding, glass card style
- [x] T004 [P] Update `src/components/features/venues/VenueCard.tsx` — glass style, more padding, city in larger text
- [x] T005 [P] Update `src/components/features/facts/FactCard.tsx` — glass style, hook text larger (text-lg)
- [x] T006 [P] Update `src/components/features/impact/ImpactStoryCard.tsx` — glass style, era badge more prominent

## Phase 3: Hero — Gradient Title + Real Soccer Photo

- [x] T007 Update `src/components/features/hero/HeroSection.tsx`:
  - Replace hero-bg.jpg with downloaded soccer stadium image
  - "WORLD CUP" text → gold gradient clip text (linear-gradient → webkit-background-clip: text)
  - Add subtle light streak / lens flare SVG overlay element in top-right corner
  - Increase title size: `clamp(80px, 15vw, 200px)`

## Phase 4: Distinct Section Animations

- [x] T008 Update `src/components/features/groups/GroupCard.tsx` — replace scaleIn with `rotateY: [-8deg, 0deg]` 3D card flip on entry
- [x] T009 [P] Update `src/components/features/legends/LegendCard.tsx` — entry: `scale: 0.85, filter: blur(4px)` → `scale: 1, filter: blur(0)` cinematic focus-in
- [x] T010 [P] Update `src/components/features/facts/FactCard.tsx` — random delay (index * random 0.04–0.12) for organic stagger

## Phase 5: Typography & Contrast Upgrade

- [x] T011 Update `src/styles/globals.css` — body text `color: #E5E7EB` (neutral-200 not 400), increase base contrast
- [x] T012 [P] Update `src/components/ui/SectionHeading.tsx` — subtitle font-size 18px, color neutral-300 (not 400); eyebrow tracking wider

## Phase 6: Changelog

- [x] T013 Create `CHANGELOG.md` at repo root with entries for v0.1.0 (initial site), v0.2.0 (visual upgrade), v0.3.0 (this premium overhaul)

## Phase 7: Build + Push

- [x] T014 Run `npm run build` — fix any errors
- [x] T015 Run `npm run test:run` — fix any failures
- [x] T016 Commit + push `003-premium-visual-overhaul` branch to GitHub
