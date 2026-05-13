# Component Contracts: Visual Upgrade

## New Components

### LegendCard

```typescript
interface LegendCardProps {
  legend: Legend        // from src/types/index.ts
  featured?: boolean    // if true: larger card (2-col span on desktop)
  index: number
}
```

### LegendsSection

```typescript
// No props — self-contained, reads LEGENDS data
interface LegendsSectionProps {}
```

## Updated Component Signatures

### MomentCard (updated)

```typescript
interface MomentCardProps {
  moment: HistoricMoment   // now has optional photo?: string
  side: 'left' | 'right'
  index: number
}
```

### TournamentStats (new, extracted from Hero)

```typescript
interface TournamentStatProps {
  value: number
  label: string
  suffix?: string
}
// Section renders 5 stats from constants — no props on section itself
```

## New Type: Legend

```typescript
interface Legend {
  id: string
  name: string
  nation: string
  flag: string
  era: string        // e.g. "1958–1970 Dynasty"
  description: string // 1–2 sentence bio
  photo?: string     // path relative to public/, e.g. "images/players/player-1.jpg"
}
```

## Updated Type: HistoricMoment

```typescript
// Add optional field:
photo?: string   // path relative to public/, e.g. "images/players/trophy.jpg"
```
