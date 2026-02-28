import type { WeeklyPlan, WeeklyPlanWorkout } from '../types';

/**
 * Fixed weekly program (from program.js):
 *   1. Lower Body: Glute & Ham        (Mon)
 *   2. Upper Body: Push + Pull         (Wed)
 *   3. Full Body + VO₂ Max            (Fri)
 *   4. Mysore Ashtanga                 (Tue)
 *   5. Mysore Ashtanga                 (Thu)
 *   6. Zone 2 Cardio                   (Sat)
 *   Rest: Sunday
 *
 * Same every week — no randomness. Science-backed structure.
 */

const FIXED_TEMPLATE_IDS = [
  'lower-gym-1',     // Lower Body: Glute & Ham
  'upper-1',         // Upper Body: Push + Pull
  'full-body-vo2',   // Full Body + VO₂ Max
  'ashtanga-1',      // Mysore Ashtanga
  'ashtanga-1',      // Mysore Ashtanga
  'zone2-1',         // Zone 2 Cardio
];

function getWeekId(date: Date): string {
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
  const workouts: WeeklyPlanWorkout[] = FIXED_TEMPLATE_IDS.map((templateId) => ({
    templateId,
    completed: false,
  }));

  return {
    id: getWeekId(date),
    weekNumber: programWeek,
    startDate: getMondayOfWeek(date),
    workouts,
    generatedAt: new Date().toISOString(),
  };
}
