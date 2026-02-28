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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="animate-slide-up relative w-full bg-dark-card rounded-t-2xl max-h-[60vh] overflow-hidden shadow-2xl border-t border-white/10">
        <div className="retro-stripes" />
        <div className="p-5 pb-10 overflow-y-auto max-h-[calc(60vh-6px)]">
          <h3 className="font-display text-2xl text-text-primary tracking-wider mb-4 font-bold">SWAP EXERCISE</h3>

          {options.length === 0 ? (
            <p className="text-text-secondary text-center py-8 font-medium">No alternatives available</p>
          ) : (
            <div className="space-y-2">
              {options.map((opt) => {
                const exercise = exerciseDB.find((e) => e.id === opt);
                if (!exercise) return null;
                return (
                  <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className="w-full flex items-center gap-3 p-4 rounded-xl active:scale-[0.98] transition-all text-left min-h-[56px] glass-card-light hover:border-peach/30"
                  >
                    <span className="text-2xl">{exercise.emoji}</span>
                    <div>
                      <p className="font-bold text-text-primary">{exercise.name}</p>
                      {exercise.description && (
                        <p className="text-xs text-text-primary/60 mt-0.5">{exercise.description}</p>
                      )}
                      <p className="text-xs text-text-secondary font-medium mt-0.5 uppercase tracking-wide">
                        {exercise.muscleGroups.join(' · ')}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-5 py-3.5 bg-white/10 text-text-primary rounded-lg font-bold active:scale-95 transition-all min-h-[44px] tracking-wide"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
