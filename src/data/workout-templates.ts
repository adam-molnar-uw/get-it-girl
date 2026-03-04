import type { WorkoutTemplate } from '../types';

/**
 * Strong Curves-inspired weekly program:
 *   2 SC strength days (full-body, glute-focused, superset structure)
 *   3 Mysore Ashtanga
 *   1 HIIT (bodyweight circuit)
 *   1 Zone 2 Cardio
 *
 * SC superset order: A1 glute → A2 pull → B1 squat/lunge → B2 push → C hinge → D glute accessory → E core
 */

export const workoutTemplates: WorkoutTemplate[] = [
  // ===== STRONG CURVES DAY A — GYM =====
  {
    id: 'sc-day-a',
    name: 'Strong Curves A',
    emoji: '🍑',
    type: 'full-body',
    description: 'Hip thrust, squat, row & back extension',
    estimatedMinutes: 55,
    location: 'gym',
    alternativeId: 'sc-day-a-home',
    exercises: [
      { exerciseId: 'barbell-hip-thrust', orderIndex: 0 },     // A1 glute
      { exerciseId: 'seated-cable-row', orderIndex: 1 },        // A2 pull
      { exerciseId: 'barbell-squat', orderIndex: 2 },           // B1 squat
      { exerciseId: 'overhead-press', orderIndex: 3 },           // B2 push
      { exerciseId: 'back-extension', orderIndex: 4 },           // C hinge
      { exerciseId: 'side-lying-hip-abduction', orderIndex: 5 }, // D glute accessory
      { exerciseId: 'plank', orderIndex: 6 },                    // E core
    ],
  },

  // ===== STRONG CURVES DAY A — HOME =====
  {
    id: 'sc-day-a-home',
    name: 'Strong Curves A',
    emoji: '🍑',
    type: 'full-body',
    description: 'Glute bridge, goblet squat, row & RDL',
    estimatedMinutes: 45,
    location: 'home',
    alternativeId: 'sc-day-a',
    exercises: [
      { exerciseId: 'glute-bridge', orderIndex: 0 },             // A1 glute
      { exerciseId: 'dumbbell-row', orderIndex: 1 },             // A2 pull
      { exerciseId: 'goblet-squat', orderIndex: 2 },             // B1 squat
      { exerciseId: 'overhead-press', orderIndex: 3 },           // B2 push
      { exerciseId: 'romanian-deadlift', orderIndex: 4 },        // C hinge
      { exerciseId: 'side-lying-hip-abduction', orderIndex: 5 }, // D glute accessory
      { exerciseId: 'plank', orderIndex: 6 },                    // E core
    ],
  },

  // ===== STRONG CURVES DAY B — GYM =====
  {
    id: 'sc-day-b',
    name: 'Strong Curves B',
    emoji: '🍑',
    type: 'full-body',
    description: 'Hip thrust, lunge, lat pulldown & RDL',
    estimatedMinutes: 55,
    location: 'gym',
    alternativeId: 'sc-day-b-home',
    exercises: [
      { exerciseId: 'barbell-hip-thrust', orderIndex: 0 }, // A1 glute
      { exerciseId: 'lat-pulldown', orderIndex: 1 },       // A2 pull
      { exerciseId: 'dumbbell-lunges', orderIndex: 2 },    // B1 lunge
      { exerciseId: 'db-bench-press', orderIndex: 3 },     // B2 push
      { exerciseId: 'romanian-deadlift', orderIndex: 4 },  // C hinge
      { exerciseId: 'side-lying-clam', orderIndex: 5 },    // D glute accessory
      { exerciseId: 'dead-bug', orderIndex: 6 },           // E core
    ],
  },

  // ===== STRONG CURVES DAY B — HOME =====
  {
    id: 'sc-day-b-home',
    name: 'Strong Curves B',
    emoji: '🍑',
    type: 'full-body',
    description: 'Glute bridge, lunge, row & single-leg RDL',
    estimatedMinutes: 45,
    location: 'home',
    alternativeId: 'sc-day-b',
    exercises: [
      { exerciseId: 'glute-bridge', orderIndex: 0 },    // A1 glute
      { exerciseId: 'dumbbell-row', orderIndex: 1 },    // A2 pull
      { exerciseId: 'dumbbell-lunges', orderIndex: 2 }, // B1 lunge
      { exerciseId: 'push-ups', orderIndex: 3 },        // B2 push
      { exerciseId: 'single-leg-rdl', orderIndex: 4 },  // C hinge
      { exerciseId: 'side-lying-clam', orderIndex: 5 }, // D glute accessory
      { exerciseId: 'dead-bug', orderIndex: 6 },        // E core
    ],
  },

  // ===== HIIT — BODYWEIGHT CIRCUIT =====
  {
    id: 'hiit-1',
    name: 'HIIT Circuit',
    emoji: '🔥',
    type: 'hiit',
    description: 'Bodyweight cardio blast',
    estimatedMinutes: 25,
    location: 'anywhere',
    exercises: [
      { exerciseId: 'squat-jumps', orderIndex: 0 },
      { exerciseId: 'mountain-climbers', orderIndex: 1 },
      { exerciseId: 'burpees', orderIndex: 2 },
      { exerciseId: 'high-knees', orderIndex: 3 },
      { exerciseId: 'skaters', orderIndex: 4 },
      { exerciseId: 'jumping-jacks', orderIndex: 5 },
    ],
  },

  // ===== MYSORE ASHTANGA =====
  {
    id: 'ashtanga-1',
    name: 'Mysore Ashtanga',
    emoji: '🧘',
    type: 'yoga',
    description: 'Full Primary Series — self-paced',
    estimatedMinutes: 90,
    location: 'home',
    exercises: [
      { exerciseId: 'ashtanga-full-primary', orderIndex: 0 },
    ],
  },

  // ===== ZONE 2 CARDIO =====
  {
    id: 'zone2-1',
    name: 'Zone 2 Cardio',
    emoji: '💚',
    type: 'cardio',
    description: 'Aerobic base — bike, run, or walk',
    estimatedMinutes: 50,
    location: 'anywhere',
    exercises: [
      { exerciseId: 'zone-2-cardio', orderIndex: 0 },
    ],
  },
];
