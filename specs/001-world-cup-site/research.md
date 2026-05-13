# Research: World Cup 2026 Cinematic Fan Website

**Date**: 2026-05-13 | **Branch**: `001-world-cup-site`

---

## Decision 1: Build Tool

**Decision**: Vite 5 with `@vitejs/plugin-react`

**Rationale**: Fastest cold-start dev server, native ESM, excellent Tailwind v4 integration via
`@tailwindcss/vite`. Create React App is deprecated. Next.js adds SSR complexity unnecessary
for a static site. Vite's `vite build` + Vercel static adapter is the simplest path to Lighthouse ≥ 85.

**Alternatives considered**: Next.js (overkill, SSR not needed), CRA (deprecated), Parcel (less ecosystem support)

---

## Decision 2: CSS Framework — Tailwind CSS v4

**Decision**: Tailwind CSS v4 with `@tailwindcss/vite` plugin

**Rationale**: v4 uses `@theme` directive in CSS for token definition — no `tailwind.config.js` needed for
simple token overrides. Zero-runtime, tree-shaken output. Works perfectly with Vite. The gold/dark
design system maps cleanly to CSS custom properties via `@theme`.

**Alternatives considered**: Tailwind v3 (valid but v4 is current and simpler with Vite), CSS Modules
(verbose for utility-heavy design), styled-components (runtime overhead)

---

## Decision 3: Animation Library — Framer Motion v11

**Decision**: Framer Motion 11 with `whileInView` + `viewport: { once: true }` pattern

**Rationale**: Purpose-built for React. `whileInView` eliminates Intersection Observer boilerplate.
`useReducedMotion()` hook provides first-class accessibility support. Layout animations and shared
element transitions available for future enhancements. Performance: uses CSS `transform` + `opacity`
only (no layout thrashing).

**Key patterns used**:
- `motion.div` with `variants` for reusable animation presets
- `staggerChildren` on container for list reveals
- `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 20 }}`
- `viewport={{ once: true, margin: "-100px" }}` to trigger slightly before fully visible

**Alternatives considered**: GSAP (excellent but heavier, less React-native), CSS animations
(no scroll-trigger without IntersectionObserver boilerplate), React Spring (similar capability
but Framer Motion has better DX)

---

## Decision 4: State Management — Local React State Only

**Decision**: No external state management library. `useState` + `useContext` where needed.

**Rationale**: The site is read-only data display. The only interactive state is:
1. Active nav section (single string)
2. Expanded venue/moment cards (local boolean per component)
3. Bracket display state (static for v1 — no user edits)

Props drill at most 2 levels. No global cart, auth, or mutations. Zustand/Redux would be overkill.

**Alternatives considered**: Zustand (good choice for v2 if bracket becomes editable), Jotai,
Redux Toolkit (all unnecessary complexity for v1)

---

## Decision 5: Routing — No Router, Smooth Scroll

**Decision**: Single HTML page with `id` anchors + smooth scroll navigation. No React Router.

**Rationale**: All content lives on one page. No URL-based routing needed for v1. Smooth scroll
to `#hero`, `#groups`, `#nostalgia`, `#impact`, `#facts`, `#bracket` via `scrollIntoView()`.
Navbar highlights active section using IntersectionObserver on section elements.

**Alternatives considered**: React Router v6 (adds bundle weight, unnecessary for SPA sections),
TanStack Router (same concern)

---

## Decision 6: Testing — Vitest + React Testing Library

**Decision**: Vitest with `@testing-library/react` and `jsdom` environment

**Rationale**: Vitest is Vite-native (shares config, ~10x faster than Jest for Vite projects).
RTL encourages testing user behavior over implementation details. `jsdom` handles DOM APIs.

**Test strategy**:
- Unit tests: all `src/components/ui/` primitives
- Integration tests: each major section renders with real data
- Data integrity tests: validate all 48 teams present, 12 groups correct, etc.

---

## Decision 7: 2026 Tournament Data

**Decision**: Hardcode the actual FIFA 2026 draw in TypeScript constant files

**Rationale**: The draw was announced December 2024. All 48 teams and group assignments are
known. Venues and host cities are confirmed. Using real data makes the site genuinely useful
and accurate, not placeholder-populated.

**Group assignments** (Official FIFA World Cup 2026 draw — December 5, 2025, Washington D.C.
Verified against Fox Sports and NBC Sports on 2026-05-13. No discrepancies between sources.):

| Group | Team 1 | Team 2 | Team 3 | Team 4 |
|-------|--------|--------|--------|--------|
| A | Mexico | South Korea | South Africa | Czechia |
| B | Canada | Switzerland | Qatar | Bosnia-Herzegovina |
| C | Brazil | Morocco | Scotland | Haiti |
| D | USA | Paraguay | Australia | Türkiye |
| E | Germany | Ecuador | Ivory Coast | Curaçao |
| F | Netherlands | Japan | Tunisia | Sweden |
| G | Belgium | Iran | Egypt | New Zealand |
| H | Spain | Uruguay | Saudi Arabia | Cape Verde |
| I | France | Senegal | Norway | Iraq |
| J | Argentina | Austria | Algeria | Jordan |
| K | Portugal | Colombia | Uzbekistan | DR Congo |
| L | England | Croatia | Panama | Ghana |

**Notable facts confirmed by the draw**:
- Mexico appears once only — Group A (opening match host, Estadio Azteca) ✅
- Italy did NOT qualify for the 2026 World Cup
- Curaçao qualified via CONCACAF (confirmed, not an error)
- Haiti qualified via CONCACAF (confirmed)
- Qatar qualified as a team (not host — 2026 hosts are USA, Canada, Mexico)
- Cape Verde qualified via CAF
- No team appears in more than one group ✅

---

## Decision 8: Deployment — Vercel Static

**Decision**: Vercel with automatic GitHub deploy, no server functions

**Rationale**: Free tier sufficient, global CDN, instant rollback, automatic HTTPS. `vercel.json`
SPA rewrite handles direct URL access. Build time under 60 seconds for this project size.

---

## Decision 9: Image Strategy

**Decision**: No hero background images for v1 — use CSS gradients + SVG patterns

**Rationale**: Eliminates LCP image optimization complexity. Dark cinematic look achievable via
layered CSS gradients (`radial-gradient` + `linear-gradient`) with gold color stops. No external
image CDN needed. Team flags use emoji (🇧🇷, 🇩🇪 etc.) — zero-cost, accessible, universal.

**For future**: Background video or WebP hero image could be added in v2 with explicit
`fetchpriority="high"` and `loading="eager"` attributes.
