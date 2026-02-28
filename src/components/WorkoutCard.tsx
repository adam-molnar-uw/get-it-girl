import type { WorkoutTemplate } from '../types';

const TYPE_GRADIENTS: Record<string, string> = {
  'lower-body': 'from-peach-dark/30 to-peach/10',
  'upper-body': 'from-lavender/30 to-lavender-light/10',
  'full-body': 'from-lavender/30 to-lavender-light/10',
  'hiit': 'from-peach/30 to-danger/10',
  'yoga': 'from-mint/30 to-mint-light/10',
  'cardio': 'from-peach-dark/30 to-peach/10',
  'pilates': 'from-lavender/30 to-lavender-light/10',
  'stretch': 'from-mint-dark/30 to-mint/10',
  'recovery': 'from-mint-light/30 to-mint/10',
};

const TYPE_LABELS: Record<string, string> = {
  'lower-body': 'LOWER BODY',
  'upper-body': 'UPPER BODY',
  'full-body': 'FULL BODY',
  'hiit': 'HIIT',
  'yoga': 'YOGA',
  'cardio': 'CARDIO',
  'pilates': 'PILATES',
  'stretch': 'STRETCH',
  'recovery': 'RECOVERY',
};

const TYPE_ACCENT: Record<string, string> = {
  'lower-body': 'text-peach',
  'upper-body': 'text-lavender',
  'full-body': 'text-lavender',
  'hiit': 'text-peach',
  'yoga': 'text-mint',
  'cardio': 'text-peach',
  'pilates': 'text-lavender',
  'stretch': 'text-mint',
  'recovery': 'text-mint-light',
};

const TYPE_BADGE: Record<string, string> = {
  'lower-body': 'bg-peach/20 text-peach',
  'upper-body': 'bg-lavender/20 text-lavender',
  'full-body': 'bg-lavender/20 text-lavender',
  'hiit': 'bg-peach/20 text-peach',
  'yoga': 'bg-mint/20 text-mint',
  'cardio': 'bg-peach/20 text-peach',
  'pilates': 'bg-lavender/20 text-lavender',
  'stretch': 'bg-mint/20 text-mint',
  'recovery': 'bg-mint-light/20 text-mint-light',
};

const LOCATION_BADGE: Record<string, { icon: string; label: string; style: string }> = {
  gym: { icon: '🏋️', label: 'GYM', style: 'bg-peach/15 text-peach' },
  home: { icon: '🏠', label: 'HOME', style: 'bg-mint/15 text-mint' },
  anywhere: { icon: '🌍', label: 'ANY', style: 'bg-lavender/15 text-lavender' },
};

interface WorkoutCardProps {
  template: WorkoutTemplate;
  onStart: () => void;
  delay?: number;
  featured?: boolean;
}

export function WorkoutCard({ template, onStart, delay = 0, featured = false }: WorkoutCardProps) {
  const gradient = TYPE_GRADIENTS[template.type] ?? 'from-peach/30 to-peach/10';
  const accent = TYPE_ACCENT[template.type] ?? 'text-peach';
  const badge = TYPE_BADGE[template.type] ?? 'bg-peach/20 text-peach';
  const label = TYPE_LABELS[template.type] ?? template.type.toUpperCase();
  const exerciseCount = template.exercises.length;
  const duration = template.estimatedMinutes ?? exerciseCount * 4;
  const loc = template.location ? LOCATION_BADGE[template.location] : null;

  if (featured) {
    return (
      <button
        onClick={onStart}
        className={`animate-slide-up w-full rounded-2xl overflow-hidden active:scale-[0.98] transition-all duration-200 text-left bg-gradient-to-br ${gradient} border border-white/10`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${badge}`}>
                {label}
              </span>
              {loc && (
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${loc.style}`}>
                  {loc.icon} {loc.label}
                </span>
              )}
            </div>
            <span className="text-4xl">{template.emoji}</span>
          </div>

          <h3 className="font-display text-2xl text-text-primary font-bold leading-tight mb-1">
            {template.name}
          </h3>
          <p className="text-sm text-text-secondary font-medium mb-6">
            {template.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted text-xs">💪</span>
                <span className="text-xs text-text-secondary font-semibold">{exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted text-xs">⏱</span>
                <span className="text-xs text-text-secondary font-semibold">~{duration} min</span>
              </div>
            </div>
            <span className={`font-display text-lg font-bold tracking-wider ${accent}`}>
              START →
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onStart}
      className={`animate-slide-up w-full rounded-2xl overflow-hidden active:scale-[0.98] transition-all duration-200 text-left bg-gradient-to-br ${gradient} border border-white/10`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{template.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${accent}`}>
                {label}
              </span>
              {loc && (
                <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${loc.style}`}>
                  {loc.icon} {loc.label}
                </span>
              )}
            </div>
            <p className="font-display font-bold text-text-primary text-lg leading-tight mt-0.5">
              {template.name}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs text-text-secondary font-semibold">{exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}</span>
              <span className="text-text-muted text-[8px]">●</span>
              <span className="text-xs text-text-secondary font-semibold">~{duration} min</span>
            </div>
          </div>
          <span className={`font-display text-xl font-bold tracking-wide ${accent}`}>→</span>
        </div>
      </div>
    </button>
  );
}
