import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { ExerciseRow } from '../components/ExerciseRow';
import { SwapSheet } from '../components/SwapSheet';
import { DayPickerInline } from '../components/DayPickerInline';
import { PageTransition } from '../components/PageTransition';
import { BadgeToast } from '../components/BadgeToast';
import { exercises as exerciseDB } from '../data/exercises';
import { workoutTemplates } from '../data/workout-templates';
import { DAY_NAMES } from '../types';
import type { WorkoutSessionExercise } from '../types';

const TYPE_GRADIENT: Record<string, string> = {
  'lower-body': 'from-peach-dark/20 to-dark-base',
  'upper-body': 'from-lavender/20 to-dark-base',
  'full-body': 'from-lavender/20 to-dark-base',
  'hiit': 'from-peach/20 to-dark-base',
  'yoga': 'from-mint/20 to-dark-base',
  'cardio': 'from-peach-dark/20 to-dark-base',
  'pilates': 'from-lavender/20 to-dark-base',
  'stretch': 'from-mint-dark/20 to-dark-base',
  'recovery': 'from-mint-light/20 to-dark-base',
  'custom': 'from-lavender/20 to-dark-base',
};

function buildCompletedAt(day: number): string {
  const now = new Date();
  const todayDay = now.getDay();
  const toMonday = (d: number) => (d === 0 ? 6 : d - 1);
  const diff = toMonday(day) - toMonday(todayDay);
  const target = new Date(now);
  target.setDate(now.getDate() + diff);
  target.setHours(12, 0, 0, 0);
  return target.toISOString();
}

export function WorkoutPage() {
  const { weekId, workoutIndex } = useParams<{ weekId: string; workoutIndex: string }>();
  const navigate = useNavigate();
  const idx = Number(workoutIndex);
  const { session, loading, toggleExercise, swapExercise, completeWorkout, newlyEarnedBadges } =
    useWorkoutSession(weekId!, idx);

  const [swapTarget, setSwapTarget] = useState<number | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showBadgeToast, setShowBadgeToast] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const isCustom = session?.templateId === 'custom';
  const template = session && !isCustom
    ? workoutTemplates.find((t) => t.id === session.templateId)
    : null;

  const displayName = session?.customWorkout?.name ?? template?.name ?? 'Workout';
  const displayEmoji = session?.customWorkout?.emoji ?? template?.emoji ?? '💪';
  const displayType = template?.type ?? 'custom';

  const completedCount = session?.exercises.filter((e) => e.completed).length ?? 0;
  const totalCount = session?.exercises.length ?? 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const allDone = totalCount > 0 && completedCount === totalCount;

  const handleComplete = useCallback(async () => {
    const completedAt = selectedDay !== new Date().getDay()
      ? buildCompletedAt(selectedDay)
      : undefined;
    await completeWorkout(completedAt);
    setShowCompletion(true);
  }, [completeWorkout, selectedDay]);

  useEffect(() => {
    if (showCompletion) {
      if (newlyEarnedBadges.length > 0) {
        const timer = setTimeout(() => setShowBadgeToast(true), 1500);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => navigate('/'), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [showCompletion, navigate, newlyEarnedBadges]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-peach/30 border-t-peach rounded-full animate-spin" />
      </div>
    );
  }

  if (!session || (!template && !isCustom)) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-text-secondary">Workout not found.</p>
        <button onClick={() => navigate('/')} className="text-peach underline ml-2 font-bold">
          Go back
        </button>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-dark-base">
        <div className="text-center animate-pop-in">
          <p className="text-8xl mb-6">🏆</p>
          <p className="font-display text-4xl text-peach font-bold">Done!</p>
          <p className="text-text-secondary mt-3 font-semibold text-lg">Great work.</p>
        </div>
      </div>
    );
  }

  const gradient = TYPE_GRADIENT[displayType] ?? 'from-peach/20 to-dark-base';
  const estimatedMin = template?.estimatedMinutes ?? totalCount * 4;

  return (
    <PageTransition>
    <div className="flex-1 pb-24">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-b ${gradient} px-5 pt-4 pb-6`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-text-secondary text-sm min-h-[44px] min-w-[44px] flex items-center font-bold"
          >
            ← Back
          </button>
          <div className="w-[44px]" />
        </div>

        <div className="text-center mb-4">
          <span className="text-4xl mb-2 block">{displayEmoji}</span>
          <h1 className="font-display text-2xl text-text-primary font-bold mt-2">
            {displayName}
          </h1>
          <p className="text-text-muted text-xs font-medium mt-1">
            {totalCount} exercise{totalCount !== 1 ? 's' : ''} · ~{estimatedMin} min
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white/8 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-peach to-mint h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-2 text-center font-semibold">
          {completedCount} of {totalCount} completed
        </p>
      </div>

      {/* Exercise list */}
      <div className="px-5 py-4 space-y-3">
        {session.exercises.map((ex: WorkoutSessionExercise, i: number) => {
          const exercise = exerciseDB.find((e) => e.id === ex.exerciseId);
          if (!exercise) return null;
          return (
            <div key={`${ex.exerciseId}-${i}`} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <ExerciseRow
                exercise={exercise}
                sessionExercise={ex}
                onToggle={() => toggleExercise(i)}
                onSwap={() => setSwapTarget(i)}
              />
            </div>
          );
        })}
      </div>

      {/* Complete button + day picker */}
      {allDone && (
        <div className="fixed left-0 right-0 px-5 animate-slide-up" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 5.5rem)' }}>
          {/* Day picker toggle */}
          {showDayPicker ? (
            <div className="mb-3 glass-card p-4">
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 text-center">
                Log for which day?
              </p>
              <DayPickerInline selectedDay={selectedDay} onSelect={setSelectedDay} />
              <p className="text-xs text-text-muted text-center mt-1.5 font-medium">
                {selectedDay === new Date().getDay() ? 'Today' : DAY_NAMES[selectedDay]}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowDayPicker(true)}
              className="w-full text-center text-xs text-text-muted font-medium mb-2 py-1"
            >
              Log for a different day?
            </button>
          )}

          <button
            onClick={handleComplete}
            className="w-full py-4 bg-gradient-to-r from-mint-dark to-mint text-dark-base rounded-2xl font-display text-xl shadow-lg active:scale-[0.97] transition-all font-bold"
          >
            Complete Workout 🏆
          </button>
        </div>
      )}

      {/* Swap sheet */}
      {swapTarget !== null && session && (
        <SwapSheet
          currentExerciseId={session.exercises[swapTarget].exerciseId}
          workoutType={(isCustom ? 'full-body' : displayType) as import('../types').WorkoutType}
          onSelect={(newId) => {
            swapExercise(swapTarget, newId);
            setSwapTarget(null);
          }}
          onClose={() => setSwapTarget(null)}
        />
      )}

      {/* Badge toast */}
      {showBadgeToast && newlyEarnedBadges.length > 0 && (
        <BadgeToast
          badges={newlyEarnedBadges}
          onDismiss={() => navigate('/')}
        />
      )}
    </div>
    </PageTransition>
  );
}
