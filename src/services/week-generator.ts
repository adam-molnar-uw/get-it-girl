import type { WeeklyPlan, WeeklyPlanWorkout } from '../types';

/**
 * Fixed weekly program — Thursday is always a gym day:
 *   Mon — Lower Body: Glute & Ham     (gym)
 *   Tue — Mysore Ashtanga             (home)
 *   Wed — Mysore Ashtanga             (home)
 *   Thu — Upper Body: Push + Pull     (gym)
 *   Fri — Mysore Ashtanga             (home)
 *   Sat — Full Body + VO₂ Max        (gym)
 *   Sun — Zone 2 Cardio              (anywhere)
 *
 * Same every week — no randomness. Science-backed structure.
 */

// [templateId, assignedDay] — day: 0=Sun, 1=Mon, ... 6=Sat
const WEEKLY_SCHEDULE: [string, number][] = [
  ['lower-gym-1',   1], // Mon
  ['ashtanga-1',    2], // Tue
  ['ashtanga-1',    3], // Wed
  ['upper-1',       4], // Thu  ← guaranteed gym day
  ['ashtanga-1',    5], // Fri
  ['full-body-vo2', 6], // Sat
  ['zone2-1',       0], // Sun
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
  const workouts: WeeklyPlanWorkout[] = WEEKLY_SCHEDULE.map(([templateId, assignedDay]) => ({
    templateId,
    assignedDay,
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
