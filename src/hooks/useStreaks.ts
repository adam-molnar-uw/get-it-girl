import { useState, useEffect, useCallback } from 'react';
import {
  getStreakData,
  saveStreakData,
  getAllHistory,
  getAllWeeklyPlans,
} from '../db/repositories';
import { calculateStreaks } from '../services/streak-calculator';
import type { StreakData } from '../types';

export function useStreaks() {
  const [streaks, setStreaks] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  const recalculate = useCallback(async () => {
    const [history, plans, existing] = await Promise.all([
      getAllHistory(),
      getAllWeeklyPlans(),
      getStreakData(),
    ]);

    const { currentStreak, longestStreak } = calculateStreaks(history, plans);

    const updated: StreakData = {
      id: 'current',
      currentStreak,
      longestStreak: Math.max(longestStreak, existing?.longestStreak ?? 0),
      lastCalculatedAt: new Date().toISOString(),
    };

    await saveStreakData(updated);
    setStreaks(updated);
    setLoading(false);
  }, []);

  useEffect(() => {
    recalculate();
  }, [recalculate]);

  return { streaks, loading, recalculate };
}
