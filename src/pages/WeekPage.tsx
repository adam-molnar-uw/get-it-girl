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

  return (
    <PageTransition>
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-dark-surface to-dark-card px-5 pt-6 pb-5">
        <h1 className="font-display text-4xl text-lavender tracking-wide leading-none font-bold">
          WEEK {plan.weekNumber}
        </h1>
        <p className="text-text-muted text-xs font-bold uppercase tracking-widest mt-2">
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
                  ? 'bg-peach text-dark-base shadow-md'
                  : 'bg-dark-surface text-text-secondary border border-white/5'
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
                className={`animate-slide-up glass-card overflow-hidden ${
                  w.completed ? 'opacity-60' : ''
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{template.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-text-primary text-[15px]">
                        {template.name}
                        {w.completed && <span className="text-mint ml-2">✓</span>}
                      </p>
                      <p className="text-xs text-text-secondary font-medium mt-0.5">{template.description}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-1 flex-wrap flex-1">
                      {DAY_NAMES.map((name, dayIndex) => (
                        <button
                          key={name}
                          onClick={() => assignDay(i, w.assignedDay === dayIndex ? undefined : dayIndex)}
                          className={`px-2 py-1.5 rounded text-xs font-bold tracking-wide transition-all ${
                            w.assignedDay === dayIndex
                              ? 'bg-lavender text-dark-base'
                              : 'bg-white/5 text-text-secondary active:scale-95'
                          }`}
                        >
                          {name.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {!w.completed && (
                      <button
                        onClick={() => navigate(`/workout/${plan.id}/${i}`)}
                        className="ml-auto px-4 py-2.5 bg-peach text-dark-base rounded-xl font-display text-lg tracking-wider shadow-md active:scale-95 transition-all min-h-[44px] font-bold"
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
    </PageTransition>
  );
}
