import type { WeeklyPlan, WeeklyPlanWorkout } from '../types';

/**
 * Fixed weekly program — Thursday is always a gym day:
 *   Mon — Strong Curves A          (home default, gym toggle)
 *   Tue — Mysore Ashtanga          (home)
 *   Wed — Mysore Ashtanga          (home)
 *   Thu — Strong Curves B          (gym — guaranteed gym day)
 *   Fri — Mysore Ashtanga          (home)
 *   Sat — HIIT Circuit             (anywhere)
 *   Sun — Zone 2 Cardio            (anywhere)
 *
 * 7 options available — rest happens organically.
 */

// [templateId, assignedDay] — day: 0=Sun, 1=Mon, ... 6=Sat
const WEEKLY_SCHEDULE: [string, number][] = [
  ['sc-day-a-home', 1], // Mon
  ['ashtanga-1',    2], // Tue
  ['ashtanga-1',    3], // Wed
  ['sc-day-b',      4], // Thu  ← guaranteed gym day
  ['ashtanga-1',    5], // Fri
  ['hiit-1',        6], // Sat
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
