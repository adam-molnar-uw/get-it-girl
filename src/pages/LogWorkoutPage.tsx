import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { workoutTemplates } from '../data/workout-templates';
import { addHistoryEntry } from '../db/repositories';
import type { WorkoutHistoryEntry } from '../types';

export function LogWorkoutPage() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
  });
  const [customName, setCustomName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleLog = useCallback(async () => {
    if (saving) return;
    setSaving(true);

    const template = selectedTemplate
      ? workoutTemplates.find((t) => t.id === selectedTemplate)
      : null;

    // Build date with current time
    const completedAt = new Date(selectedDate + 'T12:00:00').toISOString();

    // Generate week ID from the selected date
    const d = new Date(selectedDate);
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const dayOfYear = Math.ceil((d.getTime() - jan1.getTime()) / 86400000);
    const weekNum = Math.ceil((dayOfYear + jan1.getDay()) / 7);
    const weekPlanId = `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;

    const entry: WorkoutHistoryEntry = {
      id: `log-${Date.now()}`,
      weekPlanId,
      templateId: template?.id ?? 'custom',
      templateName: template?.name ?? (customName || 'Custom Workout'),
      templateEmoji: template?.emoji ?? '💪',
      completedAt,
      exerciseCount: template?.exercises.length ?? 0,
    };

    await addHistoryEntry(entry);

    // Show brief confirmation then navigate
    navigate('/history');
  }, [selectedTemplate, selectedDate, customName, saving, navigate]);

  const isCustom = selectedTemplate === 'custom';
  const canLog = (selectedTemplate && !isCustom) || (isCustom && customName.trim());

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
            <p className="font-display text-xl text-white tracking-wider">LOG A WORKOUT</p>
            <div className="w-[44px]" />
          </div>
        </div>
        <div className="retro-stripes" />

        <div className="px-4 mt-5 space-y-5">
          {/* Date picker */}
          <div>
            <label className="font-display text-lg text-retro-brown tracking-wider block mb-2">
              WHEN
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full bg-retro-white border border-retro-cream-dark rounded-xl px-4 py-3 text-retro-brown font-medium text-base shadow-sm"
            />
          </div>

          {/* Workout picker */}
          <div>
            <label className="font-display text-lg text-retro-brown tracking-wider block mb-2">
              WORKOUT
            </label>
            <div className="space-y-2">
              {workoutTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`w-full text-left rounded-xl p-3 border transition-all flex items-center gap-3 ${
                    selectedTemplate === template.id
                      ? 'bg-retro-red/10 border-retro-red shadow-md'
                      : 'bg-retro-white border-retro-cream-dark shadow-sm'
                  }`}
                >
                  <span className="text-2xl">{template.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-retro-brown text-sm">{template.name}</p>
                    <p className="text-xs text-retro-warm">{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <span className="text-retro-red font-bold text-lg">✓</span>
                  )}
                </button>
              ))}

              {/* Custom workout option */}
              <button
                onClick={() => setSelectedTemplate('custom')}
                className={`w-full text-left rounded-xl p-3 border transition-all flex items-center gap-3 ${
                  isCustom
                    ? 'bg-retro-red/10 border-retro-red shadow-md'
                    : 'bg-retro-white border-retro-cream-dark shadow-sm'
                }`}
              >
                <span className="text-2xl">✏️</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-retro-brown text-sm">Custom Workout</p>
                  <p className="text-xs text-retro-warm">Log something not listed</p>
                </div>
                {isCustom && <span className="text-retro-red font-bold text-lg">✓</span>}
              </button>
            </div>
          </div>

          {/* Custom name input */}
          {isCustom && (
            <div className="animate-slide-up">
              <label className="font-display text-lg text-retro-brown tracking-wider block mb-2">
                WORKOUT NAME
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Morning Run, Spin Class..."
                className="w-full bg-retro-white border border-retro-cream-dark rounded-xl px-4 py-3 text-retro-brown font-medium text-base shadow-sm placeholder:text-retro-warm/50"
              />
            </div>
          )}

          {/* Log button */}
          <button
            onClick={handleLog}
            disabled={!canLog || saving}
            className={`w-full py-4 rounded-xl font-display text-2xl tracking-widest shadow-lg transition-all ${
              canLog && !saving
                ? 'bg-retro-green text-white active:scale-[0.97]'
                : 'bg-retro-cream-dark text-retro-warm cursor-not-allowed'
            }`}
          >
            {saving ? 'LOGGING...' : 'LOG IT'}
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
