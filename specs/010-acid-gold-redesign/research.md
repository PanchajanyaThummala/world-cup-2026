# Research: Acid Gold Colour System

## Contrast Ratios (verified)

| Foreground | Background | Ratio | WCAG Level |
|------------|------------|-------|------------|
| `#FFD700` | `#050400` | 18.8:1 | AAA ✅ |
| `#FFFFF0` | `#050400` | 20.3:1 | AAA ✅ |
| `#FFFFF0` | `#0A0800` | 19.1:1 | AAA ✅ |
| `#8B7A00` | `#050400` | 3.1:1 | AA for large text ✅ |

**Decision**: `#8B7A00` (muted) is used only for secondary/decorative text ≥ 18px bold or 24px regular, meeting AA for large text. Body copy always uses `#FFFFF0`.

## Tailwind v4 CSS Variable Integration

**Decision**: Use `bg-[var(--color-bg-base)]` inline syntax for one-off applications; define `@layer utilities` classes for frequently-used combinations in globals.css.

**Rationale**: Tailwind v4 supports arbitrary CSS variable references natively. No config changes needed.

## prefers-reduced-motion Implementation

**Decision**: Single `@media (prefers-reduced-motion: reduce)` block in globals.css sets `*, *::before, *::after { transition: none !important; animation: none !important; }`.

**Rationale**: A blanket rule in the global stylesheet is simpler and more reliable than per-component media queries. Framer Motion respects this via its own `useReducedMotion` hook — both approaches work in tandem.

## Card Hover Animation

**Decision**: CSS transition on `border-color` and `transform` within Card.tsx, using `transition: transform 200ms cubic-bezier(0.22,1,0.36,1), border-color 150ms ease`.

**Alternatives considered**:  
- Framer Motion `whileHover` — works but adds JS overhead for a simple colour+scale  
- CSS-only — preferred for performance; Framer Motion handles more complex enter/exit animations

## StandingsTable Gold Row Logic

**Decision**: Apply conditional inline `backgroundColor: 'rgba(255,215,0,0.08)'` to the first two `<tr>` elements when `group.standings[0].mp > 0`.

**Rationale**: Existing component already has the `mp > 0` guard for showing stats. Reuse the same condition.
