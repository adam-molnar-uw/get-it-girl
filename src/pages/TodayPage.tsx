import { useWeeklyPlan } from '../hooks/useWeeklyPlan';
import { useStreaks } from '../hooks/useStreaks';
import { ProgressRing } from '../components/ProgressRing';
import { WorkoutCard } from '../components/WorkoutCard';
import { StreakDisplay } from '../components/StreakDisplay';
import { PageTransition } from '../components/PageTransition';
import { PullToRefresh } from '../components/PullToRefresh';
import { workoutTemplates } from '../data/workout-templates';
import { useNavigate } from 'react-router-dom';

const GREETINGS = [
  "Let's crush it!",
  'You got this!',
  'Time to move!',
  'Ready to go?',
  "Let's do this!",
];

function getGreeting(): string {
  const hour = new Date().getHours();
  const prefix = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const motivation = GREETINGS[new Date().getDate() % GREETINGS.length];
  return `${prefix} — ${motivation}`;
}

const RECOVERY_TIPS = [
  { emoji: '💧', text: 'Hydrate — your muscles recover faster when you drink enough water.' },
  { emoji: '😴', text: 'Sleep is gains. Aim for 7-9 hours tonight.' },
  { emoji: '🧘', text: 'A few minutes of stretching now prevents soreness tomorrow.' },
  { emoji: '🍎', text: 'Refuel with protein within an hour — your muscles will thank you.' },
  { emoji: '🫁', text: 'Try 5 minutes of slow breathing. Recovery starts with your nervous system.' },
  { emoji: '🛁', text: 'A warm bath or foam rolling tonight = fresher legs tomorrow.' },
  { emoji: '🚶‍♀️', text: "A gentle walk is the best active recovery. Don't just sit!" },
  { emoji: '💪', text: "Rest isn't laziness — it's where your body actually builds strength." },
  { emoji: '🌿', text: 'Rest days are part of the program, not a break from it.' },
  { emoji: '✨', text: "You showed up today. That's the hardest part. Be proud." },
];

export function TodayPage() {
  const { plan, loading, refresh } = useWeeklyPlan();
  const { streaks } = useStreaks();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-peach/30 border-t-peach rounded-full animate-spin" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-text-secondary text-lg">Something went wrong generating your week.</p>
      </div>
    );
  }

  const completedCount = plan.workouts.filter((w) => w.completed).length;
  const totalCount = plan.workouts.length;
  const remaining = plan.workouts
    .map((w, i) => ({ ...w, index: i }))
    .filter((w) => !w.completed);

  const today = new Date().getDay();
  const todayWorkout = plan.workouts.find((w) => w.assignedDay === today);
  const todayDone = todayWorkout?.completed ?? false;
  const recoveryTip = RECOVERY_TIPS[new Date().getDate() % RECOVERY_TIPS.length];

  const nextWorkout = remaining[0];
  const otherWorkouts = remaining.slice(1);

  return (
    <PageTransition>
    <PullToRefresh onRefresh={refresh}>
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="font-display text-3xl text-peach font-bold leading-none">
          Get It Girl!
        </h1>
        <p className="text-text-secondary mt-1 text-sm font-medium">
          {getGreeting()}
        </p>
      </div>

      {/* Streak Display */}
      {streaks && (
        <div className="px-5 pb-2">
          <StreakDisplay
            currentStreak={streaks.currentStreak}
            longestStreak={streaks.longestStreak}
          />
        </div>
      )}

      {/* Progress Section */}
      <div className="px-5 py-4">
        <ProgressRing completed={completedCount} total={totalCount} />
      </div>

      {/* Recovery card — shows when today's workout is done */}
      {todayDone && remaining.length > 0 && (
        <div className="px-5 mb-2">
          <div className="animate-slide-up glass-card p-4 border-l-4 border-mint">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{recoveryTip.emoji}</span>
              <div>
                <p className="text-mint font-display font-bold text-sm mb-0.5">
                  You're done for today!
                </p>
                <p className="text-text-secondary text-xs font-medium leading-relaxed">
                  {recoveryTip.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 mt-2 space-y-5">
        {remaining.length > 0 ? (
          <>
            {/* Section header */}
            <div>
              <h2 className="font-display text-xl text-text-primary font-bold mb-1">
                {todayDone ? 'Coming up' : "Choose today's movement"}
              </h2>
              <p className="text-text-muted text-xs font-medium">
                {remaining.length} workout{remaining.length !== 1 ? 's' : ''} remaining this week
              </p>
            </div>

            {/* Featured next workout */}
            {nextWorkout && (() => {
              const template = workoutTemplates.find((t) => t.id === nextWorkout.templateId);
              if (!template) return null;
              return (
                <WorkoutCard
                  template={template}
                  onStart={() => navigate(`/workout/${plan.id}/${nextWorkout.index}`)}
                  featured
                />
              );
            })()}

            {/* Other workouts */}
            {otherWorkouts.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  More workouts
                </h3>
                {otherWorkouts.map((w, i) => {
                  const template = workoutTemplates.find((t) => t.id === w.templateId);
                  if (!template) return null;
                  return (
                    <WorkoutCard
                      key={w.index}
                      template={template}
                      onStart={() => navigate(`/workout/${plan.id}/${w.index}`)}
                      delay={i * 60}
                    />
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 animate-pop-in">
            <p className="text-6xl mb-5">🏆</p>
            <p className="font-display text-3xl text-peach font-bold">Week Complete!</p>
            <p className="text-text-secondary mt-3 font-medium text-lg">
              Amazing work this week.
            </p>
            <div className="mt-6 glass-card p-5 text-left border-l-4 border-mint">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌿</span>
                <div>
                  <p className="text-mint font-display font-bold text-sm mb-1">
                    Time to rest & recover
                  </p>
                  <p className="text-text-secondary text-xs font-medium leading-relaxed">
                    Your body builds strength during rest, not during the workout. Enjoy your recovery — you earned it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </PullToRefresh>
    </PageTransition>
  );
}
