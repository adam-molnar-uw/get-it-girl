import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { ExerciseRow } from '../components/ExerciseRow';
import { SwapSheet } from '../components/SwapSheet';
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
  const allDone = totalCount > 0 && completedCount === totalCount;

  const handleComplete = useCallback(async () => {
    await completeWorkout();
    setShowCompletion(true);
  }, [completeWorkout]);

  useEffect(() => {
    if (showCompletion) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCompletion, navigate]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-coral text-lg">Loading workout...</div>
      </div>
    );
  }

  if (!session || !template) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-gray-warm">Workout not found.</p>
        <button onClick={() => navigate('/')} className="text-coral underline ml-2">
          Go back
        </button>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center animate-bounce">
          <p className="text-6xl mb-4">🎉</p>
          <p className="text-2xl font-bold text-coral">Workout complete!</p>
          <p className="text-gray-warm mt-2">Great job!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-cream/95 backdrop-blur-sm z-10 px-4 py-3 border-b border-cream-dark">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-warm text-sm min-h-[44px] min-w-[44px] flex items-center"
          >
            ← Back
          </button>
          <div className="text-center">
            <p className="font-semibold text-charcoal">
              {template.emoji} {template.name}
            </p>
          </div>
          <div className="w-[44px]" />
        </div>

        {/* Progress bar */}
        <div className="mt-2 bg-cream-dark rounded-full h-2 overflow-hidden">
          <div
            className="bg-coral h-full rounded-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
        <p className="text-xs text-gray-warm mt-1 text-center">
          {completedCount}/{totalCount} exercises
        </p>
      </div>

      {/* Exercise list */}
      <div className="p-4 space-y-3">
        {session.exercises.map((ex: WorkoutSessionExercise, i: number) => {
          const exercise = exerciseDB.find((e) => e.id === ex.exerciseId);
          if (!exercise) return null;
          return (
            <ExerciseRow
              key={`${ex.exerciseId}-${i}`}
              exercise={exercise}
              sessionExercise={ex}
              onToggle={() => toggleExercise(i)}
              onSwap={() => setSwapTarget(i)}
            />
          );
        })}
      </div>

      {/* Complete button */}
      {allDone && (
        <div className="fixed bottom-20 left-0 right-0 px-4">
          <button
            onClick={handleComplete}
            className="w-full py-4 bg-teal text-white rounded-2xl text-lg font-bold shadow-lg hover:bg-teal-dark transition-colors"
          >
            Complete Workout! 🎉
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
  );
}
