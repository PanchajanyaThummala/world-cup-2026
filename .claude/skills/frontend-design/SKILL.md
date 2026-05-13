# Frontend Design Skill — World Cup 2026

You are building a **cinematic, editorial-grade** website. Every pixel must feel intentional. Reject generic AI aesthetics — no cookie-cutter Tailwind cards, no default shadows, no Bootstrap spacing.

---

## Animation — Framer Motion (required)

- Use `framer-motion` for ALL animations. No CSS transitions except for micro-interactions under 150ms.
- Default enter animation: `opacity: 0, y: 24` → `opacity: 1, y: 0`, duration `0.6s`, ease `[0.22, 1, 0.36, 1]` (expo out)
- Stagger children with `staggerChildren: 0.08`
- Scroll-triggered sections: use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Hero parallax: use `useScroll` + `useTransform` for depth layers
- Page transitions: `AnimatePresence` with fade+slide
- Never animate `width`/`height` directly — use `scaleX`/`scaleY` or layout animations
- Use `layoutId` for shared element transitions between sections

---

## Typography Scale

Base: `16px`. Scale ratio: `1.25` (Major Third).

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `display-2xl` | 80px / 5rem | 800 | Hero headline |
| `display-xl` | 60px / 3.75rem | 700 | Section headline |
| `display-lg` | 48px / 3rem | 700 | Sub-section title |
| `heading-xl` | 36px / 2.25rem | 600 | Card headline |
| `heading-lg` | 28px / 1.75rem | 600 | Component title |
| `heading-md` | 22px / 1.375rem | 600 | Label heading |
| `body-lg` | 18px / 1.125rem | 400 | Lead paragraph |
| `body-md` | 16px / 1rem | 400 | Body copy |
| `body-sm` | 14px / 0.875rem | 400 | Caption |
| `label` | 11px / 0.6875rem | 700 | Eyebrow / tag (uppercase, tracked 0.12em) |

Fonts:
- Headlines: `"Bebas Neue"` or `"Anton"` — bold, impactful, football energy
- Body: `"Inter"` — clean, readable
- Accent/numbers: `"Oswald"` — stats, scores, years

---

## Spacing System — 8px Grid

```
4px   — micro gaps (icon padding, badge gaps)
8px   — tight spacing (within components)
16px  — component inner padding
24px  — component gaps
32px  — section sub-spacing
48px  — medium section padding
64px  — section padding (mobile)
96px  — section padding (desktop)
128px — hero section padding
```

Never use arbitrary values. All spacing must be a multiple of 8.

---

## Color Tokens — World Cup 2026 Theme

```css
/* Primary — FIFA Gold */
--color-gold-500: #C9A84C;
--color-gold-400: #E2C267;
--color-gold-300: #F0D98B;
--color-gold-600: #A8842A;

/* Neutral — Deep pitch night */
--color-neutral-950: #080A0F;
--color-neutral-900: #0D1117;
--color-neutral-800: #161B26;
--color-neutral-700: #1F2937;
--color-neutral-600: #374151;
--color-neutral-400: #9CA3AF;
--color-neutral-200: #E5E7EB;
--color-neutral-50:  #F9FAFB;

/* Accent — Pitch green */
--color-green-500: #16A34A;
--color-green-400: #22C55E;
--color-green-600: #15803D;

/* Host nations accent */
--color-usa-red: #B22234;
--color-canada-red: #FF0000;
--color-mexico-green: #006847;

/* Semantic */
--color-text-primary: var(--color-neutral-50);
--color-text-secondary: var(--color-neutral-400);
--color-text-accent: var(--color-gold-400);
--color-bg-base: var(--color-neutral-950);
--color-bg-surface: var(--color-neutral-900);
--color-bg-elevated: var(--color-neutral-800);
--color-border: var(--color-neutral-700);
```

Dark-first design. The site lives in darkness with gold and green punctuation.

---

## Layout Principles

- Max content width: `1280px`, centered, `padding: 0 24px` (mobile) / `0 48px` (desktop)
- Use CSS Grid for page-level layout, Flexbox for component-level alignment
- Full-bleed hero sections — image/video behind content with dark overlay gradient
- Magazine-style asymmetric layouts for editorial sections (not symmetric 3-column cards)
- Sticky nav with `backdrop-filter: blur(16px)` + subtle border-bottom on scroll

---

## Component Patterns

### Cards
- No generic white-background cards with drop shadows
- Use: dark surface (`neutral-900`), `1px` border (`neutral-700`), `border-radius: 12px`
- Hover: border brightens to `gold-500`, subtle background lift via `motion.div` scale `1.02`
- Image cards: image fills top 60%, content below with gradient overlay at bottom of image

### Buttons
- Primary: `gold-500` background, `neutral-950` text, `border-radius: 6px`, `padding: 12px 24px`
- Secondary: transparent, `1px` solid `gold-500` border, `gold-400` text
- Ghost: transparent, `neutral-400` text → `neutral-50` on hover
- All buttons: Framer Motion `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.98 }}`
- No `border-radius: 9999px` pill buttons unless for tags/badges

### Sections
- Alternate between full-bleed dark and dark-surface backgrounds
- Use eyebrow labels (`label` token, uppercase, gold) above every section headline
- Section headlines are left-aligned on desktop, never centered (except hero)

### Stats / Numbers
- Large numerals in `Oswald`, `display-xl` size, `gold-400` color
- Animated count-up on scroll entry using Framer Motion + custom counter hook

### Images
- Always use `object-fit: cover` with explicit aspect ratios
- Stadium/crowd images: apply `mix-blend-mode: luminosity` + dark tint overlay for editorial feel
- Historical photos: sepia/grayscale treatment with gold accent overlays

---

## Images — Source, Download & Use Locally

**Never use external image URLs in production.** All images MUST be downloaded and stored in `public/images/` so they are served from Vercel CDN, not a third-party domain.

### Where to source images

| Source | Best for | License |
|--------|----------|---------|
| Unsplash (unsplash.com) | Hero backgrounds, stadium shots, crowd scenes | Free, no attribution required |
| Pexels (pexels.com) | Football action, fans, trophies | Free, no attribution required |
| Wikimedia Commons (commons.wikimedia.org) | Historic WC photos (1930–2006), players, trophies | Public domain / CC |

### Image sourcing rules

- **Hero section**: Download 1 high-impact stadium/crowd image (1920×1080 minimum). Dark, moody shot — preferably a night match with floodlights. Save as `public/images/hero-bg.jpg`.
- **Nostalgia section**: Each historic moment card SHOULD have a relevant photo. Search Wikimedia Commons for `"FIFA World Cup [year]"` — many tournament photos are public domain. Save as `public/images/moments/[moment-id].jpg`.
- **Cultural impact section**: Abstract/documentary style photos. Stadium construction, protests, ceremonies. Save as `public/images/impact/[story-id].jpg`.
- **Venues section**: Each venue should have a photo. Search `"[venue name] stadium"` on Unsplash/Pexels. Save as `public/images/venues/[venue-id].jpg`.

### Download instructions for the agent

Use `curl` to download images directly:
```bash
curl -L "https://images.unsplash.com/photo-[ID]?w=1920&q=80" -o public/images/hero-bg.jpg
```

For Wikimedia Commons, use the direct file URL from the image's "Original file" link.

### Usage in components

```tsx
// Always specify width + height to prevent CLS
<img
  src="/images/hero-bg.jpg"
  alt="FIFA World Cup 2026 stadium"
  width={1920}
  height={1080}
  loading="eager"   // hero only — above the fold
  className="object-cover w-full h-full"
/>

// All other images: lazy load
<img
  src="/images/moments/moment-001.jpg"
  alt="1970 World Cup Brazil"
  width={800}
  height={500}
  loading="lazy"
  className="object-cover w-full h-full"
/>
```

### Hero image treatment

The hero image MUST have a dark overlay so text is legible:
```tsx
<div className="relative w-full h-screen">
  <img src="/images/hero-bg.jpg" className="absolute inset-0 w-full h-full object-cover" />
  {/* Dark gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/40 to-neutral-950" />
  {/* Content on top */}
  <div className="relative z-10">...</div>
</div>
```

### Fallback if image unavailable

If a specific image can't be found, use a CSS gradient placeholder — never a broken `<img>` tag:
```tsx
<div className="w-full h-48 bg-gradient-to-br from-neutral-800 to-neutral-900" />
```

---

## What to Avoid

- No generic hero with centered text + single CTA button — go cinematic
- No rainbow gradients, neon colors, or pastel backgrounds
- No box shadows everywhere — use borders and backgrounds instead
- No `font-size: 12px` body text — minimum 14px
- No un-animated page loads — everything enters with motion
- No stock illustration icons — use real photography or SVG icons (Lucide/Phosphor)
- No Lorem Ipsum — all placeholder content must reference actual World Cup facts/data
- No symmetric 3-column grids for editorial content — use asymmetric magazine layouts
- Do not use `className="text-gray-500"` directly — map to design tokens
