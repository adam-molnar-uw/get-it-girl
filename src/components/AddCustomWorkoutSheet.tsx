interface AddCustomWorkoutSheetProps {
  onQuickLog: () => void;
  onBuildWorkout: () => void;
  onClose: () => void;
}

export function AddCustomWorkoutSheet({ onQuickLog, onBuildWorkout, onClose }: AddCustomWorkoutSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="animate-slide-up relative w-full bg-dark-card rounded-t-2xl overflow-hidden shadow-2xl border-t border-white/10">
        <div className="p-5 pb-10">
          <h3 className="font-display text-2xl text-text-primary tracking-wider mb-4 font-bold">
            ADD A WORKOUT
          </h3>

          <div className="space-y-3">
            <button
              onClick={onQuickLog}
              className="w-full glass-card-light p-4 text-left active:scale-[0.98] transition-all min-h-[56px] hover:border-peach/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-bold text-text-primary">Quick Log</p>
                  <p className="text-xs text-text-secondary font-medium mt-0.5">
                    Just log it — no exercise tracking
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onBuildWorkout}
              className="w-full glass-card-light p-4 text-left active:scale-[0.98] transition-all min-h-[56px] hover:border-peach/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏋️</span>
                <div>
                  <p className="font-bold text-text-primary">Build Workout</p>
                  <p className="text-xs text-text-secondary font-medium mt-0.5">
                    Pick exercises, track sets
                  </p>
                </div>
              </div>
            </button>
          </div>

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
