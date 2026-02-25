import { useWeeklyPlan } from '../hooks/useWeeklyPlan';
import { ProgressRing } from '../components/ProgressRing';
import { WorkoutCard } from '../components/WorkoutCard';
import { PageTransition } from '../components/PageTransition';
import { PullToRefresh } from '../components/PullToRefresh';
import { workoutTemplates } from '../data/workout-templates';
import { REST_DAYS } from '../types';
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

function isRestDay(): boolean {
  const day = new Date().getDay();
  return REST_DAYS.includes(day as 0 | 1 | 2 | 3 | 4 | 5 | 6);
}

export function TodayPage() {
  const { plan, loading, refresh } = useWeeklyPlan();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-retro-red/30 border-t-retro-red rounded-full animate-spin" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-retro-warm text-lg">Something went wrong generating your week.</p>
      </div>
    );
  }

  const completedCount = plan.workouts.filter((w) => w.completed).length;
  const totalCount = plan.workouts.length;
  const remaining = plan.workouts
    .map((w, i) => ({ ...w, index: i }))
    .filter((w) => !w.completed);

  const restDay = isRestDay();

  return (
    <PageTransition>
    <PullToRefresh onRefresh={refresh}>
    <div className="flex-1 pb-24">
      {/* Hero */}
      <div className="bg-retro-red px-5 pt-6 pb-12">
        <h1 className="font-display text-4xl text-white tracking-wide leading-none">
          GET IT GIRL!
        </h1>
        <p className="text-white/80 mt-2 text-sm font-semibold tracking-wide">
          {getGreeting()}
        </p>
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
          Week {plan.weekNumber} &middot; {completedCount}/{totalCount} done
        </p>
      </div>
      <div className="retro-stripes" />

      {/* Progress Ring */}
      <div className="flex justify-center -mt-14">
        <div className="bg-retro-cream rounded-full p-2.5 shadow-lg border-4 border-retro-white">
          <ProgressRing completed={completedCount} total={totalCount} />
        </div>
      </div>

      <div className="px-4 mt-6 space-y-5">
        {/* Rest day suggestion */}
        {restDay && remaining.length > 0 && (
          <div className="animate-slide-up bg-retro-green/10 rounded-xl p-4 border-l-4 border-retro-green">
            <p className="text-retro-green font-bold text-sm">
              🧘 Rest day — try a gentle yoga flow
            </p>
          </div>
        )}

        {/* Remaining workouts */}
        {remaining.length > 0 ? (
          <div className="space-y-3">
            <h2 className="font-display text-2xl text-retro-brown tracking-wide">
              {restDay ? 'UPCOMING' : "TODAY'S WORKOUTS"}
            </h2>
            {remaining.map((w, i) => {
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
        ) : (
          <div className="text-center py-10 animate-pop-in">
            <p className="text-5xl mb-4">🏆</p>
            <p className="font-display text-4xl text-retro-red tracking-wide">WEEK COMPLETE!</p>
            <p className="text-retro-warm mt-2 font-semibold">Amazing work this week.</p>
          </div>
        )}
      </div>
    </div>
    </PullToRefresh>
    </PageTransition>
  );
}
