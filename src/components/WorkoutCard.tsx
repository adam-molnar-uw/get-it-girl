import type { WorkoutTemplate } from '../types';

const TYPE_COLORS: Record<string, string> = {
  'lower-body': 'border-peach/40',
  'full-body': 'border-lavender/40',
  'hiit': 'border-peach-dark/40',
  'yoga': 'border-mint/40',
  'cardio': 'border-peach/40',
  'pilates': 'border-lavender/40',
  'stretch': 'border-mint/40',
  'recovery': 'border-mint-light/40',
};

const TYPE_ACCENT_TEXT: Record<string, string> = {
  'lower-body': 'text-peach',
  'full-body': 'text-lavender',
  'hiit': 'text-peach-dark',
  'yoga': 'text-mint',
  'cardio': 'text-peach',
  'pilates': 'text-lavender',
  'stretch': 'text-mint',
  'recovery': 'text-mint-light',
};

interface WorkoutCardProps {
  template: WorkoutTemplate;
  onStart: () => void;
  delay?: number;
}

export function WorkoutCard({ template, onStart, delay = 0 }: WorkoutCardProps) {
  const borderColor = TYPE_COLORS[template.type] ?? 'border-peach/40';
  const accentText = TYPE_ACCENT_TEXT[template.type] ?? 'text-peach';

  return (
    <button
      onClick={onStart}
      className={`animate-slide-up w-full glass-card overflow-hidden active:scale-[0.97] transition-all duration-200 text-left border-l-4 ${borderColor}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4 p-4 min-h-[76px]">
        <span className="text-3xl">{template.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-text-primary text-[15px]">{template.name}</p>
          <p className="text-xs text-text-secondary mt-0.5 font-medium">{template.description}</p>
        </div>
        <span className={`font-display text-2xl font-bold tracking-wide ${accentText}`}>GO →</span>
      </div>
    </button>
  );
}
