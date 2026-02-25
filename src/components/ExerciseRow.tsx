import { useState } from 'react';
import type { Exercise, WorkoutSessionExercise } from '../types';
import { ExerciseImage } from './ExerciseImage';

interface ExerciseRowProps {
  exercise: Exercise;
  sessionExercise: WorkoutSessionExercise;
  onToggle: () => void;
  onSwap: () => void;
}

export function ExerciseRow({ exercise, sessionExercise, onToggle, onSwap }: ExerciseRowProps) {
  const { completed, sets, reps, holdSeconds, tempoNote } = sessionExercise;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm transition-all ${
        completed ? 'opacity-60' : ''
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className={`mt-0.5 w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors min-w-[44px] min-h-[44px] ${
              completed
                ? 'bg-teal border-teal text-white'
                : 'border-cream-dark hover:border-coral'
            }`}
          >
            {completed && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Info */}
          <button
            className="flex-1 min-w-0 text-left"
            onClick={() => setExpanded((v) => !v)}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{exercise.emoji}</span>
              <p className={`font-semibold text-charcoal ${completed ? 'line-through' : ''}`}>
                {exercise.name}
              </p>
            </div>

            {/* Sets/reps or hold time */}
            <p className="text-sm text-gray-warm mt-0.5">
              {holdSeconds
                ? `Hold ${holdSeconds}s`
                : `${sets} × ${reps} reps`}
              {tempoNote && ` · ${tempoNote}`}
            </p>

            {/* Form cues */}
            {!completed && exercise.cues.length > 0 && (
              <p className="text-xs text-teal-dark mt-1">{exercise.cues[0]}</p>
            )}
          </button>

          {/* Swap button */}
          {!completed && (
            <button
              onClick={onSwap}
              className="text-xs text-gray-warm hover:text-coral transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              Swap
            </button>
          )}
        </div>
      </div>

      {/* Expanded image + all cues */}
      {expanded && !completed && (
        <div className="px-4 pb-4 space-y-3">
          <ExerciseImage exerciseId={sessionExercise.exerciseId} />
          {exercise.cues.length > 1 && (
            <ul className="text-xs text-gray-warm space-y-1 pl-2">
              {exercise.cues.map((cue, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-teal mt-0.5">•</span>
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
