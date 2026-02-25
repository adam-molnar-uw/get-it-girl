interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
}

export function ProgressRing({ completed, total, size = 180 }: ProgressRingProps) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? completed / total : 0;
  const offset = circumference * (1 - progress);
  const isDone = progress >= 1;

  return (
    <div className={`relative ${isDone ? 'animate-glow' : ''}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F5EDE3"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isDone ? '#2EC4B6' : 'url(#progress-gradient)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FF8E8E" />
          </linearGradient>
        </defs>
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ${isDone ? 'scale-110' : ''}`}>
        <span className="text-4xl font-bold text-charcoal leading-none">
          {completed}/{total}
        </span>
        <span className="text-sm text-gray-warm mt-1">
          {isDone ? 'Complete!' : 'workouts'}
        </span>
      </div>
    </div>
  );
}
