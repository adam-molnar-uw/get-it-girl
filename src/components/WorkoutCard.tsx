import type { WorkoutTemplate } from '../types';

interface WorkoutCardProps {
  template: WorkoutTemplate;
  onStart: () => void;
}

export function WorkoutCard({ template, onStart }: WorkoutCardProps) {
  return (
    <button
      onClick={onStart}
      className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform text-left min-h-[72px]"
    >
      <span className="text-3xl">{template.emoji}</span>
      <div className="flex-1">
        <p className="font-semibold text-charcoal">{template.name}</p>
        <p className="text-sm text-gray-warm">{template.description}</p>
      </div>
      <span className="text-coral font-semibold text-sm">Start →</span>
    </button>
  );
}
