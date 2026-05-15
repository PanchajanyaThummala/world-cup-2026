# Quickstart: Acid Gold Implementation

## Verification Steps

After each task group, verify:

```bash
# Tests still pass
npm run test -- --run

# Dev server renders correctly
npm run dev
# Open http://localhost:5173 and inspect:
# - Background: warm black (not cool grey)
# - Gold accents: bright #FFD700 (not muted #C9A84C)
# - Text: ivory #FFFFF0 (not pure white)
```

## File Change Order

1. `src/styles/globals.css` — token definitions (all components inherit)
2. `src/components/ui/Card.tsx` — shared primitive (affects all card types)
3. Layout components — Navbar, CountdownBanner, MobileNav, Footer
4. Feature components — HeroSection, TournamentStats, StandingsTable
5. Card variants — VenueCard, MomentCard, ImpactStoryCard, LegendCard, FactCard, BracketSlot

## Token Reference Card

```css
var(--color-bg-base)       /* #050400  — page background */
var(--color-bg-surface)    /* #0A0800  — card/panel background */
var(--color-primary)       /* #FFD700  — gold accent */
var(--color-text-primary)  /* #FFFFF0  — body text */
var(--color-text-secondary)/* #8B7A00  — muted text (large text only) */
var(--color-border)        /* rgba(255,215,0,0.15) — default border */
var(--color-border-hover)  /* #FFD700  — hover border */
```
