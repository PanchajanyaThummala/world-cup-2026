---
description: "Task list for World Cup 2026 Cinematic Fan Website"
---

# Tasks: World Cup 2026 Cinematic Fan Website

**Input**: Design documents from `/specs/001-world-cup-site/`

**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅ quickstart.md ✅

**Tests**: Included for data integrity and core component rendering. TDD enforced per Principle III.

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Scaffold the Vite + React + TypeScript project with all dependencies installed and configured.

- [x] T001 Initialize Vite project at repo root: `npm create vite@latest . -- --template react-ts`
- [x] T002 Install runtime dependencies: `npm install framer-motion` (verify ^12.x peer deps with React 19)
- [x] T003 Install dev dependencies: `npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react`
- [x] T004 [P] Install test dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/react @types/react-dom`
- [x] T005 Configure `vite.config.ts` with `@vitejs/plugin-react` and `@tailwindcss/vite` plugins, add vitest test config with jsdom environment
- [x] T006 Create `tests/setup.ts` importing `@testing-library/jest-dom`
- [x] T007 [P] Create `src/styles/globals.css` with `@import "tailwindcss"` and `@theme` block defining gold/neutral color tokens and 8px spacing
- [x] T008 [P] Create `tsconfig.json` with strict mode, paths alias `@/` → `src/`
- [x] T009 Create `vercel.json` with SPA rewrite rule `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- [x] T010 [P] Add npm scripts to `package.json`: `dev`, `build`, `preview`, `test`, `test:run`, `test:coverage`
- [x] T011 Delete Vite boilerplate: remove `src/App.css`, `src/assets/react.svg`, reset `index.css` to empty, clear `App.tsx` body

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, data files, animation library, and layout shell — everything all user stories depend on.

**⚠️ CRITICAL**: No section work can begin until this phase is complete.

- [x] T012 Create `src/types/index.ts` with all TypeScript interfaces: `Team`, `GroupStanding`, `Group`, `Venue`, `Match`, `HistoricMoment`, `ImpactStory`, `DeepFact`, `KnockoutSlot`, `Era`, `FactCategory`, `ImpactCategory`, `KnockoutRound`, `HostCountry`
- [x] T013 [P] Write data integrity test `tests/data/data-integrity.test.ts` — assert 48 teams, 12 groups of 4, 16 venues (11 USA/2 Canada/3 Mexico), ≥15 moments, ≥6 impact stories, ≥10 facts (write test FIRST, confirm it fails)
- [x] T014 Create `src/data/teams.ts` exporting `TEAMS: Team[]` with all 48 FIFA 2026 teams (name, code, flag emoji, group A–L, confederation) using the official draw: A(Mexico/South Korea/South Africa/Czechia), B(Canada/Switzerland/Qatar/Bosnia-Herzegovina), C(Brazil/Morocco/Scotland/Haiti), D(USA/Paraguay/Australia/Türkiye), E(Germany/Ecuador/Ivory Coast/Curaçao), F(Netherlands/Japan/Tunisia/Sweden), G(Belgium/Iran/Egypt/New Zealand), H(Spain/Uruguay/Saudi Arabia/Cape Verde), I(France/Senegal/Norway/Iraq), J(Argentina/Austria/Algeria/Jordan), K(Portugal/Colombia/Uzbekistan/DR Congo), L(England/Croatia/Panama/Ghana) — run T013 test, confirm it passes
- [x] T015 Create `src/data/groups.ts` exporting `GROUPS: Group[]` with all 12 groups, each referencing 4 teams from TEAMS with zeroed standings
- [x] T016 [P] Create `src/data/venues.ts` exporting `VENUES: Venue[]` with all 16 venues: AT&T Stadium, SoFi Stadium, MetLife Stadium, Levi's Stadium, Rose Bowl, Arrowhead Stadium, Lincoln Financial Field, Hard Rock Stadium, Gillette Stadium, NRG Stadium, Seattle (USA); BMO Field, BC Place (Canada); Estadio Azteca, Estadio AKRON, Estadio Tecnológico (Mexico) — with city, country, capacity
- [x] T017 [P] Create `src/data/moments.ts` exporting `HISTORIC_MOMENTS: HistoricMoment[]` with ≥15 entries spanning 1930–2022: include Uruguay 1930 (first WC final), Hungary–West Germany 1954 (Miracle of Bern), England 1966 final, Brazil 1970 (Pelé's era), Argentina 1978 (Kempes), Italy 1982 (Rossi), Maradona Hand of God + Goal of Century 1986, Germany 1990 (Schillaci), USA 1994 (penalty shootout final), France 1998 (Zidane), Senegal 2002 (upset France), Zidane headbutt 2006, Spain 2010 (first European winner in Americas), Germany 7-1 Brazil 2014, France 2018, Argentina 2022 (Mbappe hat-trick final)
- [x] T018 [P] Create `src/data/impact-stories.ts` exporting `IMPACT_STORIES: ImpactStory[]` with ≥6 entries: Argentina 1978 (military junta), South Africa 2010 (post-apartheid symbolism), Mexico 1986 (earthquake recovery), USA 1994 (soccer's mainstream moment), Qatar 2022 (human rights controversy), Germany 2006 (national identity shift)
- [x] T019 [P] Create `src/data/facts.ts` exporting `DEEP_FACTS: DeepFact[]` with ≥10 entries across all 5 categories (Records, Firsts, Oddities, Stats, Forgotten Heroes): include Eusébio's 9 goals in 1966, just-eliminated USSR goalkeeper Yashin, Lamine Yamal playing at 16 years old, Hurst's hat-trick in a final (only ever), fastest WC red card, smallest nation to qualify, goalkeeper scoring, etc.
- [x] T020 [P] Create `src/data/bracket.ts` exporting `KNOCKOUT_BRACKET: KnockoutSlot[]` with 63 slots pre-tournament state (all teamA/teamB = 'TBD', no scores)
- [x] T021 [P] Create `src/data/schedule.ts` exporting `MATCHES: Match[]` with key group stage matches (minimum: opening match USA vs TBD at AT&T Stadium 2026-06-11, final at MetLife 2026-07-19)
- [x] T022 Create `src/lib/motion.ts` exporting `variants` object with `fadeInUp`, `fadeIn`, `staggerContainer`, `scaleIn`, `slideInLeft`, `slideInRight` — all collapse to opacity-only when reduced motion detected
- [x] T023 Create `src/hooks/useReducedMotion.ts` wrapping Framer Motion's `useReducedMotion()` and returning accessibility-safe variant overrides
- [x] T024 Create `src/lib/utils.ts` with `cn()` utility (classnames concatenation) and `formatDate()` helper
- [x] T025 Create `src/components/ui/Badge.tsx` — props: `label`, `variant` (gold/neutral/outline), `size` (sm/md); uses design tokens only
- [x] T026 [P] Create `src/components/ui/Card.tsx` — props: `children`, `className`, `hover`, `onClick`; gold border on hover via Tailwind group-hover
- [x] T027 [P] Create `src/components/ui/Flag.tsx` — renders flag emoji with aria-label; props: `emoji`, `label`, `size`
- [x] T028 [P] Create `src/components/ui/SectionHeading.tsx` — props: `eyebrow`, `title`, `subtitle`, `align`; uses editorial typography scale
- [x] T029 Create `src/components/layout/SectionWrapper.tsx` — props: `id`, `children`, `className`, `fullBleed`; applies `max-w-7xl mx-auto px-6` unless fullBleed
- [x] T030 [P] Create `src/components/layout/Navbar.tsx` — fixed top nav with section anchor links; highlights active section via IntersectionObserver; gold accent on active item
- [x] T031 [P] Create `src/components/layout/Footer.tsx` — minimal dark footer with tournament credit
- [x] T032 Create `src/App.tsx` assembling all sections in order with Navbar + Footer; smooth scroll behavior via CSS `scroll-behavior: smooth`
- [x] T033 Update `src/main.tsx` to import `src/styles/globals.css` and mount App

**Checkpoint**: `npm run dev` shows dark page with navbar. Data integrity tests pass. All UI primitives render.

---

## Phase 3: User Story 1 — Cinematic Hero & Tournament Overview (Priority: P1) 🎯 MVP

**Goal**: Full-screen animated hero + groups grid + venues grid

**Independent Test**: Open localhost:5173, scroll through Hero → Groups → Venues without any other section present. All 48 teams visible across 12 groups. All 16 venues visible.

### Tests for User Story 1

> **Write these tests FIRST, confirm they FAIL before implementing components**

- [x] T034 [P] [US1] Write test `tests/components/features/hero/HeroSection.test.tsx` — assert hero renders tournament title "FIFA World Cup 2026", host countries text, and dates
- [x] T035 [P] [US1] Write test `tests/components/features/groups/GroupCard.test.tsx` — assert GroupCard renders group label, all 4 team names and flags
- [x] T036 [P] [US1] Write test `tests/components/features/groups/StandingsTable.test.tsx` — assert table renders MP/W/D/L/GD/Pts columns and correct number of rows

### Implementation for User Story 1

- [x] T037 [US1] Create `src/components/features/hero/HeroSection.tsx` — full-viewport dark cinematic section: radial gradient background (gold glow at center), animated title "FIFA World Cup 2026", subtitle with dates (June 11 – July 19, 2026) and host countries, `motion.div` with `fadeInUp` variant, scroll-down chevron; uses `SectionWrapper` with `fullBleed`
- [x] T038 [P] [US1] Create `src/components/features/groups/StandingsTable.tsx` — props: `standings`, `compact`; renders sortable table with team flag, name, MP/W/D/L/GF/GA/GD/Pts; gold text for top-2 qualifier rows
- [x] T039 [P] [US1] Create `src/components/features/groups/GroupCard.tsx` — props: `group`; Card with group label (e.g. "Group A"), StandingsTable; hover lifts with gold border
- [x] T040 [US1] Create `src/components/features/groups/GroupsSection.tsx` — `SectionWrapper id="groups"`; `SectionHeading` eyebrow="48 Teams · 12 Groups"; 3-column grid of GroupCard components with `staggerContainer` animation; imports GROUPS data
- [x] T041 [P] [US1] Create `src/components/features/venues/VenueCard.tsx` — props: `venue`, `showCapacity`; Card with venue name, city, country flag, capacity badge; hover gold accent
- [x] T042 [US1] Create `src/components/features/venues/VenuesSection.tsx` — `SectionWrapper id="venues"`; groups venues by country (USA / Canada / Mexico) with sub-headings; grid of VenueCard; `fadeInUp` on cards with stagger

**Checkpoint**: All groups display 48 teams. All 16 venues display. Hero animates on load. Tests T034–T036 pass.

---

## Phase 4: User Story 5 — Bracket & Standings Tracker (Priority: P2)

**Goal**: Group tables and knockout bracket visualization

**Independent Test**: Navigate to #bracket section, verify 12 group tables render with correct team names and zeroed standings, knockout bracket shows Round of 32 through Final with TBD slots.

### Tests for User Story 5

- [x] T043 [P] [US5] Write test `tests/components/features/bracket/BracketSlot.test.tsx` — assert TBD slot renders "TBD" for both teams; assert slot with team codes resolves to team name
- [x] T044 [P] [US5] Write test `tests/components/features/bracket/KnockoutBracket.test.tsx` — assert bracket renders Round of 32, R16, QF, SF, Final headings

### Implementation for User Story 5

- [x] T045 [P] [US5] Create `src/components/features/bracket/BracketSlot.tsx` — props: `slot`, `teams`; renders match slot with team A vs team B (name + flag or "TBD"), score if available, winner highlighted in gold
- [x] T046 [US5] Create `src/components/features/bracket/KnockoutBracket.tsx` — props: `slots`; horizontally scrollable bracket grouped by round (R32 → R16 → QF → SF → Final); round headers in gold; uses KNOCKOUT_BRACKET data
- [x] T047 [US5] Create `src/components/features/bracket/BracketSection.tsx` — `SectionWrapper id="bracket"`; `SectionHeading` eyebrow="Road to the Final"; renders both group standings (reuses StandingsTable + GroupCard from US1) and KnockoutBracket in tabs or stacked layout; overflow-x-auto on bracket container for mobile

**Checkpoint**: Bracket section scrolls horizontally on mobile. All group tables visible. Knockout bracket shows all rounds with TBD slots.

---

## Phase 5: User Story 2 — Nostalgia Timeline 1930–Today (Priority: P2)

**Goal**: Editorial timeline of ≥15 iconic World Cup moments

**Independent Test**: Navigate to #nostalgia, verify ≥15 moment cards render with year, title, narrative. Cards alternate left/right on desktop. Cards animate on scroll.

### Tests for User Story 2

- [x] T048 [P] [US2] Write test `tests/components/features/nostalgia/MomentCard.test.tsx` — assert card renders year, title, narrative text, era badge

### Implementation for User Story 2

- [x] T049 [P] [US2] Create `src/components/features/nostalgia/MomentCard.tsx` — props: `moment`, `side`, `index`; editorial card with year (large gold display type), title, narrative, significance text, era Badge; alternates left/right layout based on `side` prop; `slideInLeft`/`slideInRight` variant based on side
- [x] T050 [US2] Create `src/components/features/nostalgia/Timeline.tsx` — renders center vertical line with alternating MomentCard components; staggered scroll reveal; responsive (single column on mobile, alternating on desktop ≥768px)
- [x] T051 [US2] Create `src/components/features/nostalgia/NostalgiaSection.tsx` — `SectionWrapper id="nostalgia"`; `SectionHeading` eyebrow="Since 1930" title="Moments That Defined the Game"; renders Timeline with HISTORIC_MOMENTS data sorted by year

**Checkpoint**: All ≥15 moments visible. Alternating layout works on desktop. Scroll animations trigger. Era badges display.

---

## Phase 6: User Story 3 — Cultural & Geopolitical Impact (Priority: P3)

**Goal**: 6+ editorial story cards on the World Cup's global impact

**Independent Test**: Navigate to #impact, verify ≥6 story cards render with title, narrative, era badge. Hover gold border animation works.

### Tests for User Story 3

- [x] T052 [P] [US3] Write test `tests/components/features/impact/ImpactStoryCard.test.tsx` — assert card renders tournament year, title, narrative, era badge, category

### Implementation for User Story 3

- [x] T053 [P] [US3] Create `src/components/features/impact/ImpactStoryCard.tsx` — props: `story`, `index`; dark Card with gold era badge, tournament year, bold title, narrative, category badge; hover: card lifts + gold left border appears via Framer Motion `whileHover`; `scaleIn` on scroll reveal
- [x] T054 [US3] Create `src/components/features/impact/ImpactSection.tsx` — `SectionWrapper id="impact"`; `SectionHeading` eyebrow="Beyond the Pitch" title="How the World Cup Changed the World"; 2-column responsive grid of ImpactStoryCard with `staggerContainer`; imports IMPACT_STORIES

**Checkpoint**: ≥6 stories display. Hover animations work. Era badges visible.

---

## Phase 7: User Story 4 — Deep Facts (Priority: P3)

**Goal**: ≥10 categorized fact cards in mosaic/grid layout

**Independent Test**: Navigate to #facts, verify ≥10 fact cards display with hook, supporting text, category badge. Single column on mobile, grid on desktop.

### Tests for User Story 4

- [x] T055 [P] [US4] Write test `tests/components/features/facts/FactCard.test.tsx` — assert card renders hook text, supporting text, category badge

### Implementation for User Story 4

- [x] T056 [P] [US4] Create `src/components/features/facts/FactCard.tsx` — props: `fact`, `index`; Card with category Badge (gold for Records/Firsts, neutral for others), large hook statement in display type, supporting text; `fadeInUp` scroll reveal with index-based stagger delay
- [x] T057 [US4] Create `src/components/features/facts/FactsSection.tsx` — `SectionWrapper id="facts"`; `SectionHeading` eyebrow="The Untold Story" title="Facts That Will Change How You See the World Cup"; masonry-style CSS grid (auto-fill columns, varying row spans); imports DEEP_FACTS

**Checkpoint**: ≥10 facts display. Categories tagged. Masonry layout works on desktop. Single column on mobile.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance, integration, and final validation

- [x] T058 Implement `prefers-reduced-motion` check in `src/hooks/useReducedMotion.ts` and propagate through all animated components — verify animations disable in OS accessibility settings
- [x] T059 [P] Add `aria-label` attributes to all interactive elements (Navbar links, VenueCard, GroupCard expand); ensure all Flag emojis have `role="img"` and `aria-label`
- [x] T060 [P] Audit all components for hardcoded hex values — replace any with Tailwind gold/neutral tokens per Design System principle
- [x] T061 [P] Add smooth scroll behavior to Navbar section links via `element.scrollIntoView({ behavior: 'smooth' })` and IntersectionObserver for active section highlighting
- [x] T062 Implement route-level code splitting in `App.tsx` using `React.lazy` + `Suspense` for all feature sections (reduces initial bundle)
- [x] T063 [P] Add `loading="lazy"` and explicit dimensions to any img elements; verify no layout shift (CLS = 0)
- [x] T064 Run `npm run build` and fix any TypeScript errors or missing type annotations
- [x] T065 [P] Run full test suite `npm run test:run` — ensure all tests pass, fix any failures
- [x] T066 Run Lighthouse audit on `npm run preview` build — target Performance ≥ 85; fix any critical issues
- [x] T067 [P] Test at 375px viewport (iPhone SE) — verify no horizontal overflow except bracket section
- [x] T068 Run quickstart.md validation checklist — check off all items

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user story phases
- **US1 Hero + Groups + Venues (Phase 3)**: Depends on Phase 2 — highest priority, start first
- **US5 Bracket (Phase 4)**: Depends on Phase 2 — reuses StandingsTable from US1 (start after T038)
- **US2 Nostalgia (Phase 5)**: Depends on Phase 2 — independent of US1/US5
- **US3 Impact (Phase 6)**: Depends on Phase 2 — independent
- **US4 Facts (Phase 7)**: Depends on Phase 2 — independent
- **Polish (Phase 8)**: Depends on all user story phases

### User Story Dependencies

- **US1 (P1)**: Can start immediately after Phase 2 — no story dependencies
- **US5 (P2)**: Can start after T038 (StandingsTable) — reuses that component
- **US2 (P2)**: Fully independent after Phase 2
- **US3 (P3)**: Fully independent after Phase 2
- **US4 (P3)**: Fully independent after Phase 2

### Within Each Phase

- Tests (marked above) MUST be written and FAIL before implementation
- Data files (T014–T021) before components that consume them
- UI primitives (T025–T028) before feature components
- Layout components (T029–T031) before App assembly (T032)

### Parallel Opportunities

- T003 / T004 — parallel npm installs
- T007, T008, T010 — parallel config files
- T013, T016, T017, T018, T019, T020, T021 — all data files parallel after T012 (types)
- T025, T026, T027, T028 — all UI primitives parallel
- T034, T035, T036 — all US1 tests parallel
- T043, T044 — US5 tests parallel
- US3, US4 — fully parallel (different files)

---

## Implementation Strategy

### MVP (User Story 1 Only — Ship in ~4 hours)

1. Complete Phase 1: Setup (T001–T011)
2. Complete Phase 2: Foundational (T012–T033)
3. Complete Phase 3: US1 Hero + Groups + Venues (T034–T042)
4. **STOP and VALIDATE**: Open site, verify all 48 teams, all 16 venues, hero animation
5. Deploy to Vercel: `vercel --prod`

### Full Site (All Stories — Sequential Priority Order)

1. MVP above
2. Phase 4: Bracket (T043–T047)
3. Phase 5: Nostalgia (T048–T051)
4. Phase 6: Impact (T052–T054)
5. Phase 7: Facts (T055–T057)
6. Phase 8: Polish (T058–T068)

---

## Notes

- [P] = different files, no dependencies on incomplete tasks — safe to parallelize
- [US#] maps each task to its user story for traceability
- Data integrity tests (T013) MUST pass before any section implementation begins
- Framer Motion variants from `src/lib/motion.ts` only — no inline animation objects
- All colors via Tailwind gold/neutral tokens — no hardcoded hex values
- Total tasks: **68** across 8 phases
