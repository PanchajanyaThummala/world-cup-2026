# Component Contracts: Fix Padding & Layout

## New Components

### MobileNav
```typescript
// src/components/layout/MobileNav.tsx
interface MobileNavProps {
  sections: Array<{ id: string; label: string }>
  activeSection: string
  onNavigate: (id: string) => void
}
```

## Updated Components

### SectionWrapper
Inner container now uses `padding-left: var(--gutter-x); padding-right: var(--gutter-x)` instead of hardcoded `px-6 md:px-12`.

### Navbar
- Inner container uses `--gutter-x`
- At `<lg` breakpoint, hides desktop links and shows hamburger button + MobileNav

### CountdownBanner
- Outer container uses `--gutter-x` padding
- Removes `"Mexico v TBD · Estadio Azteca"` text
- Replaces with `"Opening match · Mexico City"`

### TournamentStats
- Inner container uses `--gutter-x` padding

### GroupsSection
- Grid container gets `auto-rows-fr` class
- Cards become `h-full flex flex-col`

### GroupCard
- Drop `min-h-[260px]`
- Add `h-full flex flex-col`

### StandingsTable
- Compute `tournamentStarted = standings.some(s => s.mp > 0)`
- Gold treatment applied only when `tournamentStarted && index < 2`
- Otherwise all rows use neutral styling
- Same font weight on all team names when not started
