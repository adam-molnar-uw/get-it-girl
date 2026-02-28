import { useWeeklyPlan } from '../hooks/useWeeklyPlan';
import { PageTransition } from '../components/PageTransition';
import { workoutTemplates } from '../data/workout-templates';
import { DAY_NAMES } from '../types';
import { useNavigate } from 'react-router-dom';

export function WeekPage() {
  const { plan, loading, assignDay } = useWeeklyPlan();
  const navigate = useNavigate();

  if (loading || !plan) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-peach/30 border-t-peach rounded-full animate-spin" />
      </div>
    );
  }

  const today = new Date().getDay();

  // Build a map of which days have workouts assigned/completed
  const dayStatus = new Map<number, 'assigned' | 'completed'>();
  plan.workouts.forEach((w) => {
    if (w.assignedDay !== undefined) {
      dayStatus.set(w.assignedDay, w.completed ? 'completed' : 'assigned');
    }
  });

  return (
    <PageTransition>
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="font-display text-3xl text-lavender font-bold leading-none">
          Week {plan.weekNumber}
        </h1>
        <p className="text-text-muted text-xs font-medium mt-1">
          Plan your workouts
        </p>
      </div>

      {/* Calendar strip */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-7 gap-2 text-center">
          {DAY_NAMES.map((name, i) => {
            const status = dayStatus.get(i);
            const isToday = i === today;

            return (
              <div key={name} className="flex flex-col items-center gap-1.5">
                <span className={`text-[10px] font-bold tracking-wider ${
                  isToday ? 'text-peach' : 'text-text-muted'
                }`}>
                  {name.toUpperCase()}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isToday
                    ? 'bg-peach text-dark-base'
                    : status === 'completed'
                    ? 'bg-mint/20 text-mint'
                    : 'bg-white/5 text-text-secondary'
                }`}>
                  {status === 'completed' ? '✓' : i + 1}
                </div>
                {/* Dot indicator */}
                <div className={`w-1.5 h-1.5 rounded-full ${
                  status === 'completed'
                    ? 'bg-mint'
                    : status === 'assigned'
                    ? 'bg-peach'
                    : 'bg-transparent'
                }`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout list */}
      <div className="px-5 space-y-3 mt-2">
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">
          This week's workouts
        </h2>

        {plan.workouts.map((w, i) => {
          const template = workoutTemplates.find((t) => t.id === w.templateId);
          if (!template) return null;
          return (
            <div
              key={i}
              className={`animate-slide-up glass-card overflow-hidden ${
                w.completed ? 'opacity-50' : ''
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="p-4">
                {/* Workout info */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{template.emoji}</span>
                  <div className="flex-1">
                    <p className="font-display font-bold text-text-primary text-lg leading-tight">
                      {template.name}
                      {w.completed && <span className="text-mint ml-2">✓</span>}
                    </p>
                    <p className="text-xs text-text-secondary font-medium mt-0.5">
                      {template.exercises.length} exercise{template.exercises.length !== 1 ? 's' : ''} · ~{template.estimatedMinutes ?? template.exercises.length * 4} min
                    </p>
                  </div>
                </div>

                {/* Day assignment chips + GO */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 flex-wrap flex-1">
                    {DAY_NAMES.map((name, dayIndex) => (
                      <button
                        key={name}
                        onClick={() => assignDay(i, w.assignedDay === dayIndex ? undefined : dayIndex)}
                        className={`w-9 h-9 rounded-full text-[10px] font-bold tracking-wide transition-all flex items-center justify-center ${
                          w.assignedDay === dayIndex
                            ? 'bg-lavender text-dark-base'
                            : 'bg-white/5 text-text-muted active:scale-95'
                        }`}
                      >
                        {name.substring(0, 2).toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {!w.completed && (
                    <button
                      onClick={() => navigate(`/workout/${plan.id}/${i}`)}
                      className={`ml-auto px-5 py-2.5 bg-gradient-to-r from-peach-dark to-peach text-dark-base rounded-xl font-display text-base tracking-wider active:scale-95 transition-all min-h-[44px] font-bold`}
                    >
                      GO
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </PageTransition>
  );
}
