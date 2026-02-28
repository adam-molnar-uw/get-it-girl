import type { WorkoutHistoryEntry, WeeklyPlan, Reward } from '../types';
import { rewards } from '../data/rewards';

export interface RewardStatus {
  reward: Reward;
  earned: boolean;
  progress: number; // 0-1
  current: number;
}

/**
 * Calculate the current streak in weeks (consecutive weeks with at least 1 workout).
 * Counts backward from the most recent week that has a workout.
 */
export function calculateWeekStreak(plans: WeeklyPlan[]): number {
  if (plans.length === 0) return 0;

  // Sort by weekNumber descending
  const sorted = [...plans].sort((a, b) => b.weekNumber - a.weekNumber);

  let streak = 0;
  let expectedWeek = sorted[0].weekNumber;

  for (const plan of sorted) {
    const hasCompletedWorkout = plan.workouts.some((w) => w.completed);
    if (plan.weekNumber === expectedWeek && hasCompletedWorkout) {
      streak++;
      expectedWeek--;
    } else if (plan.weekNumber === expectedWeek && !hasCompletedWorkout) {
      break;
    }
    // skip if plan.weekNumber < expectedWeek (gap means streak broke)
    if (plan.weekNumber < expectedWeek) break;
  }

  return streak;
}

/**
 * Evaluate all rewards and return their status.
 */
export function evaluateRewards(
  history: WorkoutHistoryEntry[],
  plans: WeeklyPlan[],
  currentWeek: number
): RewardStatus[] {
  const totalWorkouts = history.length;
  const weekStreak = calculateWeekStreak(plans);

  return rewards.map((reward) => {
    let earned = false;
    let progress = 0;
    let current = 0;

    switch (reward.type) {
      case 'streak':
        current = weekStreak;
        progress = Math.min(1, weekStreak / reward.requirement);
        earned = weekStreak >= reward.requirement;
        break;
      case 'total':
        current = totalWorkouts;
        progress = Math.min(1, totalWorkouts / reward.requirement);
        earned = totalWorkouts >= reward.requirement;
        break;
      case 'milestone':
        current = currentWeek;
        progress = Math.min(1, currentWeek / reward.requirement);
        earned = currentWeek >= reward.requirement;
        break;
    }

    return { reward, earned, progress, current };
  });
}
