import { getTierForWeek } from '../data/progression-rules';
import { exercises as exerciseDB } from '../data/exercises';
import type { TemplateExercise, WorkoutSessionExercise } from '../types';

export function applyProgression(
  templateExercises: TemplateExercise[],
  programWeek: number
): WorkoutSessionExercise[] {
  const tier = getTierForWeek(programWeek);

  return templateExercises
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((te) => {
      const exercise = exerciseDB.find((e) => e.id === te.exerciseId);

      // For yoga/hold exercises, use hold time instead of sets/reps
      if (exercise?.isYoga || exercise?.defaultHoldSeconds) {
        return {
          exerciseId: getProgressedExerciseId(te.exerciseId, programWeek),
          sets: 1,
          reps: 1,
          holdSeconds: tier.yogaHoldSeconds,
          completed: false,
        };
      }

      return {
        exerciseId: getProgressedExerciseId(te.exerciseId, programWeek),
        sets: tier.sets,
        reps: tier.reps,
        tempoNote: tier.tempoNote,
        completed: false,
      };
    });
}

/**
 * If the program week is high enough, swap to a harder variation.
 */
function getProgressedExerciseId(exerciseId: string, programWeek: number): string {
  const exercise = exerciseDB.find((e) => e.id === exerciseId);
  if (!exercise || exercise.variations.length === 0) return exerciseId;

  // Find the hardest unlocked variation
  const unlocked = exercise.variations
    .filter((v) => programWeek >= v.unlocksAtWeek)
    .sort((a, b) => b.unlocksAtWeek - a.unlocksAtWeek);

  if (unlocked.length > 0) {
    // Verify the variation exists in the DB
    const variant = exerciseDB.find((e) => e.id === unlocked[0].exerciseId);
    if (variant) return variant.id;
  }

  return exerciseId;
}
