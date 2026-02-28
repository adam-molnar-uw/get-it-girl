import type { WorkoutTemplate } from '../types';

/**
 * Templates aligned to program.js — science-backed weekly structure:
 *   Mon: Lower Body A (Glute & Hamstring)
 *   Tue: Mysore Ashtanga
 *   Wed: Upper Body (Push + Pull)
 *   Thu: Mysore Ashtanga
 *   Fri: Full Body + VO₂ Max
 *   Sat: Zone 2 Cardio
 *   Sun: Rest
 *
 * Protocols: Galpin/Huberman (strength), Attia (VO₂/Zone 2),
 * Stacy Sims (cycle periodization), Ashtanga (Jois lineage)
 */

export const workoutTemplates: WorkoutTemplate[] = [
  // ===== LOWER BODY — Glute & Hamstring Focus =====
  // Compound hip hinge + squat first (highest CNS output).
  // Hip Thrust = strongest glute EMG activation (Contreras, 2015).
  // Bulgarian Split Squat = equivalent quad hypertrophy to barbell squat, lower spinal load.
  {
    id: 'lower-gym-1',
    name: 'Lower Body: Glute & Ham',
    emoji: '🍑',
    type: 'lower-body',
    description: 'Hip thrust, RDL, split squat & curls',
    estimatedMinutes: 55,
    exercises: [
      { exerciseId: 'barbell-hip-thrust', orderIndex: 0 },
      { exerciseId: 'romanian-deadlift', orderIndex: 1 },
      { exerciseId: 'bulgarian-split-squat', orderIndex: 2 },
      { exerciseId: 'leg-curl', orderIndex: 3 },
      { exerciseId: 'sumo-squat', orderIndex: 4 },
      { exerciseId: 'calf-raises', orderIndex: 5 },
    ],
  },

  // ===== UPPER BODY — Push + Pull Balance =====
  // Pairing push/pull builds horizontal balance — critical for shoulder health.
  // Posterior chain (lats, rear delts, mid-traps) chronically undertrained in women.
  // Face pulls = shoulder health insurance.
  {
    id: 'upper-1',
    name: 'Upper Body: Push + Pull',
    emoji: '💪',
    type: 'upper-body',
    description: 'Chest, back, shoulders & arms',
    estimatedMinutes: 60,
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

  // ===== FULL BODY + VO₂ MAX =====
  // Heavier compounds (squat, row, push-up, RDL, core) followed by
  // 4×4 Norwegian intervals — VO₂ max is the single strongest predictor
  // of all-cause mortality (Kokkinos, 2018).
  {
    id: 'full-body-vo2',
    name: 'Full Body + VO₂ Max',
    emoji: '🔥',
    type: 'full-body',
    description: 'Compound strength + intervals',
    estimatedMinutes: 70,
    exercises: [
      { exerciseId: 'barbell-squat', orderIndex: 0 },
      { exerciseId: 'single-arm-db-row', orderIndex: 1 },
      { exerciseId: 'push-ups', orderIndex: 2 },
      { exerciseId: 'romanian-deadlift', orderIndex: 3 },
      { exerciseId: 'ab-wheel', orderIndex: 4 },
      { exerciseId: 'vo2-max-intervals', orderIndex: 5 },
    ],
  },

  // ===== MYSORE ASHTANGA — Full Primary Series =====
  // Yoga Chikitsa ("Yoga Therapy"). Self-paced, own breath count.
  // Restores ROM, decompresses lumbar spine, accelerates lactate clearance.
  // Naturally sits in Zone 1–2 HR (110–148 bpm) — additive aerobic volume
  // at no extra recovery cost.
  {
    id: 'ashtanga-1',
    name: 'Mysore Ashtanga',
    emoji: '🧘',
    type: 'yoga',
    description: 'Full Primary Series — self-paced',
    estimatedMinutes: 90,
    exercises: [
      { exerciseId: 'ashtanga-sun-salutations', orderIndex: 0 },
      { exerciseId: 'ashtanga-standing', orderIndex: 1 },
      { exerciseId: 'ashtanga-seated', orderIndex: 2 },
      { exerciseId: 'ashtanga-backbending', orderIndex: 3 },
      { exerciseId: 'ashtanga-finishing', orderIndex: 4 },
    ],
  },

  // ===== ZONE 2 CARDIO =====
  // Primary driver of metabolic health. Stimulates mitochondrial biogenesis,
  // fat oxidation, insulin sensitivity. 45–60 min at 135–148 bpm.
  // Attia: "Zone 2 is the single most important category of exercise for longevity."
  {
    id: 'zone2-1',
    name: 'Zone 2 Cardio',
    emoji: '💚',
    type: 'cardio',
    description: 'Aerobic base — bike, run, or walk',
    estimatedMinutes: 50,
    exercises: [
      { exerciseId: 'zone-2-cardio', orderIndex: 0 },
    ],
  },
];
