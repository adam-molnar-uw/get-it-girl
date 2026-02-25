import { useState, useEffect } from 'react';
import { getAllHistory, getAllWeeklyPlans } from '../db/repositories';
import type { WorkoutHistoryEntry, WeeklyPlan } from '../types';

interface WeekGroup {
  plan: WeeklyPlan;
  entries: WorkoutHistoryEntry[];
}

export function HistoryPage() {
  const [groups, setGroups] = useState<WeekGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [history, plans] = await Promise.all([getAllHistory(), getAllWeeklyPlans()]);

      const planMap = new Map(plans.map((p) => [p.id, p]));
      const grouped = new Map<string, WorkoutHistoryEntry[]>();

      for (const entry of history) {
        const list = grouped.get(entry.weekPlanId) ?? [];
        list.push(entry);
        grouped.set(entry.weekPlanId, list);
      }

      const result: WeekGroup[] = [];
      for (const [weekId, entries] of grouped) {
        const plan = planMap.get(weekId);
        if (plan) {
          entries.sort((a, b) => b.completedAt.localeCompare(a.completedAt));
          result.push({ plan, entries });
        }
      }
      result.sort((a, b) => b.plan.weekNumber - a.plan.weekNumber);
      setGroups(result);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-retro-red/30 border-t-retro-red rounded-full animate-spin" />
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center animate-pop-in">
          <p className="text-5xl mb-4">📋</p>
          <p className="font-display text-3xl text-retro-brown tracking-wide">NO HISTORY YET</p>
          <p className="text-retro-warm mt-2 font-medium">Complete your first workout!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="bg-retro-brown px-5 pt-6 pb-5">
        <h1 className="font-display text-4xl text-white tracking-wide leading-none">HISTORY</h1>
        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-2">
          Your workout journey
        </p>
      </div>
      <div className="retro-stripes" />

      <div className="px-4 mt-5 space-y-6">
        {groups.map((group, gi) => (
          <div key={group.plan.id} className="animate-slide-up" style={{ animationDelay: `${gi * 80}ms` }}>
            <h2 className="font-display text-xl text-retro-warm tracking-wider mb-2 px-1">
              WEEK {group.plan.weekNumber}
            </h2>
            <div className="space-y-2">
              {group.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-retro-white rounded-xl p-4 border border-retro-cream-dark shadow-sm flex items-center gap-3"
                >
                  <span className="text-2xl">{entry.templateEmoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-retro-brown">{entry.templateName}</p>
                    <p className="text-xs text-retro-warm font-medium mt-0.5">
                      {new Date(entry.completedAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' · '}
                      {entry.exerciseCount} exercises
                    </p>
                  </div>
                  <span className="text-retro-green font-bold">✓</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
