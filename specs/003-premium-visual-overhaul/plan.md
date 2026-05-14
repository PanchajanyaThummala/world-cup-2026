# Implementation Plan: Premium Visual Overhaul — Glossy Futuristic $10k Design

**Branch**: `003-premium-visual-overhaul` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)

---

## Summary

Overhaul the existing World Cup 2026 website to feel like a $10k premium broadcast-grade production. Replace American football imagery with verified soccer imagery, introduce glass morphism card system, gradient hero title, distinct per-section scroll animations, and a maintained `CHANGELOG.md`. No new dependencies, no new pages — visual upgrade only.

---

## Technical Context

**Language/Version**: TypeScript 6.0.3 + React 19.2.6 (existing)
**Primary Dependencies**: Framer Motion 12, Tailwind CSS v4, Vite 8 (no new packages)
**New Assets**: 4 verified soccer images already downloaded to `public/images/`:
- `hero-bg.jpg` — Allianz Arena night soccer match
- `players/player-1.jpg` — soccer player kicking ball in air
- `players/player-2.jpg` — soccer player kicking ball on field
- `players/fans.jpg` — Argentina World Cup soccer fans

**Storage**: Static assets only

**Testing**: Existing Vitest + RTL suite (37 tests passing baseline)

**Performance Goals**: Lighthouse Performance ≥ 80 after glass effects + gradient text

**Constraints**:
- No new npm packages — work within current stack
- All images must be verified soccer content (not American football)
- Glass morphism must use `backdrop-filter` with fallback for older browsers
- `prefers-reduced-motion` must collapse all entry animations to fade-only

---

## Constitution Check

- [x] **Principle I — Fan Experience**: Premium visual feel directly elevates emotional engagement
- [x] **Principle II — Component-Driven**: Card glass system applied via single Card primitive — all feature cards inherit
- [x] **Principle III — Test-First**: Existing tests must continue to pass; new behavioral changes covered
- [x] **Principle IV — Performance**: `backdrop-filter` is GPU-accelerated; gradient text is paint-only (no layout)
- [x] **Principle V — Simplicity**: No new deps, no new pages, no new state management
- [x] **Principle VI — Dependency Vetting**: No new packages added — N/A

---

## Files to Update

```
src/components/ui/Card.tsx                              ← glass morphism base
src/components/features/hero/HeroSection.tsx            ← gradient title, soccer photo, CTA button, lens flare
src/components/features/groups/GroupCard.tsx            ← 3D card flip-in animation
src/components/features/venues/VenueCard.tsx            ← glass style, larger padding
src/components/features/facts/FactCard.tsx              ← glass style, organic stagger
src/components/features/impact/ImpactStoryCard.tsx      ← glass style, prominent era badge
src/components/features/legends/LegendCard.tsx          ← cinematic blur-to-focus entry
src/components/ui/SectionHeading.tsx                    ← typography contrast upgrade
src/styles/globals.css                                  ← stronger body text contrast
```

## Files to Create

```
CHANGELOG.md                                            ← Keep a Changelog format
```

---

## Glass Morphism Spec

```typescript
// Base card style — applied via Card primitive
{
  background: 'rgba(13, 17, 23, 0.65)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(201, 168, 76, 0.12)',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
}

// Hover state
{
  borderColor: 'rgba(201, 168, 76, 0.4)',
  boxShadow: '0 8px 40px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.07)',
  y: -4,
}
```

---

## Hero Gradient Title

```css
background: linear-gradient(135deg, #F0D98B 0%, #C9A84C 50%, #A8842A 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

Applied to "WORLD CUP" text only. "FIFA" stays solid white. "2026" uses webkit-text-stroke for outline effect.

---

## Distinct Section Animation Variants

| Section | Variant | Why |
|---------|---------|-----|
| Hero | parallax + staggered text reveal | establishes vocabulary |
| Stats | count-up | numerical emphasis |
| Groups | 3D rotateY flip-in | adds dimension to dense data |
| Venues | fadeInUp staggered | quiet, supports content |
| Nostalgia | alt slideInLeft/Right | editorial rhythm |
| Impact | scaleIn + gold border draw | emotional weight |
| Legends | scale+blur cinematic focus | dramatic showcase |
| Facts | random-delay stagger | organic, surprising |
| Bracket | column-by-column reveal | competitive narrative |

---

## CHANGELOG.md Format

Keep a Changelog v1.1.0 standard:
- `[0.3.0]` — 2026-05-14 — Premium visual overhaul
- `[0.2.0]` — 2026-05-13 — Visual upgrade + Legends section
- `[0.1.0]` — 2026-05-13 — Initial site build, 7 sections
