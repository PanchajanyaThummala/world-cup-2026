# Component Contracts: Countdown + UI Polish

## New Components

### CountdownBanner
```typescript
// src/components/layout/CountdownBanner.tsx
// No props — internally computes target, ticks, and handles live mode
```

### useCountdown hook
```typescript
// src/hooks/useCountdown.ts
type CountdownState =
  | { phase: 'countdown'; days: number; hours: number; minutes: number; seconds: number }
  | { phase: 'live'; matchday: number }

function useCountdown(targetISO: string): CountdownState
```

## Updated Component Behaviors

### Flag rendering pattern (used by every flag-and-name pair)
```tsx
<div className="flex items-center gap-2">
  <span aria-hidden="true">{flag}</span>
  <span>{name}</span>
</div>
```
Drop: `aria-label` on flag spans, string concatenation, inline space chars.

### VenueCard (updated)
Three explicit rows in vertical stack:
1. Country flag + country name (small eyebrow style)
2. City (and optional state) — main heading style
3. Capacity formatted number with "capacity" label

### StandingsTable (updated)
- Table uses `table-layout: fixed`
- Column widths controlled by `<colgroup>` or width classes
- Top-2 rows get tinted background + left gold border

### BracketSlot (updated)
- Detect `slot.teamA === 'TBD' && slot.teamB === 'TBD'` → render empty state with dashed border + icon + "Awaiting" text
- Otherwise render normally

### Hero CTA (updated)
- Padding: `px-10 py-4` (was `px-8 py-4`)
- Letter-spacing: `0.06em` (was `0.14em`)
- Pulse: gold box-shadow animation 2s loop
