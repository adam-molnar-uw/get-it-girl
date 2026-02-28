import { useState, useEffect, useCallback } from 'react';
import {
  getSession,
  saveSession,
  getWeeklyPlan,
  saveWeeklyPlan,
  addHistoryEntry,
  getProgression,
  getAllHistory,
  getAllWeeklyPlans,
  getAllEarnedBadges,
  awardBadge,
  getStreakData,
  saveStreakData,
} from '../db/repositories';
import { workoutTemplates } from '../data/workout-templates';
import { applyProgression } from '../services/progression';
import { calculateStreaks } from '../services/streak-calculator';
import { checkNewBadges } from '../services/badge-checker';
import type { WorkoutSession, WorkoutHistoryEntry, Badge } from '../types';

export function useWorkoutSession(weekId: string, workoutIndex: number) {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [newlyEarnedBadges, setNewlyEarnedBadges] = useState<Badge[]>([]);

  useEffect(() => {
    async function loadOrCreate() {
      const plan = await getWeeklyPlan(weekId);
      if (!plan || workoutIndex >= plan.workouts.length) {
        setLoading(false);
        return;
      }

      const workout = plan.workouts[workoutIndex];

      // If session already exists, load it
      if (workout.sessionId) {
        const existing = await getSession(workout.sessionId);
        if (existing) {
          setSession(existing);
          setLoading(false);
          return;
        }
      }

      // Create new session
      const template = workoutTemplates.find((t) => t.id === workout.templateId);
      if (!template) {
        setLoading(false);
        return;
      }

      const progression = await getProgression();
      const programWeek = progression?.currentWeek ?? 1;

      const sessionId = `${weekId}-${workoutIndex}-${Date.now()}`;
      const newSession: WorkoutSession = {
        id: sessionId,
        weekPlanId: weekId,
        templateId: template.id,
        exercises: applyProgression(template.exercises, programWeek),
        startedAt: new Date().toISOString(),
      };

      // Link session to plan
      const updatedPlan = {
        ...plan,
        workouts: plan.workouts.map((w, i) =>
          i === workoutIndex ? { ...w, sessionId } : w
        ),
      };
      await saveWeeklyPlan(updatedPlan);
      await saveSession(newSession);

      setSession(newSession);
      setLoading(false);
    }

    loadOrCreate();
  }, [weekId, workoutIndex]);

  const toggleExercise = useCallback(
    async (exerciseIndex: number) => {
      if (!session) return;
      const updated: WorkoutSession = {
        ...session,
        exercises: session.exercises.map((e, i) => {
          if (i !== exerciseIndex) return e;
          // Backward compat: derive completedSets if missing
          const currentSets = e.completedSets ?? (e.completed ? e.sets : 0);
          if (e.completed) {
            // Already done — reset
            return { ...e, completedSets: 0, completed: false };
          }
          const next = currentSets + 1;
          return {
            ...e,
            completedSets: next,
            completed: next >= e.sets,
          };
        }),
      };
      setSession(updated);
      await saveSession(updated);
    },
    [session]
  );

  const swapExercise = useCallback(
    async (exerciseIndex: number, newExerciseId: string) => {
      if (!session) return;
      const updated: WorkoutSession = {
        ...session,
        exercises: session.exercises.map((e, i) =>
          i === exerciseIndex ? { ...e, exerciseId: newExerciseId, completed: false } : e
        ),
      };
      setSession(updated);
      await saveSession(updated);
    },
    [session]
  );

  const completeWorkout = useCallback(async () => {
    if (!session) return;

    const template = workoutTemplates.find((t) => t.id === session.templateId);
    const completedAt = new Date().toISOString();

    // Update session
    const updatedSession: WorkoutSession = { ...session, completedAt };
    await saveSession(updatedSession);

    // Mark in weekly plan
    const plan = await getWeeklyPlan(session.weekPlanId);
    if (plan) {
      const updatedPlan = {
        ...plan,
        workouts: plan.workouts.map((w) =>
          w.sessionId === session.id ? { ...w, completed: true, completedAt } : w
        ),
      };
      await saveWeeklyPlan(updatedPlan);
    }

    // Add to history
    const historyEntry: WorkoutHistoryEntry = {
      id: `history-${session.id}`,
      weekPlanId: session.weekPlanId,
      templateId: session.templateId,
      templateName: template?.name ?? 'Workout',
      templateEmoji: template?.emoji ?? '💪',
      completedAt,
      exerciseCount: session.exercises.length,
    };
    await addHistoryEntry(historyEntry);

    // Recalculate streaks
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

    // Check for new badges
    const updatedPlanForBadges = plan
      ? {
          ...plan,
          workouts: plan.workouts.map((w) =>
            w.sessionId === session.id ? { ...w, completed: true, completedAt } : w
          ),
        }
      : null;

    if (updatedPlanForBadges) {
      const [progression, earnedBadges] = await Promise.all([
        getProgression(),
        getAllEarnedBadges(),
      ]);

      if (progression) {
        const newBadges = checkNewBadges({
          allHistory,
          allPlans,
          currentPlan: updatedPlanForBadges,
          progression,
          currentStreak,
          earnedBadges,
        });

        for (const badge of newBadges) {
          await awardBadge({
            id: badge.id,
            earnedAt: completedAt,
            weekPlanId: session.weekPlanId,
          });
        }

        setNewlyEarnedBadges(newBadges);
      }
    }

    setSession(updatedSession);
  }, [session]);

  return { session, loading, toggleExercise, swapExercise, completeWorkout, newlyEarnedBadges };
}
