# Research: Visual Upgrade

**Date**: 2026-05-13

## Decision 1: Hero Image Loading Strategy

**Decision**: `loading="eager"` + `fetchpriority="high"` on the hero `<img>`, all other images `loading="lazy"`

**Rationale**: Hero is LCP element — it must load immediately. All below-fold images should lazy-load to avoid bandwidth waste. Explicit `width`/`height` attributes prevent CLS.

## Decision 2: Gradient Fallback for Missing Photos

**Decision**: CSS `linear-gradient(135deg, #1F2937, #0D1117)` with the player era label in large gold Oswald font as visual anchor.

**Rationale**: Never show a broken image icon. The gradient + text treatment looks intentional and premium, not broken.

## Decision 3: Player Names

**Decision**: Use real historical player names (Pelé, Maradona, Zidane, Ronaldo Nazário, Klose, Yashin) paired with generic action photos already downloaded — no player-specific licensed photos.

**Rationale**: Historical names are factual public record. Generic action photos from Unsplash (CC0) require no attribution and carry no likeness risk.

## Decision 4: Stats Sub-Section

**Decision**: Extract animated stats from HeroSection into a separate `TournamentStats` component rendered immediately below the hero, full-bleed dark background.

**Rationale**: Stats were causing hero congestion. Moving them below the fold keeps the hero to 3 zones while preserving the animated counter feature the user wanted.

## Decision 5: Legends Section Layout

**Decision**: Asymmetric CSS grid — one large featured card (2 columns wide) + 4 smaller cards in a 2×2 grid beside it, on desktop. Single column on mobile.

**Rationale**: Matches editorial magazine pattern from the design system spec. Avoids the uniform grid that looks generic.
