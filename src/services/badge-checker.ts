import type {
  Badge,
  BadgeCriteria,
  EarnedBadge,
  WorkoutHistoryEntry,
  WeeklyPlan,
  ProgressionState,
} from '../types';
import { allBadges } from '../data/badge-definitions';
import { workoutTemplates } from '../data/workout-templates';

export interface BadgeCheckContext {
  allHistory: WorkoutHistoryEntry[];
  allPlans: WeeklyPlan[];
  currentPlan: WeeklyPlan;
  progression: ProgressionState;
  currentStreak: number;
  earnedBadges: EarnedBadge[];
}

/**
 * Check which badges should be awarded based on current state.
 * Returns only newly earned badges (not already awarded).
 */
export function checkNewBadges(context: BadgeCheckContext): Badge[] {
  const earnedIds = new Set(context.earnedBadges.map((b) => b.id));
  const newBadges: Badge[] = [];

  for (const badge of allBadges) {
    if (earnedIds.has(badge.id)) continue;
    if (isCriteriaMet(badge.criteria, context)) {
      newBadges.push(badge);
    }
  }

  return newBadges;
}

function isCriteriaMet(criteria: BadgeCriteria, ctx: BadgeCheckContext): boolean {
  switch (criteria.type) {
    case 'first-workout':
      return ctx.allHistory.length >= 1;

    case 'first-week-complete':
      return ctx.allPlans.some((plan) =>
        plan.workouts.length > 0 && plan.workouts.every((w) => w.completed)
      );

    case 'streak-weeks':
      return ctx.currentStreak >= criteria.weeks;

    case 'total-workouts':
      return ctx.allHistory.length >= criteria.count;

    case 'type-count': {
      const count = ctx.allHistory.filter((h) => {
        const template = workoutTemplates.find((t) => t.id === h.templateId);
        return template?.type === criteria.workoutType;
      }).length;
      return count >= criteria.count;
    }

    case 'reach-week':
      return ctx.progression.currentWeek >= criteria.weekNumber;

    case 'perfect-week':
      return (
        ctx.currentPlan.workouts.length > 0 &&
        ctx.currentPlan.workouts.every((w) => w.completed)
      );

    default:
      return false;
  }
}
