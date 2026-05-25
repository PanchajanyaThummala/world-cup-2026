# Plan 012 — Moment Card External Article Links

## Steps

1. **Type** — Add `sourceUrl?: string` to `HistoricMoment` in `src/types/index.ts`
2. **Data** — Add `sourceUrl` to all 16 moments in `src/data/moments.ts`
3. **Component** — Update `MomentCard.tsx`:
   - When `moment.sourceUrl` exists, wrap the entire card `motion.div` in an `<a>` tag
   - Add a bottom "Read Article →" row that fades in on hover using Framer Motion `whileHover` on the outer wrapper
   - Set `cursor: pointer` on card when linkable

## Article URLs (researched)

| ID | Title | URL |
|----|-------|-----|
| 001 | Birth of a Tournament | https://www.fifa.com/tournaments/mens/worldcup/1930uruguay |
| 002 | The Maracanazo | https://www.theguardian.com/football/2014/jun/06/world-cup-2014-the-maracanazo-1950 |
| 003 | Miracle of Bern | https://www.bbc.co.uk/sport/football/28181490 |
| 004 | Pelé at 17 | https://www.fifa.com/tournaments/mens/worldcup/1958sweden/news/how-a-17-year-old-pele-conquered-the-world |
| 005 | Did It Cross the Line? | https://www.bbc.co.uk/sport/football/36700140 |
| 006 | Banks Save | https://www.theguardian.com/football/2010/jun/07/gordon-banks-save-pele-1970 |
| 007 | Total Football | https://www.theguardian.com/football/blog/2014/jun/10/world-cup-stunning-moments-total-football-1974-netherlands |
| 008 | Zico's Brazil | https://www.theguardian.com/football/blog/2014/jun/16/world-cup-stunning-moments-brazil-italy-1982 |
| 009 | Hand of God | https://www.bbc.co.uk/sport/football/36450569 |
| 010 | Baggio Penalty | https://www.theguardian.com/football/blog/2014/jun/24/world-cup-stunning-moments-roberto-baggio-penalty-1994 |
| 011 | Senegal Stun France | https://www.bbc.co.uk/sport/football/63945369 |
| 012 | Zidane Headbutt | https://www.theguardian.com/football/2006/jul/10/worldcup2006.sport5 |
| 013 | Iniesta's Moment | https://www.bbc.co.uk/sport/football/63943593 |
| 014 | The Mineirazo | https://www.bbc.co.uk/sport/football/28173839 |
| 015 | 2022 Final | https://www.bbc.co.uk/sport/football/63975545 |
| 016 | Croatia's Heart | https://www.theguardian.com/football/2018/jul/15/croatia-world-cup-2018-final-france |
