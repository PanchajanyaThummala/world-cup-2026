# Changelog

All notable changes to the World Cup 2026 website are recorded here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.4.0] — 2026-05-14

### Countdown Header + UI Polish Pass

Spec: [004-ui-polish-countdown](specs/004-ui-polish-countdown/spec.md)

#### Added
- **`CountdownBanner`** — sticky top banner with live tick-down to 2026-06-11 opening match (Mexico v TBD at Estadio Azteca, 20:00 ET); switches to "Tournament Live · Matchday N" mode once kickoff passes
- **`useCountdown` hook** — 1Hz interval, computes days/hours/minutes/seconds, returns phase state
- **Bracket empty-state visual** — dashed border, opacity 0.55, inline clock SVG icon, "Awaiting" label
- **Stats info-band redesign** — true 5-column grid with subtle gold gradient dividers, completion pulse animation
- **Hero CTA pulse** — 2.4s gold glow loop (disabled with `prefers-reduced-motion`)
- **CSS custom property tokens** — `--section-py` and `--banner-h` for unified spacing rhythm

#### Changed
- **Flag rendering pattern** — every flag-and-name pair migrated to `<div className="flex items-center gap-2"><span aria-hidden>{flag}</span><span>{name}</span></div>` to eliminate string concatenation
- **`Flag` component** — `decorative` prop (default true) for aria-hidden flags; prevents double-announcing country names
- **Navbar** — sentence-case labels (was UPPERCASE), positioned below countdown banner via `top: var(--banner-h)`
- **Venue cards** — rebuilt into 3 explicit rows: country (eyebrow), city/venue (heading), capacity (stat); Final/Opening badge floats top-right
- **Group standings cells** — `<colgroup>` controlled widths (44/9/9/9/9/9/11), top-2 rows get gold tint background + 2px gold left border
- **Hero CTA** — sentence case "Explore the tournament", padding bumped to `14px 40px`, tighter letter-spacing
- **`SectionWrapper`** — uses `--section-py` token (96px desktop / 64px mobile) for all sections
- **`SectionHeading`** — bottom margin standardized at `mb-16`

#### Fixed
- Visible text concatenation bugs ("MexicoMexico", "USADallas/Arlington") — root-cause fixed at component level via explicit flex layout, not CSS workarounds
- Bracket "TBD" placeholders no longer look like a broken state — now intentional empty design

---

## [0.3.0] — 2026-05-14

### Premium Visual Overhaul

Spec: [003-premium-visual-overhaul](specs/003-premium-visual-overhaul/spec.md)

#### Added
- Glass morphism Card primitive — translucent dark surface, gold-tinted border, inset top highlight, backdrop blur
- Gradient hero title: "WORLD CUP" rendered with gold gradient text-clip (Apple/Nike style)
- Cinematic CTA button in hero with gold gradient + glow shadow
- Lens flare overlay in hero top-right corner
- Distinct per-section animation variants:
  - Groups: 3D rotateY flip-in
  - Legends: scale 0.85 + blur(8px) → focus-in
  - Facts: deterministic organic stagger delays
  - Sections: alternating slide-in directions
- `::selection` style with gold highlight
- Page background `::before` noise texture for depth
- `CHANGELOG.md` itself for project history tracking

#### Changed
- Hero background: replaced ambiguous image with verified Allianz Arena soccer match photo
- Player imagery: replaced 2 American football photos (NFL) with verified soccer player action shots
- All cards (Group, Venue, Fact, Impact, Legend) now use glass morphism style
- Body text: `#A3A3A3` → `#E5E7EB` for stronger contrast
- Section headings: subtitle bumped to 18px / neutral-300; eyebrow tracking widened
- Card padding increased: minimum `p-6` enforced across all card types
- Card border radius: `rounded-xl` → `rounded-2xl` for softer premium feel

#### Fixed
- Wrong-sport imagery on the FIFA World Cup site (the previous player photos showed American football, not soccer)

---

## [0.2.0] — 2026-05-13

### Visual Upgrade — Legends + Editorial Layout

Spec: [002-visual-upgrade](specs/002-visual-upgrade/spec.md)

#### Added
- `LegendsSection` with 6 World Cup legends: Pelé, Maradona, Zidane, Ronaldo Nazário, Klose, Yashin
- `LegendCard` with photo or gradient-fallback styling
- `TournamentStats` strip extracted below hero (animated counters)
- Photo headers on select nostalgia moment cards
- Asymmetric editorial grid for Legends section

#### Changed
- Hero redesigned: real stadium photo background, 3-zone above-fold (no clutter)
- Section padding: `py-24` → `py-32 md:py-40`
- Section heading bottom margin: `mb-16` → `mb-20`
- Nostalgia cards now show photo headers when available, gradient fallback otherwise

---

## [0.1.0] — 2026-05-13

### Initial Site Build

Spec: [001-world-cup-site](specs/001-world-cup-site/spec.md)

#### Added
- 7 sections: Hero, Groups, Venues, Nostalgia, Impact, Facts, Bracket
- All 48 official FIFA 2026 teams across 12 groups (Dec 2025 official draw)
- 16 host venues (11 USA, 2 Canada, 3 Mexico)
- 16 historic World Cup moments (1930–2022)
- 8 cultural impact stories
- 12 deep facts across 5 categories
- Knockout bracket with 63 slots (R32 → Final)
- Animated soccer ball component
- Cursor follower with spring physics
- Canvas particle field in hero
- Tailwind v4 with custom gold/neutral design tokens
- Bebas Neue + Oswald + Inter font stack
- Framer Motion variants library
- 37 component + data-integrity tests (all passing)

#### Tech Stack
- React 19.2.6 + TypeScript 6.0.3
- Vite 8.0.12 + @vitejs/plugin-react 6.0.1
- Tailwind CSS 4.3.0 + @tailwindcss/vite 4.3.0
- Framer Motion 12.38.0
- Vitest 4.1.6 + Testing Library 16.3.2

#### Constitution
- v1.1.0 ratified with 6 principles including Dependency Vetting (NON-NEGOTIABLE)
