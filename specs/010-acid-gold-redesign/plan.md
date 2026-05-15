# Implementation Plan: Acid Gold Colour System Redesign

**Branch**: `010-acid-gold-redesign` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)

## Summary

Replace all colour tokens and component colour references across the World Cup 2026 React site with the Acid Gold palette (`#050400` background, `#FFD700` primary, `#FFFFF0` text). Changes are CSS-token-only with targeted Tailwind class updates — no layout, logic, or data changes. Apply `prefers-reduced-motion` guards and ensure 44px touch targets throughout.

## Technical Context

**Language/Version**: TypeScript 6, React 19

**Primary Dependencies**: Vite 8, Tailwind CSS v4, Framer Motion 12

**Storage**: N/A (static site)

**Testing**: Vitest + React Testing Library (40 existing tests)

**Target Platform**: Web browser (desktop + mobile)

**Project Type**: Static React web application

**Performance Goals**: All hover/focus transitions ≤ 300ms; zero layout shift from colour change

**Constraints**: No new npm dependencies; no layout/structure changes; all 40 tests must pass

**Scale/Scope**: ~20 source files touched (1 CSS file, 1 Card primitive, ~15 feature components, 3 layout components)

## Constitution Check

No gate violations. This is a CSS token replacement — no new dependencies, no architecture changes, no data model changes.

## Project Structure

### Documentation (this feature)

```text
specs/010-acid-gold-redesign/
├── plan.md              # This file
├── research.md          # Colour token research + contrast ratios
├── quickstart.md        # File-by-file change guide
├── contracts/           # Component colour contract
└── tasks.md             # /speckit-tasks output
```

### Source Code (files to be modified)

```text
src/
├── styles/
│   └── globals.css                          # Token replacement (primary change)
├── components/
│   ├── ui/
│   │   └── Card.tsx                         # Surface token + hover motion
│   ├── layout/
│   │   ├── Navbar.tsx                       # Token refs + active link colour
│   │   ├── CountdownBanner.tsx              # Token refs
│   │   ├── MobileNav.tsx                    # Token refs
│   │   └── Footer.tsx                       # Token refs
│   └── features/
│       ├── hero/
│       │   ├── HeroSection.tsx              # Gradient tokens
│       │   └── TournamentStats.tsx          # Number colour token
│       ├── groups/
│       │   └── StandingsTable.tsx           # Gold row logic
│       ├── venues/
│       │   └── VenueCard.tsx               # Token refs
│       ├── nostalgia/
│       │   └── MomentCard.tsx              # Token refs
│       ├── impact/
│       │   └── ImpactStoryCard.tsx         # Token refs
│       ├── legends/
│       │   └── LegendCard.tsx              # Token refs
│       ├── facts/
│       │   └── FactCard.tsx                # Token refs
│       └── bracket/
│           └── BracketSlot.tsx             # Token refs
```

## Colour Token Mapping

| Old Token / Value | New Token / Value | Usage |
|-------------------|-------------------|-------|
| `--color-gold-500: #C9A84C` | `--color-primary: #FFD700` | All gold accents |
| `--color-neutral-950: #080A0F` | `--color-bg-base: #050400` | Page background |
| `--color-neutral-900: #0D1117` | `--color-bg-surface: #0A0800` | Card/surface backgrounds |
| `--color-neutral-50: #F9FAFB` | `--color-text-primary: #FFFFF0` | Body text |
| `--color-neutral-400: #9CA3AF` | `--color-text-secondary: #8B7A00` | Muted/secondary text |
| `rgba(255,215,0,0.15)` | `--color-border` | Default card borders |
| `#FFD700` | `--color-border-hover` | Hovered card borders |

## Motion Standards

| Property | Value |
|----------|-------|
| Micro-interaction duration | 150ms |
| Standard transition duration | 200ms |
| Complex/page transition | 300–400ms |
| Easing (enter) | `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) |
| Card hover scale | `1.02` |
| Reduced-motion | `transition: none; animation: none` |

## Complexity Tracking

No violations to justify.
