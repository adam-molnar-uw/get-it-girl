import { useState, useEffect } from 'react';
import { getAllHistory, getAllWeeklyPlans } from '../db/repositories';
import { useBadges } from '../hooks/useBadges';
import { PageTransition } from '../components/PageTransition';
import { BadgeGrid } from '../components/BadgeGrid';
import type { WorkoutHistoryEntry, WeeklyPlan } from '../types';

interface WeekGroup {
  plan: WeeklyPlan;
  entries: WorkoutHistoryEntry[];
}

export function HistoryPage() {
  const [groups, setGroups] = useState<WeekGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const { earnedBadges, allBadges: allBadgesList } = useBadges();

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
        <div className="w-10 h-10 border-4 border-peach/30 border-t-peach rounded-full animate-spin" />
      </div>
    );
  }

  const totalWorkouts = groups.reduce((sum, g) => sum + g.entries.length, 0);

  if (groups.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center animate-pop-in">
          <p className="text-6xl mb-5">📋</p>
          <p className="font-display text-2xl text-text-primary font-bold">No activity yet</p>
          <p className="text-text-secondary mt-2 font-medium">Complete your first workout!</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="font-display text-3xl text-mint font-bold leading-none">Activity</h1>
        <p className="text-text-muted text-xs font-medium mt-1">
          {totalWorkouts} workout{totalWorkouts !== 1 ? 's' : ''} completed
        </p>
      </div>

      {/* Stats cards */}
      <div className="px-5 py-4 grid grid-cols-3 gap-3">
        <div className="glass-card p-3 text-center">
          <p className="font-display text-2xl text-peach font-bold">{totalWorkouts}</p>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5">Workouts</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="font-display text-2xl text-lavender font-bold">{groups.length}</p>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5">Weeks</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="font-display text-2xl text-mint font-bold">
            {groups.reduce((sum, g) => sum + g.entries.reduce((s, e) => s + e.exerciseCount, 0), 0)}
          </p>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-0.5">Exercises</p>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {groups.map((group, gi) => (
          <div key={group.plan.id} className="animate-slide-up" style={{ animationDelay: `${gi * 80}ms` }}>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              Week {group.plan.weekNumber}
            </h2>
            <div className="space-y-2">
              {group.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="glass-card p-4 flex items-center gap-3"
                >
                  <span className="text-2xl">{entry.templateEmoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-text-primary text-sm">{entry.templateName}</p>
                    <p className="text-xs text-text-muted font-medium mt-0.5">
                      {new Date(entry.completedAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' · '}
                      {entry.exerciseCount} exercises
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-mint/20 flex items-center justify-center">
                    <span className="text-mint text-sm font-bold">✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Badges Section */}
      <div className="px-5 mt-8 mb-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-2xl text-lavender font-bold">
            Badges
          </h2>
          <span className="text-xs text-text-muted font-bold">
            {earnedBadges.length}/{allBadgesList.length}
          </span>
        </div>
        <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-lavender to-mint rounded-full transition-all duration-700"
            style={{ width: `${allBadgesList.length > 0 ? (earnedBadges.length / allBadgesList.length) * 100 : 0}%` }}
          />
        </div>
        <BadgeGrid allBadges={allBadgesList} earnedBadges={earnedBadges} />
      </div>
    </div>
    </PageTransition>
  );
}
