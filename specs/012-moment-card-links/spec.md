# Spec 012 — Moment Card External Article Links

## Goal
Each "Moments That Defined the Game" card in the History/Nostalgia section should link to the best publicly available article about that moment. Clicking the card opens the article in a new tab.

## Behaviour
- Entire card is clickable (wraps in `<a>` tag with `target="_blank" rel="noopener noreferrer"`)
- Visual: subtle "Read Article →" label at card bottom, gold colour, appears on hover
- Card shows a pointer cursor when hoverable
- If a moment has no URL (fallback), card is not wrapped in a link and the label is hidden
- Accessibility: `aria-label` on the link includes the moment title

## Data changes
- Add optional `sourceUrl?: string` field to `HistoricMoment` type
- Populate URLs for all 16 moments in `moments.ts` with best-available authoritative articles (BBC Sport, ESPN, FIFA, The Guardian, etc.)

## Scope
- `src/types/index.ts` — add `sourceUrl?` to `HistoricMoment`
- `src/data/moments.ts` — add `sourceUrl` for each moment
- `src/components/features/nostalgia/MomentCard.tsx` — wrap card in `<a>` when URL exists, add hover label
