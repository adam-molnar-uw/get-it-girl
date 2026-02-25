import { getSwapOptions } from '../services/exercise-swap';
import { exercises as exerciseDB } from '../data/exercises';
import type { WorkoutType } from '../types';

interface SwapSheetProps {
  currentExerciseId: string;
  workoutType: WorkoutType;
  onSelect: (newExerciseId: string) => void;
  onClose: () => void;
}

export function SwapSheet({ currentExerciseId, workoutType, onSelect, onClose }: SwapSheetProps) {
  const options = getSwapOptions(currentExerciseId, workoutType);

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full bg-white rounded-t-3xl p-4 pb-8 max-h-[60vh] overflow-y-auto">
        <div className="w-10 h-1 bg-cream-dark rounded-full mx-auto mb-4" />
        <h3 className="text-lg font-bold text-charcoal mb-3">Swap exercise</h3>

        {options.length === 0 ? (
          <p className="text-gray-warm text-center py-6">No alternatives available</p>
        ) : (
          <div className="space-y-2">
            {options.map((opt) => {
              const exercise = exerciseDB.find((e) => e.id === opt);
              if (!exercise) return null;
              return (
                <button
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-cream-dark transition-colors text-left min-h-[48px]"
                >
                  <span className="text-xl">{exercise.emoji}</span>
                  <div>
                    <p className="font-medium text-charcoal">{exercise.name}</p>
                    <p className="text-xs text-gray-warm">
                      {exercise.muscleGroups.join(', ')}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-cream-dark text-charcoal rounded-xl font-semibold min-h-[44px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
