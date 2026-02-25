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
      className={`bg-retro-white rounded-xl border border-retro-cream-dark shadow-sm transition-all ${
        completed ? 'opacity-50' : ''
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className={`mt-0.5 w-7 h-7 rounded border-2 flex items-center justify-center shrink-0 transition-all min-w-[44px] min-h-[44px] ${
              completed
                ? 'bg-retro-green border-retro-green text-white'
                : 'border-retro-cream-dark hover:border-retro-red'
            }`}
          >
            {completed && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
              <p className={`font-bold text-retro-brown ${completed ? 'line-through' : ''}`}>
                {exercise.name}
              </p>
            </div>

            <p className="text-xs text-retro-warm font-semibold mt-0.5">
              {holdSeconds
                ? `HOLD ${holdSeconds}s`
                : `${sets} × ${reps} REPS`}
              {tempoNote && ` · ${tempoNote}`}
            </p>

            {!completed && exercise.cues.length > 0 && (
              <p className="text-xs text-retro-blue mt-1 font-medium">{exercise.cues[0]}</p>
            )}
          </button>

          {/* Swap button */}
          {!completed && (
            <button
              onClick={onSwap}
              className="text-[10px] font-bold text-retro-warm uppercase tracking-wider hover:text-retro-red transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              SWAP
            </button>
          )}
        </div>
      </div>

      {/* Expanded image + all cues */}
      {expanded && !completed && (
        <div className="px-4 pb-4 space-y-3">
          <ExerciseImage exerciseId={sessionExercise.exerciseId} />
          {exercise.cues.length > 1 && (
            <ul className="text-xs text-retro-warm space-y-1 pl-2">
              {exercise.cues.map((cue, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-retro-red mt-0.5 font-bold">•</span>
                  <span className="font-medium">{cue}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
