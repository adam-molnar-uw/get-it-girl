import { useState } from 'react';
import { DayPickerInline } from './DayPickerInline';
import { DAY_NAMES } from '../types';

const EMOJI_OPTIONS = [
  '💪', '🧘', '🚴', '🏊', '🧗', '🥊', '🏃', '⚡',
  '🌿', '🎾', '🏋️', '🚶', '💃', '🎿', '🥾', '🏄',
];

interface QuickLogSheetProps {
  onLog: (data: { name: string; emoji: string; notes?: string; day: number }) => void;
  onClose: () => void;
}

export function QuickLogSheet({ onLog, onClose }: QuickLogSheetProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('💪');
  const [notes, setNotes] = useState('');
  const [day, setDay] = useState(new Date().getDay());

  const canSubmit = name.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="animate-slide-up relative w-full bg-dark-card rounded-t-2xl max-h-[85vh] overflow-hidden shadow-2xl border-t border-white/10">
        <div className="p-5 pb-10 overflow-y-auto max-h-[calc(85vh-6px)]">
          <h3 className="font-display text-2xl text-text-primary tracking-wider mb-4 font-bold">
            QUICK LOG
          </h3>

          {/* Name input */}
          <label className="block mb-4">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
              What did you do?
            </span>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pilates class, hike, swim..."
              className="mt-2 w-full bg-white/8 rounded-xl px-4 py-3 text-text-primary placeholder-text-muted/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-peach/50"
            />
          </label>

          {/* Emoji picker */}
          <div className="mb-4">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
              Pick an emoji
            </span>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                    emoji === e
                      ? 'bg-peach/20 ring-2 ring-peach scale-110'
                      : 'bg-white/5 active:scale-95'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <label className="block mb-4">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Notes (optional)
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did it feel?"
              rows={2}
              className="mt-2 w-full bg-white/8 rounded-xl px-4 py-3 text-text-primary placeholder-text-muted/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-peach/50 resize-none"
            />
          </label>

          {/* Day picker */}
          <div className="mb-6">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
              Which day?
            </span>
            <DayPickerInline selectedDay={day} onSelect={setDay} />
            <p className="text-xs text-text-muted text-center mt-1.5 font-medium">
              {day === new Date().getDay() ? 'Today' : DAY_NAMES[day]}
            </p>
          </div>

          {/* Submit */}
          <button
            disabled={!canSubmit}
            onClick={() => onLog({ name: name.trim(), emoji, notes: notes.trim() || undefined, day })}
            className={`w-full py-4 rounded-2xl font-display text-xl tracking-wider active:scale-[0.97] transition-all font-bold min-h-[56px] ${
              canSubmit
                ? 'bg-gradient-to-r from-mint-dark to-mint text-dark-base'
                : 'bg-white/10 text-text-muted'
            }`}
          >
            LOG IT ✓
          </button>

          <button
            onClick={onClose}
            className="w-full mt-3 py-3.5 bg-white/10 text-text-primary rounded-lg font-bold active:scale-95 transition-all min-h-[44px] tracking-wide"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
