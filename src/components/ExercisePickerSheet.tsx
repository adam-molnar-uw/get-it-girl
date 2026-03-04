import { useState, useMemo } from 'react';
import { exercises as exerciseDB } from '../data/exercises';

const MUSCLE_FILTERS = [
  { label: 'All', value: null },
  { label: 'Lower', value: ['quads', 'hamstrings', 'glutes', 'calves', 'adductors'] },
  { label: 'Upper', value: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'lats', 'rear-delts'] },
  { label: 'Core', value: ['core'] },
] as const;

interface ExercisePickerSheetProps {
  onStart: (data: { name: string; emoji: string; exerciseIds: string[] }) => void;
  onClose: () => void;
}

export function ExercisePickerSheet({ onStart, onClose }: ExercisePickerSheetProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [name, setName] = useState('');

  // Exclude yoga protocols from the picker
  const availableExercises = useMemo(
    () => exerciseDB.filter((e) => !e.isYoga && !e.isProtocol),
    []
  );

  const filtered = useMemo(() => {
    let list = availableExercises;

    const filterGroup = MUSCLE_FILTERS[filter].value;
    if (filterGroup) {
      list = list.filter((e) =>
        e.muscleGroups.some((mg) => (filterGroup as readonly string[]).includes(mg))
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q));
    }

    return list;
  }, [availableExercises, search, filter]);

  const toggleExercise = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canStart = selectedIds.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-dark-base flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onClose}
            className="text-text-secondary text-sm min-h-[44px] min-w-[44px] flex items-center font-bold"
          >
            ← Back
          </button>
          <h1 className="font-display text-lg text-text-primary font-bold">BUILD WORKOUT</h1>
          <div className="w-[44px]" />
        </div>

        {/* Workout name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workout name (optional)"
          className="w-full bg-white/8 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-peach/50 mb-3"
        />

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search exercises..."
          className="w-full bg-white/8 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-peach/50 mb-3"
        />

        {/* Filter chips */}
        <div className="flex gap-2">
          {MUSCLE_FILTERS.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setFilter(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                filter === i
                  ? 'bg-lavender text-dark-base'
                  : 'bg-white/8 text-text-muted active:scale-95'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected exercises */}
      {selectedIds.length > 0 && (
        <div className="px-5 py-3 border-b border-white/10 bg-white/3">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            Selected ({selectedIds.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedIds.map((id) => {
              const ex = exerciseDB.find((e) => e.id === id);
              if (!ex) return null;
              return (
                <button
                  key={id}
                  onClick={() => toggleExercise(id)}
                  className="flex items-center gap-1.5 bg-peach/15 text-peach px-3 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-all"
                >
                  {ex.emoji} {ex.name} ×
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Exercise list */}
      <div className="flex-1 overflow-y-auto px-5 py-3">
        <div className="space-y-2">
          {filtered.map((exercise) => {
            const isSelected = selectedIds.includes(exercise.id);
            return (
              <button
                key={exercise.id}
                onClick={() => toggleExercise(exercise.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left min-h-[52px] transition-all active:scale-[0.98] ${
                  isSelected
                    ? 'glass-card border-peach/30'
                    : 'glass-card-light hover:border-white/10'
                }`}
              >
                <span className="text-xl">{exercise.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-sm truncate">{exercise.name}</p>
                  <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">
                    {exercise.muscleGroups.slice(0, 3).join(' · ')}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-peach border-peach text-dark-base'
                      : 'border-white/20'
                  }`}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-text-muted text-center py-8 font-medium">No exercises found</p>
          )}
        </div>
      </div>

      {/* Start button */}
      <div className="px-5 py-4 border-t border-white/10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
        <button
          disabled={!canStart}
          onClick={() => onStart({
            name: name.trim() || 'Custom Workout',
            emoji: '💪',
            exerciseIds: selectedIds,
          })}
          className={`w-full py-4 rounded-2xl font-display text-lg tracking-wider active:scale-[0.97] transition-all font-bold ${
            canStart
              ? 'bg-gradient-to-r from-peach-dark to-peach text-dark-base'
              : 'bg-white/10 text-text-muted'
          }`}
        >
          {canStart
            ? `START WORKOUT (${selectedIds.length} exercise${selectedIds.length !== 1 ? 's' : ''})`
            : 'SELECT EXERCISES'}
        </button>
      </div>
    </div>
  );
}
