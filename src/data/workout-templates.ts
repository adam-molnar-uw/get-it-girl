import type { WorkoutTemplate } from '../types';

/**
 * Templates aligned to program.js — science-backed weekly structure.
 * Each strength workout has a GYM and HOME (18lb dumbbell) version.
 *
 *   Mon: Lower Body (Gym or Home)
 *   Tue: Mysore Ashtanga (Home)
 *   Wed: Upper Body (Gym or Home)
 *   Thu: Mysore Ashtanga (Home)
 *   Fri: Full Body + VO₂ (Gym or Home)
 *   Sat: Zone 2 Cardio (Anywhere)
 *   Sun: Rest
 */

export const workoutTemplates: WorkoutTemplate[] = [
  // ===== LOWER BODY — GYM =====
  {
    id: 'lower-gym-1',
    name: 'Lower Body: Glute & Ham',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Hip thrust, RDL, split squat & curls',
    estimatedMinutes: 55,
    location: 'gym',
    alternativeId: 'lower-home-1',
    exercises: [
      { exerciseId: 'barbell-hip-thrust', orderIndex: 0 },
      { exerciseId: 'romanian-deadlift', orderIndex: 1 },
      { exerciseId: 'bulgarian-split-squat', orderIndex: 2 },
      { exerciseId: 'leg-curl', orderIndex: 3 },
      { exerciseId: 'sumo-squat', orderIndex: 4 },
      { exerciseId: 'calf-raises', orderIndex: 5 },
    ],
  },

  // ===== LOWER BODY — HOME (18lb dumbbells) =====
  {
    id: 'lower-home-1',
    name: 'Lower Body: Glute & Ham',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Squats, RDL, bridges & lunges',
    estimatedMinutes: 45,
    location: 'home',
    alternativeId: 'lower-gym-1',
    exercises: [
      { exerciseId: 'goblet-squat', orderIndex: 0 },
      { exerciseId: 'romanian-deadlift', orderIndex: 1 },
      { exerciseId: 'glute-bridge', orderIndex: 2 },
      { exerciseId: 'dumbbell-lunges', orderIndex: 3 },
      { exerciseId: 'sumo-squat', orderIndex: 4 },
      { exerciseId: 'calf-raises', orderIndex: 5 },
    ],
  },

  // ===== UPPER BODY — GYM =====
  {
    id: 'upper-1',
    name: 'Upper Body: Push + Pull',
    emoji: '💪',
    type: 'upper-body',
    description: 'Chest, back, shoulders & arms',
    estimatedMinutes: 60,
    location: 'gym',
    alternativeId: 'upper-home-1',
    exercises: [
      { exerciseId: 'db-bench-press', orderIndex: 0 },
      { exerciseId: 'seated-cable-row', orderIndex: 1 },
      { exerciseId: 'overhead-press', orderIndex: 2 },
      { exerciseId: 'lat-pulldown', orderIndex: 3 },
      { exerciseId: 'lateral-raise', orderIndex: 4 },
      { exerciseId: 'cable-face-pull', orderIndex: 5 },
      { exerciseId: 'tricep-pushdown', orderIndex: 6 },
      { exerciseId: 'hammer-curl', orderIndex: 7 },
    ],
  },

  // ===== UPPER BODY — HOME (18lb dumbbells) =====
  {
    id: 'upper-home-1',
    name: 'Upper Body: Push + Pull',
    emoji: '💪',
    type: 'upper-body',
    description: 'Press, row, shoulders & arms',
    estimatedMinutes: 45,
    location: 'home',
    alternativeId: 'upper-1',
    exercises: [
      { exerciseId: 'dumbbell-press', orderIndex: 0 },
      { exerciseId: 'dumbbell-row', orderIndex: 1 },
      { exerciseId: 'overhead-press', orderIndex: 2 },
      { exerciseId: 'lateral-raise', orderIndex: 3 },
      { exerciseId: 'tricep-extension', orderIndex: 4 },
      { exerciseId: 'bicep-curl', orderIndex: 5 },
    ],
  },

  // ===== FULL BODY + VO₂ — GYM =====
  {
    id: 'full-body-vo2',
    name: 'Full Body + VO₂ Max',
    emoji: '🔥',
    type: 'full-body',
    description: 'Compound strength + intervals',
    estimatedMinutes: 70,
    location: 'gym',
    alternativeId: 'full-body-home-1',
    exercises: [
      { exerciseId: 'barbell-squat', orderIndex: 0 },
      { exerciseId: 'single-arm-db-row', orderIndex: 1 },
      { exerciseId: 'push-ups', orderIndex: 2 },
      { exerciseId: 'romanian-deadlift', orderIndex: 3 },
      { exerciseId: 'ab-wheel', orderIndex: 4 },
      { exerciseId: 'vo2-max-intervals', orderIndex: 5 },
    ],
  },

  // ===== FULL BODY — HOME (18lb dumbbells) =====
  {
    id: 'full-body-home-1',
    name: 'Full Body Strength',
    emoji: '🔥',
    type: 'full-body',
    description: 'Push, pull, squat & core',
    estimatedMinutes: 45,
    location: 'home',
    alternativeId: 'full-body-vo2',
    exercises: [
      { exerciseId: 'goblet-squat', orderIndex: 0 },
      { exerciseId: 'push-ups', orderIndex: 1 },
      { exerciseId: 'dumbbell-row', orderIndex: 2 },
      { exerciseId: 'romanian-deadlift', orderIndex: 3 },
      { exerciseId: 'dead-bug', orderIndex: 4 },
      { exerciseId: 'plank', orderIndex: 5 },
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
      { exerciseId: 'ashtanga-sun-salutations', orderIndex: 0 },
      { exerciseId: 'ashtanga-standing', orderIndex: 1 },
      { exerciseId: 'ashtanga-seated', orderIndex: 2 },
      { exerciseId: 'ashtanga-backbending', orderIndex: 3 },
      { exerciseId: 'ashtanga-finishing', orderIndex: 4 },
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
