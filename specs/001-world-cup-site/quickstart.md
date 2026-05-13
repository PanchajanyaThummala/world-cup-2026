# Quickstart: World Cup 2026 Website

**Branch**: `001-world-cup-site`

---

## Prerequisites

- Node.js ≥ 20.x
- npm ≥ 10.x

---

## Setup

```bash
# Create Vite project (run from /Users/india/world-cup)
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install
npm install framer-motion
npm install -D tailwindcss @tailwindcss/vite

# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

---

## Configure Tailwind v4

In `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

In `src/styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-gold-400: #FACC15;
  --color-gold-500: #EAB308;
  --color-gold-600: #CA8A04;
  --color-neutral-950: #0A0A0A;
  --color-neutral-900: #171717;
  --color-neutral-800: #262626;
  --color-neutral-200: #E5E5E5;
  --color-neutral-100: #F5F5F5;
}
```

---

## Configure Vitest

In `vite.config.ts` (add test config):

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
})
```

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

---

## Dev Server

```bash
npm run dev
# → http://localhost:5173
```

---

## Run Tests

```bash
npm test            # watch mode
npm run test:run    # single run (CI)
```

---

## Build & Preview

```bash
npm run build       # outputs to dist/
npm run preview     # preview production build locally
```

---

## Deploy to Vercel

```bash
# One-time: install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

Create `vercel.json` at project root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Validation Checklist

- [ ] `npm run dev` starts without errors
- [ ] All 5 sections visible on localhost:5173
- [ ] `npm test` passes all data integrity tests (48 teams, 12 groups, 16 venues)
- [ ] `npm run build` completes without TypeScript errors
- [ ] Lighthouse Performance ≥ 85 on production build
- [ ] No console errors on mobile viewport (375px)
- [ ] Animations skip correctly when `prefers-reduced-motion: reduce` in OS settings
