import { useWeeklyPlan } from '../hooks/useWeeklyPlan';
import { workoutTemplates } from '../data/workout-templates';
import { DAY_NAMES } from '../types';
import { useNavigate } from 'react-router-dom';

export function WeekPage() {
  const { plan, loading, assignDay } = useWeeklyPlan();
  const navigate = useNavigate();

  if (loading || !plan) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-retro-red/30 border-t-retro-red rounded-full animate-spin" />
      </div>
    );
  }

  const today = new Date().getDay();

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="bg-retro-blue px-5 pt-6 pb-5">
        <h1 className="font-display text-4xl text-white tracking-wide leading-none">
          WEEK {plan.weekNumber}
        </h1>
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-2">
          Plan your workouts
        </p>
      </div>
      <div className="retro-stripes" />

      <div className="px-4 mt-5 space-y-5">
        {/* 7-day grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {DAY_NAMES.map((name, i) => (
            <div
              key={name}
              className={`py-2.5 rounded-lg font-bold text-xs tracking-wider transition-all ${
                i === today
                  ? 'bg-retro-red text-white shadow-md'
                  : 'bg-retro-white text-retro-warm border border-retro-cream-dark'
              }`}
            >
              {name.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Workout list */}
        <div className="space-y-3">
          {plan.workouts.map((w, i) => {
            const template = workoutTemplates.find((t) => t.id === w.templateId);
            if (!template) return null;

            return (
              <div
                key={i}
                className={`animate-slide-up bg-retro-white rounded-xl overflow-hidden border border-retro-cream-dark shadow-md ${
                  w.completed ? 'opacity-60' : ''
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{template.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-retro-brown text-[15px]">
                        {template.name}
                        {w.completed && <span className="text-retro-green ml-2">✓</span>}
                      </p>
                      <p className="text-xs text-retro-warm font-medium mt-0.5">{template.description}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-1 flex-wrap flex-1">
                      {DAY_NAMES.map((name, dayIndex) => (
                        <button
                          key={name}
                          onClick={() => assignDay(i, w.assignedDay === dayIndex ? undefined : dayIndex)}
                          className={`px-2 py-1.5 rounded text-[10px] font-bold tracking-wider transition-all ${
                            w.assignedDay === dayIndex
                              ? 'bg-retro-blue text-white'
                              : 'bg-retro-cream-dark text-retro-warm active:scale-95'
                          }`}
                        >
                          {name.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {!w.completed && (
                      <button
                        onClick={() => navigate(`/workout/${plan.id}/${i}`)}
                        className="ml-auto px-4 py-2.5 bg-retro-red text-white rounded-lg font-display text-lg tracking-wider shadow-md active:scale-95 transition-all min-h-[44px]"
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
    </div>
  );
}
