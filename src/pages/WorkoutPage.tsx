import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { ExerciseRow } from '../components/ExerciseRow';
import { SwapSheet } from '../components/SwapSheet';
import { PageTransition } from '../components/PageTransition';
import { exercises as exerciseDB } from '../data/exercises';
import { workoutTemplates } from '../data/workout-templates';
import type { WorkoutSessionExercise } from '../types';

export function WorkoutPage() {
  const { weekId, workoutIndex } = useParams<{ weekId: string; workoutIndex: string }>();
  const navigate = useNavigate();
  const idx = Number(workoutIndex);
  const { session, loading, toggleExercise, swapExercise, completeWorkout } =
    useWorkoutSession(weekId!, idx);

  const [swapTarget, setSwapTarget] = useState<number | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const template = session
    ? workoutTemplates.find((t) => t.id === session.templateId)
    : null;

  const completedCount = session?.exercises.filter((e) => e.completed).length ?? 0;
  const totalCount = session?.exercises.length ?? 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const allDone = totalCount > 0 && completedCount === totalCount;

  const handleComplete = useCallback(async () => {
    await completeWorkout();
    setShowCompletion(true);
  }, [completeWorkout]);

  useEffect(() => {
    if (showCompletion) {
      const timer = setTimeout(() => navigate('/'), 2500);
      return () => clearTimeout(timer);
    }
  }, [showCompletion, navigate]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-retro-red/30 border-t-retro-red rounded-full animate-spin" />
      </div>
    );
  }

  if (!session || !template) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-retro-warm">Workout not found.</p>
        <button onClick={() => navigate('/')} className="text-retro-red underline ml-2 font-bold">
          Go back
        </button>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-retro-cream">
        <div className="text-center animate-pop-in">
          <p className="text-7xl mb-5">🏆</p>
          <p className="font-display text-5xl text-retro-red tracking-wide">DONE!</p>
          <p className="text-retro-warm mt-3 font-bold text-lg">Great work.</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="bg-retro-blue px-4 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-white/80 text-sm min-h-[44px] min-w-[44px] flex items-center font-bold"
          >
            ← BACK
          </button>
          <div className="text-center">
            <p className="font-display text-xl text-white tracking-wider">
              {template.emoji} {template.name.toUpperCase()}
            </p>
          </div>
          <div className="w-[44px]" />
        </div>

        {/* Progress bar */}
        <div className="mt-3 bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-retro-gold h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-white/70 mt-1.5 text-center font-bold tracking-wide">
          {completedCount} / {totalCount}
        </p>
      </div>
      <div className="retro-stripes" />

      {/* Exercise list */}
      <div className="p-4 space-y-3">
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

      {/* Complete button */}
      {allDone && (
        <div className="fixed bottom-20 left-0 right-0 px-4 animate-slide-up">
          <button
            onClick={handleComplete}
            className="w-full py-4 bg-retro-green text-white rounded-xl font-display text-2xl tracking-widest shadow-lg active:scale-[0.97] transition-all"
          >
            COMPLETE! 🏆
          </button>
        </div>
      )}

      {/* Swap sheet */}
      {swapTarget !== null && session && (
        <SwapSheet
          currentExerciseId={session.exercises[swapTarget].exerciseId}
          workoutType={template.type}
          onSelect={(newId) => {
            swapExercise(swapTarget, newId);
            setSwapTarget(null);
          }}
          onClose={() => setSwapTarget(null)}
        />
      )}
    </div>
    </PageTransition>
  );
}
