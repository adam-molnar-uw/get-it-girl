# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

"Get It Girl!" — a PWA workout tracker built as a gift. Strong Curves-inspired program with 7 weekly options: 2 SC strength days, 3 Mysore Ashtanga, 1 HIIT, 1 Zone 2 cardio. Rest happens organically. The app auto-progresses difficulty every 2 weeks since weights are fixed (2x 18lb dumbbells). All data is local (IndexedDB), hosted on GitHub Pages.

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
| **Static Data** | `src/data/exercises.ts` | 66 exercises with descriptions, cues, swap groups, variation chains |
| | `src/data/workout-templates.ts` | 7 workout templates (SC A/B gym+home, HIIT, Ashtanga, Zone 2) |
| | `src/data/progression-rules.ts` | 7 progression tiers with sets/reps/tempo |
| | `src/data/exercise-images.ts` | Maps exercise IDs → free-exercise-db CDN URLs |
| **Database** | `src/db/schema.ts` | IndexedDB schema (5 stores) |
| | `src/db/database.ts` | Singleton DB init via `getDB()` |
| | `src/db/repositories.ts` | CRUD for all stores |
| **Services** | `src/services/week-generator.ts` | Fixed 7-day schedule (SC A, 3x Ashtanga, SC B, HIIT, Zone 2) |
| | `src/services/progression.ts` | Applies tier-based sets/reps/tempo and unlocks harder variations |
| | `src/services/exercise-swap.ts` | Finds alternatives in the same swap group |
| | `src/services/notifications.ts` | Check-on-visit reminder model |
| **Hooks** | `src/hooks/useWeeklyPlan.ts` | Loads/generates current week, assigns days, marks complete |
| | `src/hooks/useWorkoutSession.ts` | Creates/loads workout session, toggle/swap/complete (per-set tracking) |
| **Pages** | `src/pages/TodayPage.tsx` | Hero + progress ring + workout cards + recovery tips (route: `/`) |
| | `src/pages/WeekPage.tsx` | 7-day grid + day assignment (route: `/week`) |
| | `src/pages/WorkoutPage.tsx` | Exercise checklist (route: `/workout/:weekId/:workoutIndex`) |
| | `src/pages/HistoryPage.tsx` | Past workouts by week (route: `/history`) |
| | `src/pages/SettingsPage.tsx` | Preferences + reset (route: `/settings`) |

### Weekly Schedule

```
Mon — Strong Curves A    (home default, gym toggle)
Tue — Mysore Ashtanga    (home)
Wed — Mysore Ashtanga    (home)
Thu — Strong Curves B    (gym — guaranteed gym day)
Fri — Mysore Ashtanga    (home)
Sat — HIIT Circuit       (anywhere)
Sun — Zone 2 Cardio      (anywhere)
```

SC templates follow superset structure: A1 glute → A2 pull → B1 squat/lunge → B2 push → C hinge → D glute accessory → E core. Each SC template has gym and home alternatives linked via `alternativeId`.

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

Images come from [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (public domain). The `ExerciseImage` component cross-fades between start/end position JPGs every 1.2s. Mapping is in `src/data/exercise-images.ts`. ~43 of 66 exercises are mapped; yoga poses mostly lack images.

## Design / Theme

**Dark glassmorphism** — dark navy with peach, mint, and lavender accents:

| Token | Hex | Role |
|-------|-----|------|
| `dark-base` | `#1A1A2E` | Background |
| `dark-card` | `#16213E` | Card background |
| `peach` | `#FFAD9E` | Primary accent, CTAs |
| `mint` | `#A8E6CF` | Success/complete states |
| `lavender` | `#C3B1E1` | Secondary accent, cues |
| `text-primary` | `#F0E6D3` | Primary text |
| `text-secondary` | `#8B8FA3` | Secondary text |

- **Fonts:** Quicksand (display headings) + Inter (body) via Google Fonts
- **Glass cards:** `backdrop-blur` with subtle border glow
- All theme colors defined in `src/index.css` `@theme` block — change hex values there to update everywhere
- Touch targets: 44px minimum
- Tailwind classes reference theme tokens (e.g. `bg-peach`, `text-mint`)

## Per-Set Tracking

Multi-set exercises show dots that fill one at a time on tap (e.g. 3 dots for 3 sets). Single-set exercises (protocols, yoga) use a simple checkbox. The `completedSets` field on `WorkoutSessionExercise` is optional for backward compatibility with existing IndexedDB data.
