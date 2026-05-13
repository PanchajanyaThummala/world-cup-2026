<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0
Modified principles: None
Added sections: VI. Dependency Vetting (new principle)
Removed sections: None
Templates updated:
  ✅ .specify/templates/plan-template.md — Constitution Check gates updated
  ✅ research.md for 001-world-cup-site — corrected to real package versions
Follow-up TODOs: None
-->

# World Cup 2026 Constitution

## Core Principles

### I. Fan Experience First

Every feature, component, and decision MUST serve the fan's experience above all else.
The website exists to celebrate football's greatest tournament — all choices optimize for
delight, clarity, and emotional resonance.

- All interactions MUST feel instant (perceived performance ≤ 100ms)
- Visual design MUST be cinematic: deep dark backgrounds, gold accents, editorial typography
- Motion MUST enhance storytelling, never distract — Framer Motion animations are purposeful
- Content MUST educate and inspire, not just display data

### II. Component-Driven Architecture

Every UI element MUST be built as a self-contained, independently testable component.

- Components MUST declare explicit TypeScript prop contracts
- Components MUST be composable — no monolithic page components
- Shared primitives (Button, Card, Badge) live in `src/components/ui/`
- Feature components live in `src/components/features/[feature-name]/`
- No component may depend on global state unless strictly unavoidable and documented

### III. Test-First (NON-NEGOTIABLE)

TDD is mandatory. Tests are written and confirmed to fail BEFORE implementation begins.
Red → Green → Refactor is the only acceptable development cycle.

- Every component MUST have a corresponding test file
- Integration tests cover all user-facing flows
- No feature ships without passing tests
- Test coverage gates: components ≥ 80%, critical paths ≥ 95%

### IV. Performance by Default

Every feature MUST meet Core Web Vitals thresholds from day one. Performance is a
feature, not an afterthought.

- LCP MUST be ≤ 2.5s on a mid-range mobile device
- CLS MUST be ≤ 0.1
- FID/INP MUST be ≤ 200ms
- Framer Motion animations MUST use `will-change` and `transform` — no layout-triggering props
- Images MUST be lazy-loaded with explicit width/height to prevent CLS
- Bundle MUST be code-split by route

### V. Simplicity & YAGNI

Start with the simplest implementation that delivers user value.
No premature abstractions. No over-engineering.

- Three similar components is better than a complex abstraction
- Add state management only when prop drilling exceeds 3 levels
- No feature flags, compatibility shims, or dead code
- Delete unused code immediately — the repo is not an archive

### VI. Dependency Vetting (NON-NEGOTIABLE)

Before adding any npm package, verify it is safe and compatible with the rest of the stack.
Never assume a planned version is the current stable version.

- Run `npm info <package> version` to confirm the actual latest release before installing
- Run `npm info <package> peerDependencies` to confirm compatibility with React, Vite, and TypeScript versions in use
- Never pin to a specific version without a documented reason — use `^` ranges against verified latest
- If a package's peer deps conflict with another in the stack, find an alternative or upgrade the conflicting package
- Document every version decision in `research.md` under the relevant package decision section
- Re-verify all peer dependencies whenever a major dependency (React, Vite, TypeScript) is upgraded

## Design System Standards

The visual language is non-negotiable and MUST be applied consistently across all features.

**Color Tokens** (defined in `tailwind.config.ts`):
- `gold-400` / `gold-500` / `gold-600` — primary accent, CTAs, highlights
- `neutral-950` / `neutral-900` / `neutral-800` — background layers
- `neutral-100` / `neutral-200` — body text, secondary text

**Spacing**: 8px base grid. All spacing values MUST be multiples of 8px (or 4px for micro-spacing).

**Typography**: Editorial magazine style — large display type, tight leading, mixed weights.

**Motion**: All animations via Framer Motion. Enter animations use `fadeInUp` (y: 20 → 0, opacity: 0 → 1).
Stagger children with 0.1s delay. Page transitions use shared layout animations where possible.

**Layout**: Full-bleed sections with `max-w-7xl` content containers, centered with `mx-auto px-6`.

## Development Workflow

All features follow the Spec Kit pipeline in order. No shortcuts.

1. `/speckit-specify` — Define WHAT and WHY (user value, not implementation)
2. `/speckit-clarify` — Resolve ambiguities before planning
3. `/speckit-plan` — Define HOW (technical approach, architecture, data model)
4. `/speckit-tasks` — Break into atomic, independently testable tasks
5. `/speckit-implement` — Build task-by-task, test-first

**Branch naming**: `NNN-short-feature-name` (sequential, matching specs/ directory)

**Commit discipline**: One logical change per commit. Conventional commits format.
`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `test:`, `refactor:`

**Constitution Check gates** (enforced in plan.md):
- [ ] Component is self-contained with TypeScript props (Principle II)
- [ ] Test written and failing before implementation (Principle III)
- [ ] Animation uses transform/opacity only (Principle IV)
- [ ] Design tokens used — no hardcoded hex values (Design System)
- [ ] No implementation detail in spec.md (Workflow)

## Governance

This constitution supersedes all other practices, conventions, and preferences.
When in doubt, the constitution wins.

**Amendment procedure**:
1. Identify the principle or section requiring change
2. Document: what changes, why it's needed, what it replaces
3. Bump version per semantic versioning (below)
4. Update all dependent templates and this file atomically

**Versioning policy**:
- MAJOR: Principle removed, redefined, or made incompatible with prior work
- MINOR: New principle or section added, or guidance materially expanded
- PATCH: Clarifications, wording improvements, typo fixes

**Compliance review**: Every plan.md MUST include a Constitution Check section
that explicitly validates each gate before implementation begins.

**Version**: 1.1.0 | **Ratified**: 2026-05-13 | **Last Amended**: 2026-05-13
