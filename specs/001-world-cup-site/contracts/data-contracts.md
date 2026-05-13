# Data Contracts: World Cup 2026 Website

**Date**: 2026-05-13

Each `src/data/*.ts` file MUST export a named constant matching the contract below.
All types imported from `src/types/index.ts`.

---

## `src/data/teams.ts`

```typescript
export const TEAMS: Team[] = [...];
// MUST contain exactly 48 entries
// Each team.code MUST be unique
// Each team.group MUST be one of "A"–"L"
```

## `src/data/groups.ts`

```typescript
export const GROUPS: Group[] = [...];
// MUST contain exactly 12 entries (A–L)
// Each group.standings MUST contain exactly 4 entries
// All standings zeroed for pre-tournament state
```

## `src/data/venues.ts`

```typescript
export const VENUES: Venue[] = [...];
// MUST contain exactly 16 entries
// 11 country: 'USA', 2 country: 'Canada', 3 country: 'Mexico'
```

## `src/data/moments.ts`

```typescript
export const HISTORIC_MOMENTS: HistoricMoment[] = [...];
// MUST contain ≥15 entries
// Years MUST be valid World Cup years only
// Must span at least 5 different eras
```

## `src/data/impact-stories.ts`

```typescript
export const IMPACT_STORIES: ImpactStory[] = [...];
// MUST contain ≥6 entries
// Must cover at least 3 different ImpactCategory values
```

## `src/data/facts.ts`

```typescript
export const DEEP_FACTS: DeepFact[] = [...];
// MUST contain ≥10 entries
// Must have at least 1 entry per FactCategory
```

## `src/data/bracket.ts`

```typescript
export const KNOCKOUT_BRACKET: KnockoutSlot[] = [...];
// R32: 32 slots, R16: 16 slots, QF: 8, SF: 4, Final: 1, 3rd: 1
// Pre-tournament: all teamA/teamB = 'TBD', no scores/winners
```

## `src/data/schedule.ts`

```typescript
export const MATCHES: Match[] = [...];
// MUST include all 72 group stage matches
// Dates MUST be between 2026-06-11 and 2026-07-19
// venue ids MUST reference entries in VENUES
```
