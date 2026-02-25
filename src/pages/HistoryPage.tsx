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
        <div className="text-coral text-lg">Loading...</div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-lg font-semibold text-charcoal">No workouts yet</p>
          <p className="text-gray-warm mt-1">Complete your first workout to see it here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 pb-24 space-y-6">
      <h1 className="text-2xl font-bold text-charcoal">History</h1>

      {groups.map((group) => (
        <div key={group.plan.id}>
          <h2 className="text-sm font-semibold text-gray-warm uppercase tracking-wide mb-2">
            Week {group.plan.weekNumber}
          </h2>
          <div className="space-y-2">
            {group.entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
              >
                <span className="text-2xl">{entry.templateEmoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-charcoal">{entry.templateName}</p>
                  <p className="text-sm text-gray-warm">
                    {new Date(entry.completedAt).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {' · '}
                    {entry.exerciseCount} exercises
                  </p>
                </div>
                <span className="text-teal">✓</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
