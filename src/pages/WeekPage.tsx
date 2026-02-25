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
        <div className="text-coral text-lg">Loading...</div>
      </div>
    );
  }

  const today = new Date().getDay();

  return (
    <div className="flex-1 p-4 pb-24 space-y-4">
      <h1 className="text-2xl font-bold text-charcoal">Week {plan.weekNumber}</h1>

      {/* 7-day grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {DAY_NAMES.map((name, i) => (
          <div
            key={name}
            className={`py-2 rounded-lg font-medium ${
              i === today ? 'bg-coral text-white' : 'bg-cream-dark text-gray-warm'
            }`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Workout assignments */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-charcoal">Workouts this week</h2>
        {plan.workouts.map((w, i) => {
          const template = workoutTemplates.find((t) => t.id === w.templateId);
          if (!template) return null;

          return (
            <div
              key={i}
              className={`bg-white rounded-2xl p-4 shadow-sm border ${
                w.completed ? 'border-teal/30 opacity-70' : 'border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <div>
                    <p className="font-semibold text-charcoal">
                      {template.name}
                      {w.completed && ' ✓'}
                    </p>
                    <p className="text-sm text-gray-warm">{template.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                {/* Day assignment chips */}
                <div className="flex gap-1 flex-wrap">
                  {DAY_NAMES.map((name, dayIndex) => (
                    <button
                      key={name}
                      onClick={() => assignDay(i, w.assignedDay === dayIndex ? undefined : dayIndex)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                        w.assignedDay === dayIndex
                          ? 'bg-coral text-white'
                          : 'bg-cream-dark text-gray-warm hover:bg-coral/10'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {!w.completed && (
                  <button
                    onClick={() => navigate(`/workout/${plan.id}/${i}`)}
                    className="ml-auto px-4 py-2 bg-coral text-white rounded-xl text-sm font-semibold hover:bg-coral-dark transition-colors min-h-[44px]"
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
  );
}
