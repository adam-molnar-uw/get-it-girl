import { workoutTemplates } from '../data/workout-templates';
import type { WeeklyPlan, WeeklyPlanWorkout, WorkoutType } from '../types';

/**
 * Weekly distribution (program.js-aligned):
 * 1. Lower Body Strength
 * 2. Upper Body Strength
 * 3. Full Body (or Full Body + VO₂)
 * 4. Yoga (Ashtanga or Flow)
 * 5. Yoga (Ashtanga or Flow)
 * 6. Rotating: Cardio / HIIT / Pilates / Stretch / Recovery
 */

const SLOT_TYPES: { type: WorkoutType; variant?: 'a' | 'b' | 'gym' }[] = [
  { type: 'lower-body' },
  { type: 'upper-body' },
  { type: 'full-body' },
  { type: 'yoga' },
  { type: 'yoga' },
];

const ROTATING_TYPES: WorkoutType[] = ['cardio', 'hiit', 'pilates', 'stretch', 'recovery'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getWeekId(date: Date): string {
  // ISO week format: "2026-W09"
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.ceil((date.getTime() - jan1.getTime()) / 86400000);
  const weekNum = Math.ceil((dayOfYear + jan1.getDay()) / 7);
  return `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function getMondayOfWeek(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export function generateWeeklyPlan(programWeek: number, date: Date = new Date()): WeeklyPlan {
  const workouts: WeeklyPlanWorkout[] = [];

  // Slots 1-5: fixed types
  for (const slot of SLOT_TYPES) {
    const candidates = workoutTemplates.filter((t) => t.type === slot.type);

    const template = candidates.length > 0
      ? pickRandom(candidates)
      : workoutTemplates.find((t) => t.type === slot.type);

    if (template) {
      workouts.push({
        templateId: template.id,
        completed: false,
      });
    }
  }

  // Slot 6: rotating type
  const rotatingType = ROTATING_TYPES[(programWeek - 1) % ROTATING_TYPES.length];
  const rotatingCandidates = workoutTemplates.filter((t) => t.type === rotatingType);
  const rotatingTemplate = rotatingCandidates.length > 0
    ? pickRandom(rotatingCandidates)
    : workoutTemplates.find((t) => t.type === rotatingType);

  if (rotatingTemplate) {
    workouts.push({
      templateId: rotatingTemplate.id,
      completed: false,
    });
  }

  return {
    id: getWeekId(date),
    weekNumber: programWeek,
    startDate: getMondayOfWeek(date),
    workouts,
    generatedAt: new Date().toISOString(),
  };
}
