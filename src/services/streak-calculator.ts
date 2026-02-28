import type { WorkoutHistoryEntry, WeeklyPlan } from '../types';

export interface StreakResult {
  currentStreak: number;
  longestStreak: number;
}

/**
 * Calculate weekly streaks from workout history.
 * A "week" counts if it has at least 1 completed workout.
 * Consecutive means weekNumber N, N+1, N+2, etc.
 */
export function calculateStreaks(
  history: WorkoutHistoryEntry[],
  allPlans: WeeklyPlan[]
): StreakResult {
  if (history.length === 0 || allPlans.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Find which weeks have at least one completed workout
  const weeksWithActivity = new Set(history.map((h) => h.weekPlanId));

  // Get plans that had activity, sorted by week number
  const activePlans = allPlans
    .filter((p) => weeksWithActivity.has(p.id))
    .sort((a, b) => a.weekNumber - b.weekNumber);

  if (activePlans.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Walk through active plans and find streaks
  let longestStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < activePlans.length; i++) {
    if (activePlans[i].weekNumber === activePlans[i - 1].weekNumber + 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // Current streak: only valid if the most recent active week is
  // the current program week or last week
  const mostRecentActiveWeek = activePlans[activePlans.length - 1].weekNumber;
  const allPlansSorted = [...allPlans].sort((a, b) => b.weekNumber - a.weekNumber);
  const currentProgramWeek = allPlansSorted[0]?.weekNumber ?? 0;

  let currentStreak: number;
  if (currentProgramWeek - mostRecentActiveWeek <= 1) {
    // The trailing tempStreak is the current streak
    currentStreak = tempStreak;
  } else {
    currentStreak = 0;
  }

  return { currentStreak, longestStreak };
}
