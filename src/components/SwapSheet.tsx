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
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="animate-slide-up relative w-full bg-white rounded-t-3xl p-5 pb-10 max-h-[60vh] overflow-y-auto shadow-2xl">
        <div className="w-12 h-1.5 bg-cream-dark rounded-full mx-auto mb-5" />
        <h3 className="text-lg font-bold text-charcoal mb-4">Swap exercise</h3>

        {options.length === 0 ? (
          <p className="text-gray-warm text-center py-8">No alternatives available</p>
        ) : (
          <div className="space-y-2">
            {options.map((opt) => {
              const exercise = exerciseDB.find((e) => e.id === opt);
              if (!exercise) return null;
              return (
                <button
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-cream-dark active:scale-[0.98] transition-all text-left min-h-[56px] bg-cream/50"
                >
                  <div className="w-10 h-10 rounded-xl bg-cream-dark flex items-center justify-center">
                    <span className="text-xl">{exercise.emoji}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{exercise.name}</p>
                    <p className="text-xs text-gray-warm mt-0.5">
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
          className="w-full mt-5 py-3.5 bg-cream-dark text-charcoal rounded-xl font-bold active:scale-95 transition-all min-h-[44px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
