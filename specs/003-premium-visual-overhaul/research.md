# Research: Premium Visual Overhaul

**Date**: 2026-05-13

---

## Problem Audit — What Makes the Current Site Look Cheap

### Issue 1: Wrong sport imagery
- `player-1.jpg` and `player-2.jpg` were sourced by searching "football player" → returned American NFL players
- Must re-source using "soccer player", "football pitch", "FIFA", "soccer ball" search terms
- Fix: Download verified soccer images only

### Issue 2: Flat dark cards
- All cards are `bg-neutral-900 border border-neutral-800` — fully opaque flat boxes
- Glass morphism needs: `background: rgba(13,17,23,0.65)`, `backdrop-filter: blur(12px)`, glowing border
- Fix: Global card style upgrade with glass effect

### Issue 3: Section titles look cheap
- Current: Bebas Neue with no visual treatment — raw text on dark background
- Needed: Eyebrow lines, gradient text on key words, wider letter-spacing, stronger hierarchy
- Fix: Gradient text clip on hero title ("WORLD CUP" → gold gradient), section headings with glow

### Issue 4: Congested group/venue cards
- 12 group cards + 16 venue cards are dense grids that overwhelm
- Fix: Reduce visible cards, add "See all" expand — or use horizontal scroll strip
- Fix: Increase card min-height, add more inner whitespace

### Issue 5: No macro visual rhythm
- Every section looks visually similar — same dark box, same gold heading
- Needed: Alternating visual treatments — some sections full bleed with photo bg, some glass, some open
- Fix: Hero (photo), Stats (dark strip), Groups (glass cards), Venues (photo bg strip), Nostalgia (editorial), Impact (glass), Legends (full bleed), Facts (mosaic), Bracket (glass)

### Issue 6: Typography not premium enough
- Body text at 14px with neutral-400 color is too quiet
- Section subtitles are small and pale
- Fix: Body text → 16px neutral-300, subtitles → 18px, stronger contrast

---

## Decision 1: Soccer Images — Verified Sources

Search terms that reliably return SOCCER (not American football) on Unsplash:
- `"soccer"` — works reliably
- `"football pitch"` — UK English term, always returns soccer
- `"FIFA"` — unambiguous
- `"soccer ball"` — unambiguous
- `"footballer"` — UK/global term always means soccer

Search terms to AVOID on Unsplash:
- `"football player"` — returns American NFL players
- `"football"` alone — ambiguous, often returns American football

Image targets:
- Hero: `"soccer stadium crowd night"` — dramatic floodlit crowd
- Hero alt: `"football pitch aerial"` — top-down green pitch view
- Legends: `"soccer player action"`, `"footballer celebration"` — must show round ball + football kit

---

## Decision 2: Glass Morphism Implementation

```css
/* Premium glass card */
background: rgba(13, 17, 23, 0.65);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(201, 168, 76, 0.15);
box-shadow: 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);

/* Hover state */
border-color: rgba(201, 168, 76, 0.4);
box-shadow: 0 8px 40px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.08);
```

Browser support: Chrome 76+, Firefox 70+, Safari 9+ — full coverage for 2026 users.

---

## Decision 3: Gradient Text for Hero Title

```css
/* "WORLD CUP" in hero */
background: linear-gradient(135deg, #F0D98B 0%, #C9A84C 50%, #A8842A 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

This is the technique used by Apple, Nike, and ESPN+ for premium section titles.

---

## Decision 4: Distinct Animation per Section

| Section | Animation style |
|---------|----------------|
| Hero | Parallax photo + staggered text reveal from bottom |
| Stats | Count-up numbers with scale pulse on entry |
| Groups | Cards flip-in with slight rotateY (3D card effect) |
| Venues | Horizontal scroll strip with drag-to-scroll |
| Nostalgia | Alternating slide-in-left / slide-in-right (already done) |
| Impact | Cards slide up with stagger, gold border draws in on hover |
| Legends | Cinematic scale-up from 0.85 with blur-out-to-focus |
| Facts | Masonry grid with random delay stagger (organic feel) |
| Bracket | Fade in by column (left to right) |

---

## Decision 5: Changelog Format

Standard Keep a Changelog format (keepachangelog.com):
```markdown
# Changelog
## [0.3.0] - 2026-05-13 — Premium visual overhaul
## [0.2.0] - 2026-05-13 — Visual upgrade + legends section
## [0.1.0] - 2026-05-13 — Initial site: all 7 sections
```
