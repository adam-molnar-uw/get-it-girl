import { workoutTemplates } from '../data/workout-templates';
import type { WeeklyPlan, WeeklyPlanWorkout, WorkoutType } from '../types';

/**
 * Weekly distribution:
 * 1. Lower Body Strength (A)
 * 2. Full Body Strength
 * 3. HIIT Circuit
 * 4. Yoga Flow
 * 5. Lower Body Strength (B)
 * 6. Rotating: Cardio / Pilates / Stretch / Recovery
 */

const SLOT_TYPES: { type: WorkoutType; variant?: 'a' | 'b' }[] = [
  { type: 'lower-body', variant: 'a' },
  { type: 'full-body' },
  { type: 'hiit' },
  { type: 'yoga' },
  { type: 'lower-body', variant: 'b' },
];

const ROTATING_TYPES: WorkoutType[] = ['cardio', 'pilates', 'stretch', 'recovery'];

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
    const candidates = workoutTemplates.filter((t) => {
      if (t.type !== slot.type) return false;
      if (slot.variant === 'a') return t.id.includes('-a');
      if (slot.variant === 'b') return t.id.includes('-b');
      return true;
    });

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
