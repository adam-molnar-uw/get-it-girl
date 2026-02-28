interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
}

export function ProgressRing({ completed, total }: ProgressRingProps) {
  const progress = total > 0 ? completed / total : 0;
  const isDone = progress >= 1;

  return (
    <div className={`w-full ${isDone ? 'animate-glow' : ''}`}>
      {/* Stats row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-text-secondary tracking-wide">
          WEEKLY PROGRESS
        </span>
        <span className={`font-display text-lg font-bold ${isDone ? 'text-mint' : 'text-peach'}`}>
          {completed}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-white/8 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isDone
              ? 'bg-gradient-to-r from-mint-dark to-mint'
              : 'bg-gradient-to-r from-peach-dark to-peach'
          }`}
          style={{ width: `${Math.max(progress * 100, 2)}%` }}
        />
      </div>

      {/* Workout dots */}
      <div className="flex items-center gap-2 mt-3 justify-center">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < completed
                ? isDone ? 'bg-mint' : 'bg-peach'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
