import { useWeeklyPlan } from '../hooks/useWeeklyPlan';
import { ProgressRing } from '../components/ProgressRing';
import { WorkoutCard } from '../components/WorkoutCard';
import { workoutTemplates } from '../data/workout-templates';
import { REST_DAYS } from '../types';
import { useNavigate } from 'react-router-dom';

const GREETINGS = [
  "Let's crush it today!",
  'You got this!',
  'Time to get stronger!',
  'Ready to move?',
  "Let's do this!",
];

function getGreeting(): string {
  const hour = new Date().getHours();
  const prefix = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const motivation = GREETINGS[new Date().getDate() % GREETINGS.length];
  return `${prefix}! ${motivation}`;
}

function isRestDay(): boolean {
  const day = new Date().getDay();
  return REST_DAYS.includes(day as 0 | 1 | 2 | 3 | 4 | 5 | 6);
}

export function TodayPage() {
  const { plan, loading } = useWeeklyPlan();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-coral/30 border-t-coral rounded-full animate-spin" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-warm text-lg">Something went wrong generating your week.</p>
        </div>
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
    <div className="flex-1 pb-24">
      {/* Hero section with gradient */}
      <div className="bg-gradient-to-br from-coral via-coral-light to-coral px-5 pt-6 pb-10 rounded-b-[2rem] shadow-lg">
        <h1 className="text-2xl font-bold text-white">{getGreeting()}</h1>
        <p className="text-white/80 mt-1 text-sm font-medium">
          Week {plan.weekNumber} &middot; {completedCount}/{totalCount} workouts done
        </p>
      </div>

      {/* Progress Ring — overlapping the hero */}
      <div className="flex justify-center -mt-16">
        <div className="bg-cream rounded-full p-2 shadow-lg">
          <ProgressRing completed={completedCount} total={totalCount} />
        </div>
      </div>

      <div className="px-4 mt-6 space-y-5">
        {/* Rest day yoga suggestion */}
        {restDay && remaining.length > 0 && (
          <div className="animate-slide-up bg-gradient-to-r from-teal/10 to-teal/5 rounded-2xl p-4 border border-teal/20 shadow-sm">
            <p className="text-teal-dark font-medium">
              🧘 It's a rest day! How about a gentle yoga flow?
            </p>
          </div>
        )}

        {/* Remaining workouts */}
        {remaining.length > 0 ? (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-charcoal px-1">
              {restDay ? 'Upcoming workouts' : "Today's options"}
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
            <p className="text-5xl mb-4">🎉</p>
            <p className="text-2xl font-bold text-coral">Week complete!</p>
            <p className="text-gray-warm mt-2">Amazing work this week!</p>
          </div>
        )}
      </div>
    </div>
  );
}
