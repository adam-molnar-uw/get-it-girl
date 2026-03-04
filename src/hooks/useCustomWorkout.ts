import { useCallback } from 'react';
import {
  getWeeklyPlan,
  saveWeeklyPlan,
  saveSession,
  addHistoryEntry,
  getProgression,
  getAllHistory,
  getAllWeeklyPlans,
  getAllEarnedBadges,
  awardBadge,
  getStreakData,
  saveStreakData,
} from '../db/repositories';
import { applyProgression } from '../services/progression';
import { calculateStreaks } from '../services/streak-calculator';
import { checkNewBadges } from '../services/badge-checker';
import type {
  WeeklyPlanWorkout,
  WorkoutSession,
  WorkoutHistoryEntry,
  CustomWorkoutInfo,
} from '../types';

function buildCompletedAt(weekStartDate: string, dayOfWeek: number): string {
  const monday = new Date(weekStartDate);
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const target = new Date(monday);
  target.setDate(monday.getDate() + offset);
  target.setHours(12, 0, 0, 0);
  return target.toISOString();
}

async function recalcStreaksAndBadges(weekPlanId: string, completedAt: string) {
  const [allHistory, allPlans, existingStreak] = await Promise.all([
    getAllHistory(),
    getAllWeeklyPlans(),
    getStreakData(),
  ]);

  const { currentStreak, longestStreak } = calculateStreaks(allHistory, allPlans);
  await saveStreakData({
    id: 'current',
    currentStreak,
    longestStreak: Math.max(longestStreak, existingStreak?.longestStreak ?? 0),
    lastCalculatedAt: new Date().toISOString(),
  });

  const plan = await getWeeklyPlan(weekPlanId);
  if (plan) {
    const [progression, earnedBadges] = await Promise.all([
      getProgression(),
      getAllEarnedBadges(),
    ]);
    if (progression) {
      const newBadges = checkNewBadges({
        allHistory,
        allPlans,
        currentPlan: plan,
        progression,
        currentStreak,
        earnedBadges,
      });
      for (const badge of newBadges) {
        await awardBadge({ id: badge.id, earnedAt: completedAt, weekPlanId });
      }
    }
  }
}

export function useCustomWorkout() {
  const quickLog = useCallback(
    async (
      weekId: string,
      info: { name: string; emoji: string; notes?: string; day: number }
    ) => {
      const plan = await getWeeklyPlan(weekId);
      if (!plan) return;

      const completedAt = buildCompletedAt(plan.startDate, info.day);
      const custom: CustomWorkoutInfo = {
        name: info.name,
        emoji: info.emoji,
        notes: info.notes,
        mode: 'quick',
      };

      const workout: WeeklyPlanWorkout = {
        templateId: 'custom',
        assignedDay: info.day,
        completed: true,
        completedAt,
        customWorkout: custom,
      };

      const updated = { ...plan, workouts: [...plan.workouts, workout] };
      await saveWeeklyPlan(updated);

      const historyEntry: WorkoutHistoryEntry = {
        id: `history-custom-${Date.now()}`,
        weekPlanId: weekId,
        templateId: 'custom',
        templateName: info.name,
        templateEmoji: info.emoji,
        completedAt,
        exerciseCount: 0,
        customWorkout: custom,
      };
      await addHistoryEntry(historyEntry);

      await recalcStreaksAndBadges(weekId, completedAt);
    },
    []
  );

  const startStructuredWorkout = useCallback(
    async (
      weekId: string,
      info: { name: string; emoji: string; exerciseIds: string[]; day?: number }
    ): Promise<number> => {
      const plan = await getWeeklyPlan(weekId);
      if (!plan) return -1;

      const progression = await getProgression();
      const programWeek = progression?.currentWeek ?? 1;

      const templateExercises = info.exerciseIds.map((id, i) => ({
        exerciseId: id,
        orderIndex: i,
      }));
      const exercises = applyProgression(templateExercises, programWeek);

      const sessionId = `custom-${Date.now()}`;
      const custom: CustomWorkoutInfo = {
        name: info.name,
        emoji: info.emoji,
        mode: 'structured',
      };

      const session: WorkoutSession = {
        id: sessionId,
        weekPlanId: weekId,
        templateId: 'custom',
        exercises,
        startedAt: new Date().toISOString(),
        customWorkout: custom,
      };
      await saveSession(session);

      const workout: WeeklyPlanWorkout = {
        templateId: 'custom',
        assignedDay: info.day ?? new Date().getDay(),
        completed: false,
        sessionId,
        customWorkout: custom,
      };

      const updated = { ...plan, workouts: [...plan.workouts, workout] };
      await saveWeeklyPlan(updated);

      return updated.workouts.length - 1;
    },
    []
  );

  return { quickLog, startStructuredWorkout };
}
