import type { WorkoutTemplate } from '../types';

export const workoutTemplates: WorkoutTemplate[] = [
  // ===== LOWER BODY (A) =====
  {
    id: 'lower-a1',
    name: 'Lower Body: Glute Focus',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Squats, bridges & lunges',
    exercises: [
      { exerciseId: 'goblet-squat', orderIndex: 0 },
      { exerciseId: 'romanian-deadlift', orderIndex: 1 },
      { exerciseId: 'glute-bridge', orderIndex: 2 },
      { exerciseId: 'dumbbell-lunges', orderIndex: 3 },
      { exerciseId: 'calf-raises', orderIndex: 4 },
    ],
  },
  {
    id: 'lower-a2',
    name: 'Lower Body: Quad Burner',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Squat & lunge variations',
    exercises: [
      { exerciseId: 'sumo-squat', orderIndex: 0 },
      { exerciseId: 'reverse-lunges', orderIndex: 1 },
      { exerciseId: 'step-ups', orderIndex: 2 },
      { exerciseId: 'goblet-squat', orderIndex: 3 },
      { exerciseId: 'calf-raises', orderIndex: 4 },
    ],
  },

  // ===== LOWER BODY (B) =====
  {
    id: 'lower-b1',
    name: 'Lower Body: Hamstring & Glute',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Hinges, bridges & step-ups',
    exercises: [
      { exerciseId: 'romanian-deadlift', orderIndex: 0 },
      { exerciseId: 'glute-bridge', orderIndex: 1 },
      { exerciseId: 'step-ups', orderIndex: 2 },
      { exerciseId: 'sumo-squat', orderIndex: 3 },
      { exerciseId: 'calf-raises', orderIndex: 4 },
    ],
  },
  {
    id: 'lower-b2',
    name: 'Lower Body: Unilateral',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Single-leg work for balance',
    exercises: [
      { exerciseId: 'reverse-lunges', orderIndex: 0 },
      { exerciseId: 'romanian-deadlift', orderIndex: 1 },
      { exerciseId: 'step-ups', orderIndex: 2 },
      { exerciseId: 'glute-bridge', orderIndex: 3 },
      { exerciseId: 'calf-raises', orderIndex: 4 },
    ],
  },

  // ===== FULL BODY =====
  {
    id: 'full-body-1',
    name: 'Full Body Strength',
    emoji: '💪',
    type: 'full-body',
    description: 'Push, pull, squat & core',
    exercises: [
      { exerciseId: 'goblet-squat', orderIndex: 0 },
      { exerciseId: 'dumbbell-press', orderIndex: 1 },
      { exerciseId: 'dumbbell-row', orderIndex: 2 },
      { exerciseId: 'overhead-press', orderIndex: 3 },
      { exerciseId: 'dead-bug', orderIndex: 4 },
      { exerciseId: 'plank', orderIndex: 5 },
    ],
  },
  {
    id: 'full-body-2',
    name: 'Full Body Power',
    emoji: '💪',
    type: 'full-body',
    description: 'Compound moves for strength',
    exercises: [
      { exerciseId: 'dumbbell-lunges', orderIndex: 0 },
      { exerciseId: 'push-ups', orderIndex: 1 },
      { exerciseId: 'dumbbell-row', orderIndex: 2 },
      { exerciseId: 'lateral-raise', orderIndex: 3 },
      { exerciseId: 'bicep-curl', orderIndex: 4 },
      { exerciseId: 'russian-twist', orderIndex: 5 },
    ],
  },
  {
    id: 'full-body-3',
    name: 'Full Body Sculpt',
    emoji: '💪',
    type: 'full-body',
    description: 'Arms, legs & core',
    exercises: [
      { exerciseId: 'sumo-squat', orderIndex: 0 },
      { exerciseId: 'overhead-press', orderIndex: 1 },
      { exerciseId: 'romanian-deadlift', orderIndex: 2 },
      { exerciseId: 'tricep-extension', orderIndex: 3 },
      { exerciseId: 'bicep-curl', orderIndex: 4 },
      { exerciseId: 'plank', orderIndex: 5 },
    ],
  },

  // ===== HIIT =====
  {
    id: 'hiit-1',
    name: 'HIIT: Full Send',
    emoji: '🔥',
    type: 'hiit',
    description: 'High intensity circuit',
    exercises: [
      { exerciseId: 'squat-jumps', orderIndex: 0 },
      { exerciseId: 'push-ups', orderIndex: 1 },
      { exerciseId: 'mountain-climbers', orderIndex: 2 },
      { exerciseId: 'dumbbell-thrusters', orderIndex: 3 },
      { exerciseId: 'high-knees', orderIndex: 4 },
      { exerciseId: 'burpees', orderIndex: 5 },
    ],
  },
  {
    id: 'hiit-2',
    name: 'HIIT: Lower Body Blast',
    emoji: '🔥',
    type: 'hiit',
    description: 'Explosive legs + cardio',
    exercises: [
      { exerciseId: 'squat-jumps', orderIndex: 0 },
      { exerciseId: 'dumbbell-lunges', orderIndex: 1 },
      { exerciseId: 'high-knees', orderIndex: 2 },
      { exerciseId: 'sumo-squat-pulse', orderIndex: 3 },
      { exerciseId: 'mountain-climbers', orderIndex: 4 },
      { exerciseId: 'dumbbell-snatch', orderIndex: 5 },
    ],
  },

  // ===== YOGA =====
  {
    id: 'yoga-1',
    name: 'Yoga: Flexibility Flow',
    emoji: '🧘',
    type: 'yoga',
    description: 'Deep stretches & hip openers',
    exercises: [
      { exerciseId: 'cat-cow', orderIndex: 0 },
      { exerciseId: 'downward-dog', orderIndex: 1 },
      { exerciseId: 'warrior-2', orderIndex: 2 },
      { exerciseId: 'pigeon-pose', orderIndex: 3 },
      { exerciseId: 'lizard-pose', orderIndex: 4 },
      { exerciseId: 'seated-forward-fold', orderIndex: 5 },
      { exerciseId: 'childs-pose', orderIndex: 6 },
    ],
  },
  {
    id: 'yoga-2',
    name: 'Yoga: Strength & Balance',
    emoji: '🧘',
    type: 'yoga',
    description: 'Warriors, balance & core',
    exercises: [
      { exerciseId: 'cat-cow', orderIndex: 0 },
      { exerciseId: 'downward-dog', orderIndex: 1 },
      { exerciseId: 'warrior-2', orderIndex: 2 },
      { exerciseId: 'warrior-3', orderIndex: 3 },
      { exerciseId: 'pigeon-pose', orderIndex: 4 },
      { exerciseId: 'forward-fold', orderIndex: 5 },
      { exerciseId: 'childs-pose', orderIndex: 6 },
    ],
  },

  // ===== UPPER BODY =====
  {
    id: 'upper-1',
    name: 'Upper Body: Push + Pull',
    emoji: '💪',
    type: 'upper-body',
    description: 'Chest, back, shoulders & arms',
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
  {
    id: 'upper-2',
    name: 'Upper Body: Strength Focus',
    emoji: '💪',
    type: 'upper-body',
    description: 'Heavy push, pull & isolation',
    exercises: [
      { exerciseId: 'db-bench-press', orderIndex: 0 },
      { exerciseId: 'single-arm-db-row', orderIndex: 1 },
      { exerciseId: 'overhead-press', orderIndex: 2 },
      { exerciseId: 'lat-pulldown', orderIndex: 3 },
      { exerciseId: 'cable-face-pull', orderIndex: 4 },
      { exerciseId: 'tricep-extension', orderIndex: 5 },
      { exerciseId: 'bicep-curl', orderIndex: 6 },
    ],
  },

  // ===== GYM LOWER BODY =====
  {
    id: 'lower-gym-1',
    name: 'Lower Body: Glute & Ham (Gym)',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Hip thrust, RDL, split squat & curls',
    exercises: [
      { exerciseId: 'barbell-hip-thrust', orderIndex: 0 },
      { exerciseId: 'romanian-deadlift', orderIndex: 1 },
      { exerciseId: 'bulgarian-split-squat', orderIndex: 2 },
      { exerciseId: 'leg-curl', orderIndex: 3 },
      { exerciseId: 'sumo-squat', orderIndex: 4 },
      { exerciseId: 'calf-raises', orderIndex: 5 },
    ],
  },

  // ===== GYM FULL BODY + VO₂ =====
  {
    id: 'full-body-vo2',
    name: 'Full Body + VO₂ Max',
    emoji: '🔥',
    type: 'full-body',
    description: 'Compound strength + intervals',
    exercises: [
      { exerciseId: 'barbell-squat', orderIndex: 0 },
      { exerciseId: 'single-arm-db-row', orderIndex: 1 },
      { exerciseId: 'push-ups', orderIndex: 2 },
      { exerciseId: 'romanian-deadlift', orderIndex: 3 },
      { exerciseId: 'ab-wheel', orderIndex: 4 },
      { exerciseId: 'vo2-max-intervals', orderIndex: 5 },
    ],
  },

  // ===== ASHTANGA YOGA =====
  {
    id: 'ashtanga-1',
    name: 'Mysore Ashtanga',
    emoji: '🧘',
    type: 'yoga',
    description: 'Full Primary Series — self-paced',
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
    exercises: [
      { exerciseId: 'zone-2-cardio', orderIndex: 0 },
    ],
  },

  // ===== ROTATING SLOT =====
  {
    id: 'cardio-1',
    name: 'Cardio Circuit',
    emoji: '🏃‍♀️',
    type: 'cardio',
    description: 'Heart-pumping bodyweight moves',
    exercises: [
      { exerciseId: 'jumping-jacks', orderIndex: 0 },
      { exerciseId: 'high-knees', orderIndex: 1 },
      { exerciseId: 'squat-jumps', orderIndex: 2 },
      { exerciseId: 'mountain-climbers', orderIndex: 3 },
      { exerciseId: 'skaters', orderIndex: 4 },
      { exerciseId: 'burpees', orderIndex: 5 },
    ],
  },
  {
    id: 'pilates-1',
    name: 'Pilates Core',
    emoji: '🏋️',
    type: 'pilates',
    description: 'Core strength & control',
    exercises: [
      { exerciseId: 'hundred', orderIndex: 0 },
      { exerciseId: 'dead-bug', orderIndex: 1 },
      { exerciseId: 'leg-circles', orderIndex: 2 },
      { exerciseId: 'plank', orderIndex: 3 },
      { exerciseId: 'side-plank', orderIndex: 4 },
    ],
  },
  {
    id: 'stretch-1',
    name: 'Full Body Stretch',
    emoji: '🌿',
    type: 'stretch',
    description: 'Gentle stretching & recovery',
    exercises: [
      { exerciseId: 'cat-cow', orderIndex: 0 },
      { exerciseId: 'downward-dog', orderIndex: 1 },
      { exerciseId: 'pigeon-pose', orderIndex: 2 },
      { exerciseId: 'lizard-pose', orderIndex: 3 },
      { exerciseId: 'seated-forward-fold', orderIndex: 4 },
      { exerciseId: 'childs-pose', orderIndex: 5 },
    ],
  },
  {
    id: 'recovery-1',
    name: 'Active Recovery',
    emoji: '🌸',
    type: 'recovery',
    description: 'Light movement & relaxation',
    exercises: [
      { exerciseId: 'cat-cow', orderIndex: 0 },
      { exerciseId: 'childs-pose', orderIndex: 1 },
      { exerciseId: 'forward-fold', orderIndex: 2 },
      { exerciseId: 'pigeon-pose', orderIndex: 3 },
      { exerciseId: 'seated-forward-fold', orderIndex: 4 },
    ],
  },
];
