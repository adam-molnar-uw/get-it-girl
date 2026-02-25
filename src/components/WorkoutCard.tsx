import type { WorkoutTemplate } from '../types';

const TYPE_COLORS: Record<string, string> = {
  'lower-body': 'bg-retro-red',
  'full-body': 'bg-retro-blue',
  'hiit': 'bg-retro-gold',
  'yoga': 'bg-retro-green',
  'cardio': 'bg-retro-red',
  'pilates': 'bg-retro-blue',
  'stretch': 'bg-retro-green',
  'recovery': 'bg-retro-gold',
};

interface WorkoutCardProps {
  template: WorkoutTemplate;
  onStart: () => void;
  delay?: number;
}

export function WorkoutCard({ template, onStart, delay = 0 }: WorkoutCardProps) {
  const accentColor = TYPE_COLORS[template.type] ?? 'bg-retro-red';

  return (
    <button
      onClick={onStart}
      className="animate-slide-up w-full bg-retro-white rounded-xl overflow-hidden shadow-md active:scale-[0.97] transition-all duration-200 text-left border border-retro-cream-dark"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-stretch">
        {/* Color stripe on left */}
        <div className={`w-2 ${accentColor} shrink-0`} />

        <div className="flex items-center gap-4 p-4 flex-1 min-h-[76px]">
          <span className="text-3xl">{template.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-retro-brown text-[15px]">{template.name}</p>
            <p className="text-xs text-retro-warm mt-0.5 font-medium">{template.description}</p>
          </div>
          <span className="font-display text-retro-red text-2xl tracking-wide">GO →</span>
        </div>
      </div>
    </button>
  );
}
