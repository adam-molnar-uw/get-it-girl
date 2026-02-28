interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
  if (currentStreak === 0) return null;

  return (
    <div className="glass-card p-4 flex items-center justify-between animate-slide-up">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🔥</span>
        <div>
          <p className="font-display text-xl text-peach font-bold">
            {currentStreak} week streak!
          </p>
          {longestStreak > currentStreak && (
            <p className="text-xs text-text-muted font-medium mt-0.5">
              Best: {longestStreak} weeks
            </p>
          )}
        </div>
      </div>
      <div className="w-12 h-12 rounded-full bg-peach/15 flex items-center justify-center">
        <span className="font-display text-lg text-peach font-bold">
          {currentStreak}
        </span>
      </div>
    </div>
  );
}
