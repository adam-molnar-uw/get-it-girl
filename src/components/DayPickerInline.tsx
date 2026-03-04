import { DAY_NAMES } from '../types';

interface DayPickerInlineProps {
  selectedDay: number;
  onSelect: (day: number) => void;
  disableFuture?: boolean;
}

export function DayPickerInline({ selectedDay, onSelect, disableFuture = true }: DayPickerInlineProps) {
  const today = new Date().getDay();

  return (
    <div className="flex gap-1.5 justify-center">
      {DAY_NAMES.map((name, i) => {
        const isFuture = disableFuture && isFutureDay(i, today);
        const isSelected = i === selectedDay;
        const isToday = i === today;

        return (
          <button
            key={name}
            disabled={isFuture}
            onClick={() => onSelect(i)}
            className={`w-10 h-10 rounded-full text-[10px] font-bold tracking-wide transition-all flex items-center justify-center ${
              isSelected
                ? 'bg-peach text-dark-base'
                : isToday
                ? 'bg-white/10 text-peach'
                : isFuture
                ? 'bg-white/5 text-text-muted/30'
                : 'bg-white/5 text-text-muted active:scale-95'
            }`}
          >
            {name.substring(0, 2).toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function isFutureDay(day: number, today: number): boolean {
  // Convert to Monday-based offset for comparison within a week
  const toMonday = (d: number) => (d === 0 ? 6 : d - 1);
  return toMonday(day) > toMonday(today);
}
