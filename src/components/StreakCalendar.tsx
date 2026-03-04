import { useState, useEffect } from 'react';
import { getAllHistory } from '../db/repositories';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function StreakCalendar() {
  const [activeDays, setActiveDays] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function load() {
      const history = await getAllHistory();
      const days = new Set<string>();
      for (const entry of history) {
        const d = new Date(entry.completedAt);
        days.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
      }
      setActiveDays(days);
    }
    load();
  }, []);

  // Build 4 weeks of dates ending at today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the Monday 3 weeks ago
  const todayDay = today.getDay();
  const mondayOffset = todayDay === 0 ? 6 : todayDay - 1; // days since Monday
  const thisMonday = new Date(today);
  thisMonday.setDate(today.getDate() - mondayOffset);

  const startDate = new Date(thisMonday);
  startDate.setDate(startDate.getDate() - 21); // 3 weeks back

  const weeks: Date[][] = [];
  for (let w = 0; w < 4; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      week.push(date);
    }
    weeks.push(week);
  }

  return (
    <div className="glass-card p-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🔥</span>
        <p className="font-display text-sm text-text-primary font-bold tracking-wide">
          ACTIVITY
        </p>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1.5 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div key={i} className="text-center text-[9px] font-bold text-text-muted tracking-wider">
            {label}
          </div>
        ))}
      </div>

      {/* Weeks grid */}
      <div className="space-y-1.5">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1.5">
            {week.map((date, di) => {
              const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              const isActive = activeDays.has(key);
              const isToday =
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate();
              const isFuture = date > today;

              return (
                <div
                  key={di}
                  className={`aspect-square rounded-md flex items-center justify-center transition-all ${
                    isFuture
                      ? 'bg-white/3'
                      : isActive
                      ? 'bg-mint/60'
                      : 'bg-white/8'
                  } ${isToday ? 'ring-2 ring-peach ring-offset-1 ring-offset-dark-base' : ''}`}
                >
                  {isActive && !isFuture && (
                    <span className="text-[10px]">🔥</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-mint/60" />
          <span className="text-[10px] text-text-muted font-medium">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-white/8" />
          <span className="text-[10px] text-text-muted font-medium">Rest</span>
        </div>
      </div>
    </div>
  );
}
