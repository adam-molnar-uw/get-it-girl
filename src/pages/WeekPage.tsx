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
        <div className="w-10 h-10 border-4 border-coral/30 border-t-coral rounded-full animate-spin" />
      </div>
    );
  }

  const today = new Date().getDay();

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal to-teal-light px-5 pt-6 pb-5 rounded-b-[2rem] shadow-lg">
        <h1 className="text-2xl font-bold text-white">Week {plan.weekNumber}</h1>
        <p className="text-white/80 text-sm mt-1">Plan your workouts</p>
      </div>

      <div className="px-4 mt-5 space-y-5">
        {/* 7-day grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
          {DAY_NAMES.map((name, i) => (
            <div
              key={name}
              className={`py-2.5 rounded-xl font-semibold transition-all ${
                i === today
                  ? 'bg-coral text-white shadow-md scale-105'
                  : 'bg-white text-gray-warm shadow-sm'
              }`}
            >
              {name}
            </div>
          ))}
        </div>

        {/* Workout assignments */}
        <div className="space-y-3">
          {plan.workouts.map((w, i) => {
            const template = workoutTemplates.find((t) => t.id === w.templateId);
            if (!template) return null;

            return (
              <div
                key={i}
                className={`animate-slide-up bg-white rounded-2xl p-4 shadow-md transition-all ${
                  w.completed ? 'border-2 border-teal/30 opacity-70' : ''
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cream-dark flex items-center justify-center">
                      <span className="text-xl">{template.emoji}</span>
                    </div>
                    <div>
                      <p className="font-bold text-charcoal">
                        {template.name}
                        {w.completed && <span className="text-teal ml-1.5">✓</span>}
                      </p>
                      <p className="text-xs text-gray-warm mt-0.5">{template.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  {/* Day assignment chips */}
                  <div className="flex gap-1 flex-wrap flex-1">
                    {DAY_NAMES.map((name, dayIndex) => (
                      <button
                        key={name}
                        onClick={() => assignDay(i, w.assignedDay === dayIndex ? undefined : dayIndex)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          w.assignedDay === dayIndex
                            ? 'bg-coral text-white shadow-sm scale-105'
                            : 'bg-cream-dark text-gray-warm active:scale-95'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>

                  {!w.completed && (
                    <button
                      onClick={() => navigate(`/workout/${plan.id}/${i}`)}
                      className="ml-auto px-4 py-2.5 bg-gradient-to-r from-coral to-coral-light text-white rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all min-h-[44px]"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
