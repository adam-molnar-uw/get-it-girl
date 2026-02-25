import type { ProgressionTier } from '../types';

export const progressionTiers: ProgressionTier[] = [
  { weekRange: [1, 2], sets: 2, reps: 10, yogaHoldSeconds: 20 },
  { weekRange: [3, 4], sets: 2, reps: 12, yogaHoldSeconds: 25 },
  { weekRange: [5, 6], sets: 3, reps: 10, yogaHoldSeconds: 30 },
  { weekRange: [7, 8], sets: 3, reps: 12, yogaHoldSeconds: 35 },
  {
    weekRange: [9, 10],
    sets: 3,
    reps: 10,
    tempoNote: '3s slow eccentric',
    yogaHoldSeconds: 40,
  },
  {
    weekRange: [11, 12],
    sets: 3,
    reps: 10,
    equipmentNote: 'Add resistance bands',
    yogaHoldSeconds: 45,
  },
  {
    weekRange: [13, 999],
    sets: 3,
    reps: 10,
    tempoNote: 'Harder variations',
    yogaHoldSeconds: 60,
  },
];

export function getTierForWeek(week: number): ProgressionTier {
  return (
    progressionTiers.find((t) => week >= t.weekRange[0] && week <= t.weekRange[1]) ??
    progressionTiers[progressionTiers.length - 1]
  );
}
