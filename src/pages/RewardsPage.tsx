import { useState, useEffect } from 'react';
import { getAllHistory, getAllWeeklyPlans, getProgression } from '../db/repositories';
import { evaluateRewards, calculateWeekStreak } from '../services/rewards';
import { PageTransition } from '../components/PageTransition';
import type { RewardStatus } from '../services/rewards';

export function RewardsPage() {
  const [rewardStatuses, setRewardStatuses] = useState<RewardStatus[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [history, plans, progression] = await Promise.all([
        getAllHistory(),
        getAllWeeklyPlans(),
        getProgression(),
      ]);
      const currentWeek = progression?.currentWeek ?? 1;
      const statuses = evaluateRewards(history, plans, currentWeek);
      setRewardStatuses(statuses);
      setStreak(calculateWeekStreak(plans));
      setTotalWorkouts(history.length);
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

  const earned = rewardStatuses.filter((r) => r.earned);
  const upcoming = rewardStatuses.filter((r) => !r.earned);

  return (
    <PageTransition>
      <div className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-retro-red px-5 pt-6 pb-5">
          <h1 className="font-display text-4xl text-white tracking-wide leading-none">
            REWARDS
          </h1>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-2">
            Your achievements
          </p>
        </div>
        <div className="retro-stripes" />

        {/* Stats bar */}
        <div className="px-4 mt-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-retro-white rounded-xl p-4 border border-retro-cream-dark shadow-sm text-center">
              <p className="text-3xl font-display text-retro-red tracking-wide">{streak}</p>
              <p className="text-xs font-bold text-retro-warm tracking-wide mt-1">WEEK STREAK</p>
            </div>
            <div className="bg-retro-white rounded-xl p-4 border border-retro-cream-dark shadow-sm text-center">
              <p className="text-3xl font-display text-retro-blue tracking-wide">{totalWorkouts}</p>
              <p className="text-xs font-bold text-retro-warm tracking-wide mt-1">TOTAL WORKOUTS</p>
            </div>
          </div>
        </div>

        {/* Earned rewards */}
        {earned.length > 0 && (
          <div className="px-4 mt-6">
            <h2 className="font-display text-xl text-retro-brown tracking-wider mb-3 px-1">
              EARNED
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {earned.map((r, i) => (
                <div
                  key={r.reward.id}
                  className="animate-slide-up bg-retro-white rounded-xl p-3 border border-retro-cream-dark shadow-md text-center"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-3xl block">{r.reward.emoji}</span>
                  <p className="text-xs font-bold text-retro-brown mt-2 leading-tight">
                    {r.reward.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming rewards */}
        {upcoming.length > 0 && (
          <div className="px-4 mt-6">
            <h2 className="font-display text-xl text-retro-warm tracking-wider mb-3 px-1">
              KEEP GOING
            </h2>
            <div className="space-y-2">
              {upcoming.map((r, i) => (
                <div
                  key={r.reward.id}
                  className="animate-slide-up bg-retro-white rounded-xl p-4 border border-retro-cream-dark shadow-sm flex items-center gap-3"
                  style={{ animationDelay: `${(earned.length + i) * 40}ms` }}
                >
                  <span className="text-2xl opacity-40">{r.reward.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-retro-brown text-sm">{r.reward.title}</p>
                    <p className="text-xs text-retro-warm mt-0.5">{r.reward.description}</p>
                    {/* Progress bar */}
                    <div className="mt-2 bg-retro-cream-dark rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-retro-gold h-full rounded-full transition-all duration-700"
                        style={{ width: `${r.progress * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-retro-warm mt-1 font-bold">
                      {r.current} / {r.reward.requirement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {earned.length === 0 && upcoming.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-6 mt-10">
            <div className="text-center animate-pop-in">
              <p className="text-5xl mb-4">🎯</p>
              <p className="font-display text-3xl text-retro-brown tracking-wide">
                START EARNING
              </p>
              <p className="text-retro-warm mt-2 font-medium">
                Complete workouts to unlock rewards!
              </p>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
