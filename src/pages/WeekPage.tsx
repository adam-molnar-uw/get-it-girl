import { useState } from 'react';
import { useWeeklyPlan } from '../hooks/useWeeklyPlan';
import { useCustomWorkout } from '../hooks/useCustomWorkout';
import { PageTransition } from '../components/PageTransition';
import { AddCustomWorkoutSheet } from '../components/AddCustomWorkoutSheet';
import { QuickLogSheet } from '../components/QuickLogSheet';
import { ExercisePickerSheet } from '../components/ExercisePickerSheet';
import { workoutTemplates } from '../data/workout-templates';
import { DAY_NAMES } from '../types';
import { useNavigate } from 'react-router-dom';

export function WeekPage() {
  const { plan, loading, assignDay, swapTemplate, refresh } = useWeeklyPlan();
  const { quickLog, startStructuredWorkout } = useCustomWorkout();
  const navigate = useNavigate();

  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);

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
          const isCustom = w.templateId === 'custom';
          const template = isCustom ? null : workoutTemplates.find((t) => t.id === w.templateId);
          if (!template && !isCustom) return null;

          const displayName = isCustom ? w.customWorkout?.name ?? 'Custom' : template!.name;
          const displayEmoji = isCustom ? w.customWorkout?.emoji ?? '💪' : template!.emoji;

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
                  <span className="text-3xl">{displayEmoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-text-primary text-lg leading-tight">
                        {displayName}
                        {w.completed && <span className="text-mint ml-2">✓</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {isCustom ? (
                        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-lavender/15 text-lavender">
                          CUSTOM
                        </span>
                      ) : template!.location && (
                        <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          template!.location === 'gym' ? 'bg-peach/15 text-peach' :
                          template!.location === 'home' ? 'bg-mint/15 text-mint' :
                          'bg-lavender/15 text-lavender'
                        }`}>
                          {template!.location === 'gym' ? '🏋️ GYM' : template!.location === 'home' ? '🏠 HOME' : '🌍 ANY'}
                        </span>
                      )}
                      {!isCustom && (
                        <span className="text-xs text-text-secondary font-medium">
                          {template!.exercises.length} exercise{template!.exercises.length !== 1 ? 's' : ''} · ~{template!.estimatedMinutes ?? template!.exercises.length * 4} min
                        </span>
                      )}
                      {isCustom && w.customWorkout?.notes && (
                        <span className="text-xs text-text-secondary font-medium italic truncate">
                          {w.customWorkout.notes}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Gym/Home toggle */}
                  {!isCustom && template!.alternativeId && !w.completed && (
                    <button
                      onClick={() => swapTemplate(i, template!.alternativeId!)}
                      className={`text-[10px] font-bold tracking-wider uppercase px-3 py-2 rounded-xl transition-all active:scale-95 min-h-[44px] ${
                        template!.location === 'gym'
                          ? 'bg-mint/15 text-mint'
                          : 'bg-peach/15 text-peach'
                      }`}
                    >
                      {template!.location === 'gym' ? '🏠' : '🏋️'}
                    </button>
                  )}
                </div>

                {/* Day assignment chips + GO */}
                <div className="flex items-center gap-2">
                  {!isCustom && (
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
                  )}
                  {isCustom && <div className="flex-1" />}

                  {w.completed ? (
                    <span className="ml-auto px-5 py-2.5 text-mint font-display text-base tracking-wider font-bold">
                      DONE ✓
                    </span>
                  ) : !isCustom ? (
                    <button
                      onClick={() => navigate(`/workout/${plan.id}/${i}`)}
                      className="ml-auto px-5 py-2.5 bg-gradient-to-r from-peach-dark to-peach text-dark-base rounded-xl font-display text-base tracking-wider active:scale-95 transition-all min-h-[44px] font-bold"
                    >
                      GO
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/workout/${plan.id}/${i}`)}
                      className="ml-auto px-5 py-2.5 bg-gradient-to-r from-peach-dark to-peach text-dark-base rounded-xl font-display text-base tracking-wider active:scale-95 transition-all min-h-[44px] font-bold"
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

      {/* FAB */}
      <button
        onClick={() => setShowAddSheet(true)}
        className="fixed z-40 w-14 h-14 rounded-full bg-gradient-to-r from-peach-dark to-peach text-dark-base shadow-lg flex items-center justify-center text-2xl font-bold active:scale-90 transition-all"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 5.5rem)', right: '1.25rem' }}
      >
        +
      </button>

      {/* Add custom workout sheet */}
      {showAddSheet && (
        <AddCustomWorkoutSheet
          onQuickLog={() => { setShowAddSheet(false); setShowQuickLog(true); }}
          onBuildWorkout={() => { setShowAddSheet(false); setShowExercisePicker(true); }}
          onClose={() => setShowAddSheet(false)}
        />
      )}

      {/* Quick log sheet */}
      {showQuickLog && (
        <QuickLogSheet
          onLog={async (data) => {
            await quickLog(plan.id, data);
            setShowQuickLog(false);
            refresh();
          }}
          onClose={() => setShowQuickLog(false)}
        />
      )}

      {/* Exercise picker */}
      {showExercisePicker && (
        <ExercisePickerSheet
          onStart={async (data) => {
            const idx = await startStructuredWorkout(plan.id, data);
            setShowExercisePicker(false);
            if (idx >= 0) {
              navigate(`/workout/${plan.id}/${idx}`);
            }
          }}
          onClose={() => setShowExercisePicker(false)}
        />
      )}
    </div>
    </PageTransition>
  );
}
