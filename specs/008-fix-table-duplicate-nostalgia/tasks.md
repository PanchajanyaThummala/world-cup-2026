---
description: "Fix flag+name table split, remove duplicate groups from bracket, fix nostalgia cards"
---

# Tasks: Fix Table Split, Duplicate Groups, Nostalgia Cards

- [ ] T001 Remove `min-width: 0` from the global `span` CSS reset in `src/styles/globals.css` — it was causing flex wrapping in table cells
- [ ] T002 Fix `src/components/features/groups/StandingsTable.tsx` — team cell: use `flex-shrink-0` on the flag span; add `white-space: nowrap` on the outer flex container; add `overflow: hidden; text-overflow: ellipsis` on name span so long names truncate instead of wrapping
- [ ] T003 Remove the embedded GroupCard grid from `src/components/features/bracket/BracketSection.tsx` — keep only SectionHeading + KnockoutBracket
- [ ] T004 Update `src/components/features/nostalgia/MomentCard.tsx` — ensure outer card wrapper has no overflow:hidden; verify significance line has proper top border + padding; body text has correct padding from card edges
- [ ] T005 Run `npm run build` — fix TypeScript errors
- [ ] T006 Run `npm run test:run` — fix test failures (BracketSection test may need update)
- [ ] T007 Commit + push
