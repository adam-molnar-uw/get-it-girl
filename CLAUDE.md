# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

"Get It Girl!" — a PWA workout tracker built as a gift. The user picks from 5-6 generated workouts each week and checks off exercises. The app auto-progresses difficulty every 2 weeks since weights are fixed (2x 18lb dumbbells). All data is local (IndexedDB), hosted on GitHub Pages.

**Live:** https://adam-molnar-uw.github.io/get-it-girl/

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # TypeScript check + production build (tsc -b && vite build)
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

Deploys automatically via GitHub Actions on push to `main` → GitHub Pages.

## Tech Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (uses `@import "tailwindcss"` + `@theme` block in `src/index.css`, NOT a tailwind.config file)
- react-router-dom v7 with **HashRouter** (required for GitHub Pages)
- `idb` for IndexedDB
- `vite-plugin-pwa` for service worker + manifest
- Base path: `/get-it-girl/` (set in `vite.config.ts`, `index.html`, and manifest)

## Architecture

### Data Flow

Static data (exercises, templates, progression rules) is bundled in `src/data/`. User state (weekly plans, sessions, history, settings) lives in IndexedDB via `src/db/`. Services in `src/services/` contain pure logic (no UI). Hooks in `src/hooks/` bridge DB + services to React components.

### Key Layers

| Layer | Files | Purpose |
|-------|-------|---------|
| **Types** | `src/types/index.ts` | All interfaces and type unions in one file |
| **Static Data** | `src/data/exercises.ts` | 59 exercises with descriptions, cues, swap groups, variation chains |
| | `src/data/workout-templates.ts` | 15 workout templates (2-3 per type) |
| | `src/data/progression-rules.ts` | 7 progression tiers with sets/reps/tempo |
| | `src/data/exercise-images.ts` | Maps exercise IDs → free-exercise-db CDN URLs |
| **Database** | `src/db/schema.ts` | IndexedDB schema (5 stores) |
| | `src/db/database.ts` | Singleton DB init via `getDB()` |
| | `src/db/repositories.ts` | CRUD for all stores |
| **Services** | `src/services/week-generator.ts` | Generates 6 workouts per week (Lower A, Full Body, HIIT, Yoga, Lower B, Rotating) |
| | `src/services/progression.ts` | Applies tier-based sets/reps/tempo and unlocks harder variations |
| | `src/services/exercise-swap.ts` | Finds alternatives in the same swap group |
| | `src/services/notifications.ts` | Check-on-visit reminder model |
| **Hooks** | `src/hooks/useWeeklyPlan.ts` | Loads/generates current week, assigns days, marks complete |
| | `src/hooks/useWorkoutSession.ts` | Creates/loads workout session, toggle/swap/complete |
| **Pages** | `src/pages/TodayPage.tsx` | Hero + progress ring + workout cards (route: `/`) |
| | `src/pages/WeekPage.tsx` | 7-day grid + day assignment (route: `/week`) |
| | `src/pages/WorkoutPage.tsx` | Exercise checklist (route: `/workout/:weekId/:workoutIndex`) |
| | `src/pages/HistoryPage.tsx` | Past workouts by week (route: `/history`) |
| | `src/pages/SettingsPage.tsx` | Preferences + reset (route: `/settings`) |

### Exercise System

Each exercise has: `id`, `name`, `emoji`, `muscleGroups`, `swapGroup`, `workoutTypes`, `equipment`, `description`, `cues`, `variations` (chain to harder exercises unlocked at specific weeks), and optional `isYoga`/`defaultHoldSeconds`.

**Swap groups** (e.g. `squat-pattern`, `hinge-pattern`) allow exercises to be swapped for same-pattern alternatives. **Variation chains** unlock harder exercises at progression milestones (e.g. Goblet Squat → Bulgarian Split Squat at week 7 → Pistol Squat at week 13).

### Progression System

Week number determines the progression tier (defined in `progression-rules.ts`). The `applyProgression()` service adjusts sets, reps, tempo, and swaps in harder variation exercises when their unlock week is reached.

| Weeks | Sets | Reps | Extras |
|-------|------|------|--------|
| 1-2 | 2 | 10 | Baseline |
| 3-4 | 2 | 12 | +reps |
| 5-6 | 3 | 10 | +sets |
| 7-8 | 3 | 12 | +reps +sets |
| 9-10 | 3 | 10 | 3s slow eccentric |
| 11-12 | 3 | 10 | Resistance bands |
| 13+ | 3 | 10 | Harder variations |

### Exercise Images

Images come from [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (public domain). The `ExerciseImage` component cross-fades between start/end position JPGs every 1.2s. Mapping is in `src/data/exercise-images.ts`. ~40 of 59 exercises are mapped; yoga poses mostly lack images.

## Design / Theme

**70s Adicolor retro** — light brown, powder blue, orange palette:

| Token | Hex | Role |
|-------|-----|------|
| `retro-red` | `#D97B3B` | Orange — primary accent, CTAs, hero headers |
| `retro-blue` | `#7DA3B5` | Powder blue — secondary headers |
| `retro-gold` | `#A68B6B` | Light brown — tertiary, progress bars |
| `retro-green` | `#588157` | Success/complete states |
| `retro-cream` | `#F5F0E8` | Page background |
| `retro-brown` | `#2B2118` | Text color |

- **Fonts:** Bebas Neue (display headings) + Inter (body) via Google Fonts
- **Retro stripes:** 3-color repeating gradient bar (orange/blue/brown) used as dividers
- All theme colors defined in `src/index.css` `@theme` block — change hex values there to update everywhere
- Touch targets: 44px minimum
- Tailwind classes reference theme tokens (e.g. `bg-retro-red`, `text-retro-brown`)

## Implementation Status

### Complete (Phases 1-8 + extras)
- [x] Full app scaffold with all routes and bottom nav
- [x] 59 exercises with descriptions, cues, swap groups, variation chains
- [x] 15 workout templates across 6 workout types
- [x] Progression engine (7 tiers)
- [x] Weekly plan generation + persistence
- [x] Workout execution (checklist, swap, complete)
- [x] History page
- [x] Settings page (notifications toggle, rest day yoga, reset)
- [x] Exercise images from free-exercise-db (cross-fade animation)
- [x] 70s Adicolor retro theme (light brown / powder blue / orange)
- [x] PWA with service worker, manifest, branded icons
- [x] GitHub Actions auto-deploy to Pages
- [x] Onboarding welcome flow (3 steps, shown once)
- [x] Page transition animations
- [x] Pull-to-refresh on Today page
- [x] Branded "GIG" app icons
- [x] Exercise how-to descriptions (all 59)
- [x] Mobile fixes: safe area insets for onboarding + complete button, font size bumps (nav labels, swap button, day chips)

### Potential Future Work
- **Health profile / personalized routines** — cycle-aware training, injury filters, goal-based templates (deferred pending user consent)
- **Per-set tracking** — check off individual sets instead of whole exercise
- **Rest timer** — optional countdown between sets
- **Workout duration tracking** — time workouts, show in history
- **Better completion animation** — confetti burst
- **Streaks / stats** — motivational tracking ("3 weeks in a row!")
- **Weekly summary card** — end-of-week recap
- **More exercise image coverage** — yoga poses missing from free-exercise-db
- **Mobile testing** — user hasn't sent screenshots yet; may have more visual issues on actual device
