---
description: "Card overflow final fix: 32px padding, remove venue redundancy, overflow-wrap, group letter clip"
---

# Tasks: Card Overflow Final Fix

- [ ] T001 Update `src/components/ui/Card.tsx` — change default padding approach: add `--card-padding: 32px` CSS var and apply `padding: var(--card-padding)` inside the card primitive so ALL cards get 32px unless overridden; remove the wrapping z-index div (it breaks flex-col layouts on card consumers)
- [ ] T002 Update `src/styles/globals.css` — add `--card-padding: 32px` to `:root` and add global `overflow-wrap: anywhere; hyphens: auto; min-width: 0` to card content text elements via `.card-body` utility class OR via direct body reset
- [ ] T003 Update `src/components/features/venues/VenueCard.tsx` — remove the country flag+name eyebrow row entirely (row 1); keep only venue name, city/state, divider, capacity
- [ ] T004 Update `src/components/features/groups/GroupCard.tsx` — remove `letterSpacing` from group letter inline style; increase top padding if needed; ensure card padding is 32px
- [ ] T005 Update `src/components/features/groups/StandingsTable.tsx` — add `style={{ overflowWrap: 'anywhere', minWidth: 0 }}` to team name cell; remove truncate/overflow classes
- [ ] T006 Update `src/components/features/nostalgia/MomentCard.tsx` — add `overflowWrap: 'anywhere'` to narrative and significance paragraphs
- [ ] T007 [P] Update `src/components/features/impact/ImpactStoryCard.tsx` — add `overflowWrap: 'anywhere'` to narrative; add `minWidth: 0` to title
- [ ] T008 [P] Update `src/components/features/facts/FactCard.tsx` — add `overflowWrap: 'anywhere'` to hook and supporting text
- [ ] T009 [P] Update `src/components/features/legends/LegendCard.tsx` — add `overflowWrap: 'anywhere'` to description; increase content overlay padding to 32px
- [ ] T010 Remove `p-6`, `p-7`, `p-8` className overrides on Card consumers that are now redundant (Card handles padding internally) — GroupCard, VenueCard, FactCard, ImpactStoryCard
- [ ] T011 Run `npm run build` — fix TypeScript errors
- [ ] T012 Run `npm run test:run` — fix failures
- [ ] T013 Commit + push
