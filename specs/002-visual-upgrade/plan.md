# Implementation Plan: Visual Upgrade — Editorial Layout & Player Imagery

**Branch**: `002-visual-upgrade` | **Date**: 2026-05-13 | **Spec**: [spec.md](./spec.md)

---

## Summary

Update the existing World Cup 2026 website to fix congested layouts, add a photographic hero background, introduce a new Legends section with player imagery, integrate photos into the nostalgia timeline, and enforce consistent breathing room throughout all sections. All changes target existing components — no new pages.

---

## Technical Context

**Language/Version**: TypeScript 6.0.3 + React 19.2.6 (existing)
**Primary Dependencies**: Framer Motion 12, Tailwind CSS v4, Vite 8 (all existing — no new packages)
**New assets**: `public/images/hero-bg.jpg`, `public/images/players/player-1.jpg`, `player-2.jpg`, `trophy.jpg` (all downloaded ✅)
**Testing**: Vitest + RTL (extend existing suite)
**Constraints**: Hero image eager + fetchpriority=high; all others lazy; no new npm packages; no licensed likenesses without attribution

---

## Constitution Check

- [x] Principle I — Fan Experience: Photography and whitespace directly serve emotional engagement
- [x] Principle II — Component-Driven: New `LegendCard`/`LegendsSection` self-contained with TS props
- [x] Principle III — Test-First: New components get tests before implementation
- [x] Principle IV — Performance: Hero image eager; all others lazy; explicit dimensions prevent CLS
- [x] Principle V — Simplicity: No new deps; no new pages; targeted edits only
- [x] Principle VI — Dependency Vetting: No new packages — N/A

---

## Files to Create

```
src/components/features/legends/
├── LegendsSection.tsx
└── LegendCard.tsx
src/data/legends.ts
```

## Files to Update

```
src/components/features/hero/HeroSection.tsx   ← photo bg, remove congestion, simplify above-fold
src/components/features/nostalgia/MomentCard.tsx ← optional photo + gradient fallback
src/components/features/nostalgia/Timeline.tsx  ← pass photo to MomentCard
src/data/moments.ts                             ← add photo? field to some entries
src/components/layout/SectionWrapper.tsx        ← more vertical padding
src/App.tsx                                     ← insert LegendsSection
src/types/index.ts                              ← add photo? to HistoricMoment + Legend interface
```

---

## Hero Redesign — Above-the-Fold Simplification

**Before (congested)**: photo bg + eyebrow + 2 char-reveal lines + giant "2026" + 3 host pills + 5 stat counters + 2 soccer balls + grid overlay + particle canvas

**After (editorial — 3 zones above fold)**:
1. Full-screen photo background with dark gradient overlay
2. Large "FIFA WORLD CUP 2026" title in Bebas Neue
3. Single subtitle: dates + host nations on one line
4. Stats moved to a `TournamentStats` sub-section immediately below the hero
5. One soccer ball — floating right edge only

---

## Legends Content (6 players)

| Player | Nation | Era | Photo |
|--------|--------|-----|-------|
| Pelé | Brazil 🇧🇷 | 1958–1970 Dynasty | player-1.jpg |
| Diego Maradona | Argentina 🇦🇷 | Hand of God Era | player-2.jpg |
| Zinedine Zidane | France 🇫🇷 | Golden Generation | gradient |
| Ronaldo Nazário | Brazil 🇧🇷 | The Phenomenon Era | trophy.jpg |
| Miroslav Klose | Germany 🇩🇪 | Record Breaker Era | gradient |
| Lev Yashin | USSR 🇷🇺 | The Black Spider Era | gradient |

---

## Spacing Audit

- `SectionWrapper`: `py-24 md:py-32` → `py-32 md:py-40`
- `SectionHeading` gap: `mb-16` → `mb-20`
- All cards: enforce `p-6` minimum inner padding
- Hero: remove all secondary elements above fold; one clean transition into stats
