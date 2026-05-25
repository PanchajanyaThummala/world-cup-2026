# Research: Moment Card Images

**Feature**: 013-moment-card-images | **Date**: 2026-05-25

## Decision 1: Image folder location

**Decision**: `public/images/moments/`

**Rationale**: Vite serves everything in `public/` as static assets at the root URL. Existing image folders follow `public/images/<category>/` (ball, hero-bg, logo, players). `moments/` is consistent with that pattern.

**Alternatives considered**: `src/assets/moments/` — rejected because Vite would hash the filenames at build time, making the `photo` string in `moments.ts` unmaintainable. `public/` paths are stable.

---

## Decision 2: Image format — keep AVIF as-is

**Decision**: Use the AVIF file directly, no conversion.

**Rationale**: AVIF is supported in all modern browsers (Chrome 85+, Firefox 93+, Safari 16+). The existing card uses `<img>` with no `<picture>` fallback, which is already the pattern for moment-009 and moment-015 (JPG). AVIF delivers better compression than JPG at equal quality.

**Alternatives considered**: Convert to WebP or JPG for broader compatibility — unnecessary; the site targets modern browsers, and both moment-009 and moment-015 already use `<img>` without fallbacks.

---

## Decision 3: Naming convention

**Decision**: `<YYYY>-<team-a>-<team-b>.<ext>` (all lowercase, hyphen-separated)

**Rationale**: Human-readable, chronologically sortable, unambiguous. Consistent with the existing `hero-bg.jpg` lowercase hyphen style.

**Alternatives considered**: Keeping the Getty filename — rejected; opaque and not version-control friendly. Using moment IDs (`moment-011.avif`) — rejected; less readable without consulting the data file.

---

## AVIF browser support (verified)

| Browser | Min version with AVIF |
|---------|----------------------|
| Chrome  | 85 (Aug 2020)        |
| Firefox | 93 (Oct 2021)        |
| Safari  | 16 (Sep 2022)        |
| Edge    | 85 (Aug 2020)        |

No polyfill needed. Graceful degradation: if browser doesn't support AVIF, `<img>` shows broken icon — acceptable per spec FR-005 (fallback only required when `photo` is absent, not when image format is unsupported).
