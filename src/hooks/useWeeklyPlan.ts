import { useState, useEffect, useCallback } from 'react';
import { getWeeklyPlan, saveWeeklyPlan, getProgression, saveProgression } from '../db/repositories';
import { generateWeeklyPlan } from '../services/week-generator';
import { workoutTemplates } from '../data/workout-templates';
import { checkForReminder } from '../services/notifications';
import type { WeeklyPlan, WeeklyPlanWorkout, ProgressionState } from '../types';

export function getCurrentWeekId(): string {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.ceil((now.getTime() - jan1.getTime()) / 86400000);
  const weekNum = Math.ceil((dayOfYear + jan1.getDay()) / 7);
  return `${now.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

export function useWeeklyPlan() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOrGenerate = useCallback(async () => {
    const weekId = getCurrentWeekId();

    // Load or init progression
    let progression = await getProgression();
    if (!progression) {
      progression = {
        id: 'current',
        currentWeek: 1,
        startDate: new Date().toISOString(),
      } satisfies ProgressionState;
      await saveProgression(progression);
    }

    // Check if we need to advance the week
    const startDate = new Date(progression.startDate);
    const now = new Date();
    const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / 86400000);
    const calculatedWeek = Math.max(1, Math.floor(daysSinceStart / 7) + 1);

    if (calculatedWeek > progression.currentWeek) {
      progression = { ...progression, currentWeek: calculatedWeek };
      await saveProgression(progression);
    }

    // Load existing plan or generate new one
    let existingPlan = await getWeeklyPlan(weekId);
    if (!existingPlan) {
      existingPlan = generateWeeklyPlan(progression.currentWeek);
      await saveWeeklyPlan(existingPlan);
    } else {
      // Auto-migrate: if plan has stale template IDs (from old program), regenerate
      const validIds = new Set(workoutTemplates.map((t) => t.id));
      const hasStale = existingPlan.workouts.some(
        (w) => w.templateId !== 'custom' && !validIds.has(w.templateId)
      );
      if (hasStale) {
        const customWorkouts = existingPlan.workouts.filter((w) => w.templateId === 'custom');
        const fresh = generateWeeklyPlan(progression.currentWeek);
        existingPlan = {
          ...fresh,
          id: existingPlan.id,
          workouts: [...fresh.workouts, ...customWorkouts],
        };
        await saveWeeklyPlan(existingPlan);
      }
    }

    setPlan(existingPlan);
    setLoading(false);

    // Check for notifications
    const hasUncompleted = existingPlan.workouts.some((w) => !w.completed);
    checkForReminder(hasUncompleted);
  }, []);

  useEffect(() => {
    loadOrGenerate();
  }, [loadOrGenerate]);

  const assignDay = useCallback(
    async (workoutIndex: number, day: number | undefined) => {
      if (!plan) return;
      const updated = {
        ...plan,
        workouts: plan.workouts.map((w, i) =>
          i === workoutIndex ? { ...w, assignedDay: day } : w
        ),
      };
      setPlan(updated);
      await saveWeeklyPlan(updated);
    },
    [plan]
  );

  const markCompleted = useCallback(
    async (workoutIndex: number, sessionId: string) => {
      if (!plan) return;
      const updated = {
        ...plan,
        workouts: plan.workouts.map((w, i) =>
          i === workoutIndex
            ? { ...w, completed: true, completedAt: new Date().toISOString(), sessionId }
            : w
        ),
      };
      setPlan(updated);
      await saveWeeklyPlan(updated);
    },
    [plan]
  );

  const swapTemplate = useCallback(
    async (workoutIndex: number, newTemplateId: string) => {
      if (!plan) return;
      const updated = {
        ...plan,
        workouts: plan.workouts.map((w, i) =>
          i === workoutIndex ? { ...w, templateId: newTemplateId, sessionId: undefined } : w
        ),
      };
      setPlan(updated);
      await saveWeeklyPlan(updated);
    },
    [plan]
  );

  const addCustomWorkout = useCallback(
    async (workout: WeeklyPlanWorkout) => {
      if (!plan) return -1;
      const updated = {
        ...plan,
        workouts: [...plan.workouts, workout],
      };
      setPlan(updated);
      await saveWeeklyPlan(updated);
      return updated.workouts.length - 1; // return new workout index
    },
    [plan]
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    await loadOrGenerate();
  }, [loadOrGenerate]);

  return { plan, loading, assignDay, swapTemplate, markCompleted, addCustomWorkout, refresh };
}
