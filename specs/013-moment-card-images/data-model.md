# Data Model: Moment Card Images

## Existing entity — no changes

```typescript
interface HistoricMoment {
  id: string
  year: number
  host: string
  title: string
  narrative: string
  significance: string
  era: Era
  category: MomentCategory
  photo?: string      // ← path relative to site root, e.g. "images/moments/2002-senegal-france.avif"
  sourceUrl?: string
}
```

The `photo` field already exists and is already rendered by `MomentCard.tsx`. No type changes.

## File asset convention

```
public/images/moments/<YYYY>-<team-a>-<team-b>.<ext>
```

The `photo` value in `moments.ts` must match this path exactly (without leading `/`).

## moment-011 after change

```typescript
{
  id: 'moment-011',
  year: 2002,
  host: 'South Korea/Japan',
  title: 'Senegal Stun France',
  photo: 'images/moments/2002-senegal-france.avif',   // ← added
  sourceUrl: 'https://www.fifa.com/en/articles/world-cup-upsets-france-senegal',
  // ...rest unchanged
}
```
