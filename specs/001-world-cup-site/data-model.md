# Data Model: World Cup 2026 Cinematic Fan Website

**Date**: 2026-05-13 | **Source**: `src/types/index.ts`

All types are defined in `src/types/index.ts` and imported by data files and components.

---

## Core Entities

### Team

```typescript
export interface Team {
  name: string;           // "Brazil"
  code: string;           // "BRA" — FIFA 3-letter code
  flag: string;           // "🇧🇷" — emoji flag
  group: string;          // "A" through "L"
  confederation: 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';
}
```

### GroupStanding

```typescript
export interface GroupStanding {
  team: Team;
  mp: number;   // Matches played
  w: number;    // Wins
  d: number;    // Draws
  l: number;    // Losses
  gf: number;   // Goals for
  ga: number;   // Goals against
  gd: number;   // Goal difference (computed: gf - ga)
  pts: number;  // Points (computed: w*3 + d)
}
```

### Group

```typescript
export interface Group {
  label: string;              // "A" through "L"
  name: string;               // "Group A"
  standings: GroupStanding[]; // Always 4 entries, sorted by pts desc
}
```

### Venue

```typescript
export type HostCountry = 'USA' | 'Canada' | 'Mexico';

export interface Venue {
  id: string;               // slug: "sofi-stadium"
  name: string;             // "SoFi Stadium"
  city: string;             // "Los Angeles"
  state?: string;           // "California" (USA venues only)
  country: HostCountry;
  capacity: number;         // 70,000
  isOpeningVenue?: boolean;
  isFinalVenue?: boolean;
}
```

### Match (Schedule)

```typescript
export interface Match {
  id: string;               // "m001"
  date: string;             // ISO 8601: "2026-06-11"
  time: string;             // "20:00 ET"
  stage: 'Group Stage' | 'Round of 32' | 'Round of 16' | 'Quarter-final' | 'Semi-final' | 'Final';
  group?: string;           // "A" (group stage only)
  homeTeam: string;         // team code "USA" or "TBD"
  awayTeam: string;         // team code "MEX" or "TBD"
  venue: string;            // venue id "sofi-stadium"
  homeScore?: number;
  awayScore?: number;
}
```

### HistoricMoment

```typescript
export type Era = '1930s' | '1950s' | '1960s' | '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';

export interface HistoricMoment {
  id: string;               // "moment-001"
  year: number;             // 1970
  host: string;             // "Mexico"
  title: string;            // "The Hand of God"
  narrative: string;        // 2–3 sentence description
  significance: string;     // Why it matters to the game's history
  era: Era;
  category: 'Goal' | 'Match' | 'Player' | 'Final' | 'Upset' | 'Controversy';
}
```

### ImpactStory

```typescript
export type ImpactCategory = 'Politics' | 'Identity' | 'Economics' | 'Social' | 'Human Rights' | 'Diplomacy';

export interface ImpactStory {
  id: string;               // "impact-001"
  year: number;             // 1978
  tournament: string;       // "Argentina 1978"
  title: string;            // "Football Under the Junta"
  narrative: string;        // 3–4 sentences
  eraBadge: string;         // "Cold War Era"
  category: ImpactCategory;
}
```

### DeepFact

```typescript
export type FactCategory = 'Records' | 'Firsts' | 'Oddities' | 'Stats' | 'Forgotten Heroes';

export interface DeepFact {
  id: string;               // "fact-001"
  hook: string;             // Bold one-liner: "Only player to score in 5 World Cups"
  supporting: string;       // 2–3 sentences with context
  category: FactCategory;
  year?: number;            // Tournament year if specific
}
```

### KnockoutSlot

```typescript
export type KnockoutRound = 'R32' | 'R16' | 'QF' | 'SF' | 'Final';

export interface KnockoutSlot {
  id: string;               // "r32-m01"
  round: KnockoutRound;
  matchNumber: number;
  teamA: string | 'TBD';   // team code or "TBD"
  teamB: string | 'TBD';
  scoreA?: number;
  scoreB?: number;
  winner?: string;          // team code of winner
  date?: string;            // ISO date
  venue?: string;           // venue id
}
```

---

## Relationships

```
Group (1) ──────── (4) Team
Group (1) ──────── (4) GroupStanding ── (1) Team
Match (many) ───── (1) Venue
Match (many) ───── (2) Team (homeTeam / awayTeam codes)
KnockoutSlot ───── (2) Team (teamA / teamB codes)
HistoricMoment ── no FK relations (self-contained content)
ImpactStory ────── no FK relations (self-contained content)
DeepFact ────────── no FK relations (self-contained content)
```

---

## Data Volumes

| Entity | Count | Notes |
|--------|-------|-------|
| Team | 48 | 16 UEFA, 6 CONMEBOL, 6 CONCACAF, 9 CAF, 8 AFC, 3 OFC |
| Group | 12 | A through L, 4 teams each |
| Venue | 16 | 11 USA, 2 Canada, 3 Mexico |
| Match | 104 | 72 group stage + 32 knockout |
| HistoricMoment | ≥15 | Covering 1930–2022 |
| ImpactStory | ≥6 | Across 8 eras |
| DeepFact | ≥10 | Across 5 categories |
| KnockoutSlot | 63 | R32(32) + R16(16) + QF(8) + SF(4) + Final(1) + 3rd place(1) + GS→R32 feeders |

---

## Validation Rules

- Every Group MUST have exactly 4 teams
- All 48 team codes MUST be unique
- GroupStanding.gd MUST equal gf - ga
- GroupStanding.pts MUST equal w*3 + d
- Every Match venue id MUST reference an existing Venue id
- HistoricMoment.year MUST be a World Cup year (1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022)
- DeepFact.hook MUST be non-empty and < 100 characters
