# Research: Countdown Header + UI Polish

**Date**: 2026-05-14

---

## Decision 1: Countdown Target Time

**Decision**: `2026-06-11T20:00:00-04:00` (June 11, 2026, 8 PM Eastern Time — Mexico City opening match kickoff in local ET)

**Rationale**: The FIFA 2026 schedule confirms the opening match is at Estadio Azteca, Mexico City. Mexico City is CDT (UTC-5) in June (no DST in Mexico), but the broadcast kickoff is conventionally referenced in Eastern Time for North American audiences. ET in June is EDT (UTC-4).

**Alternatives considered**:
- UTC time string — less intuitive
- Local timezone of viewer — countdown would differ per user; bad UX

---

## Decision 2: Why Strings Concatenate ("MexicoMexico", "USADallas")

**Root cause analysis**:
1. The current code renders flag emoji + text inline: `<span>🇲🇽</span> Mexico` — the space char between elements is sometimes absorbed
2. The flag `<span>` has `aria-label="Mexico"` — screen readers / accessibility tools may render this as visible text on some browser configurations or assistive tech overlays
3. When the flag emoji fails to render (older OS, missing font), it falls back to the regional indicator letters "🇲" "🇽" which render as plain "MX", and without an explicit flex `gap`, sit visually adjacent to the next text node

**Fix**: 
- Wrap each pair in `<div className="flex items-center gap-2">` — `gap` is enforced regardless of inner content
- Drop `aria-label` from the flag span (use `aria-hidden="true"` instead) — the country name itself is already in the DOM as visible text, no need to double-announce
- Drop string concatenation entirely — every flag and label is a separate JSX element with its own wrapper

**Alternatives considered**:
- CSS `margin-left` on country text — fragile; depends on text node not being absorbed
- Hidden separator characters — hacky, fails screen readers

---

## Decision 3: Banner Position vs Navbar

**Decision**: Banner is `position: fixed` at top; navbar offsets down by banner height via CSS variable `--banner-h: 36px` (desktop), `48px` (mobile)

**Rationale**: Both must remain visible while scrolling. CSS var allows synced offset without prop drilling.

**Alternatives considered**:
- Banner is part of the navbar (combined): increases navbar visual weight too much
- Banner is non-sticky (scrolls away): defeats purpose of always-visible countdown

---

## Decision 4: Tick Interval

**Decision**: `setInterval(1000)` once on mount, cleared on unmount

**Rationale**: 1Hz is the natural cadence for a seconds countdown. Browser throttles to 1 second minimum when tab is backgrounded — perfect.

**Alternatives considered**:
- `requestAnimationFrame` at 60fps: wasteful (counter only changes 1× per second)
- Web Worker timer: overkill

---

## Decision 5: Live Mode Threshold

**Decision**: When `now > target`, show "Tournament Live — Matchday N" with N computed as `Math.min(32, ceil((now - target) / 86400000) + 1)`

**Rationale**: Tournament is 32 days long. Matchday number is approximate (no live schedule data in v1).

---

## Decision 6: Stats Band Number Pulse

**Decision**: When the count-up animation completes (count === target), trigger `scale: [1, 1.05, 1]` over 200ms via Framer Motion `animate` prop

**Rationale**: Subtle confirmation cue. Tells the user "the number landed." Adds premium polish without distraction.

---

## Decision 7: Group Standings Top-2 Treatment

**Decision**: Top-2 rows get `background: rgba(201,168,76,0.06)` + `border-left: 2px solid rgba(201,168,76,0.5)` + gold-tinted text

**Rationale**: Already had gold text — this adds a row-level visual cue, which is the standard pattern in pro football standings (Premier League, La Liga, FIFA sites).

---

## Decision 8: Bracket Empty State

**Decision**: Empty slot uses dashed `border-style: dashed` + `opacity: 0.55` + `<svg>` clock icon centered + text "Awaiting result"

**Rationale**: Looks intentional. Matches premium sports UX patterns (Apple Sports app, ESPN+ bracket modules).

**Alternatives considered**:
- Hide empty slots entirely: breaks bracket structure
- Show team logos as silhouettes: requires asset generation
- "TBD" plain text: looks broken, current state

---

## Decision 9: Sentence Case Migration

**Decision**: Migrate button labels and visible CTAs to sentence case. Preserve uppercase on:
- Section eyebrows (above section headings)
- Badge component labels
- Countdown "KICKOFF IN" label
- Stat band labels ("TEAMS", "GROUPS", "VENUES")

**Rationale**: Caps reserved for micro-labels signals deliberate hierarchy. Mixed sentence/title case for buttons and nav reads as premium editorial.
