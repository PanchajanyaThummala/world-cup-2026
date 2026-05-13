# Component Contracts: World Cup 2026 Website

**Date**: 2026-05-13

These are the TypeScript prop interfaces for all major components. Each component is
self-contained and receives its data via props — no direct store access.

---

## UI Primitives (`src/components/ui/`)

### Badge

```typescript
interface BadgeProps {
  label: string;
  variant?: 'gold' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
}
```

### Card

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;  // Enables gold border hover animation
  onClick?: () => void;
}
```

### Flag

```typescript
interface FlagProps {
  emoji: string;   // "🇧🇷"
  label: string;   // "Brazil" — used as aria-label
  size?: 'sm' | 'md' | 'lg';
}
```

### SectionHeading

```typescript
interface SectionHeadingProps {
  eyebrow?: string;      // Small uppercase label above title: "The Beautiful Game"
  title: string;         // Large display title
  subtitle?: string;     // Supporting paragraph below title
  align?: 'left' | 'center';
}
```

---

## Layout Components (`src/components/layout/`)

### Navbar

```typescript
interface NavbarProps {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
}
```

### SectionWrapper

```typescript
interface SectionWrapperProps {
  id: string;           // Scroll anchor id
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;  // Removes max-w container (for hero)
}
```

---

## Feature Components (`src/components/features/`)

### HeroSection

```typescript
// No props — self-contained, reads from data/tournament.ts constants
interface HeroSectionProps {}
```

### GroupCard

```typescript
interface GroupCardProps {
  group: Group;  // from types/index.ts
}
```

### StandingsTable

```typescript
interface StandingsTableProps {
  standings: GroupStanding[];
  compact?: boolean;  // Hides GF/GA columns on mobile
}
```

### VenueCard

```typescript
interface VenueCardProps {
  venue: Venue;
  showCapacity?: boolean;
}
```

### MomentCard

```typescript
interface MomentCardProps {
  moment: HistoricMoment;
  side: 'left' | 'right';  // Controls alternating layout on desktop
  index: number;             // Used for stagger animation delay
}
```

### ImpactStoryCard

```typescript
interface ImpactStoryCardProps {
  story: ImpactStory;
  index: number;
}
```

### FactCard

```typescript
interface FactCardProps {
  fact: DeepFact;
  index: number;
}
```

### KnockoutBracket

```typescript
interface KnockoutBracketProps {
  slots: KnockoutSlot[];
}
```

### BracketSlot

```typescript
interface BracketSlotProps {
  slot: KnockoutSlot;
  teams: Team[];  // Lookup array for flag/name resolution
}
```

---

## Animation Contract (`src/lib/motion.ts`)

All components MUST use variants from `motion.ts` rather than inline animation objects:

```typescript
export const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  }
} satisfies Record<string, Variants>;
```

**Reduced motion contract**: When `useReducedMotion()` returns `true`, all variants MUST
collapse hidden/visible to `{ opacity: 0 }` / `{ opacity: 1 }` with no positional transforms.
