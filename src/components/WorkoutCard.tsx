import type { WorkoutTemplate } from '../types';

interface WorkoutCardProps {
  template: WorkoutTemplate;
  onStart: () => void;
  delay?: number;
}

export function WorkoutCard({ template, onStart, delay = 0 }: WorkoutCardProps) {
  return (
    <button
      onClick={onStart}
      className="animate-slide-up w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg flex items-center gap-4 active:scale-[0.97] transition-all duration-200 text-left min-h-[80px] border border-white/50"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-cream-dark flex items-center justify-center shrink-0">
        <span className="text-2xl">{template.emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-charcoal">{template.name}</p>
        <p className="text-sm text-gray-warm mt-0.5">{template.description}</p>
      </div>
      <div className="shrink-0 w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
        <span className="text-coral text-sm font-bold">→</span>
      </div>
    </button>
  );
}
