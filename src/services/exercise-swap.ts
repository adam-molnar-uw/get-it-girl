import { exercises as exerciseDB } from '../data/exercises';
import type { WorkoutType } from '../types';

/**
 * Returns exercise IDs that can replace the given exercise.
 * Matches by swap group and workout type.
 */
export function getSwapOptions(exerciseId: string, workoutType: WorkoutType): string[] {
  const exercise = exerciseDB.find((e) => e.id === exerciseId);
  if (!exercise) return [];

  return exerciseDB
    .filter(
      (e) =>
        e.id !== exerciseId &&
        e.swapGroup === exercise.swapGroup &&
        e.workoutTypes.includes(workoutType)
    )
    .map((e) => e.id);
}
