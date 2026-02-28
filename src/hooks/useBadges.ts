import { useState, useEffect, useCallback } from 'react';
import { getAllEarnedBadges } from '../db/repositories';
import type { EarnedBadge } from '../types';
import { allBadges } from '../data/badge-definitions';

export function useBadges() {
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const badges = await getAllEarnedBadges();
    setEarnedBadges(badges);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isEarned = useCallback(
    (badgeId: string) => earnedBadges.some((b) => b.id === badgeId),
    [earnedBadges]
  );

  return { earnedBadges, allBadges, loading, isEarned, refresh };
}
