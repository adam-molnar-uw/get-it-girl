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
  const motivation = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
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
        <div className="text-coral text-lg">Loading...</div>
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
    <div className="flex-1 p-4 pb-24 space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">{getGreeting()}</h1>
        <p className="text-gray-warm mt-1">
          Week {plan.weekNumber} &middot; {completedCount}/{totalCount} workouts done
        </p>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center">
        <ProgressRing completed={completedCount} total={totalCount} />
      </div>

      {/* Rest day yoga suggestion */}
      {restDay && remaining.length > 0 && (
        <div className="bg-teal/10 rounded-2xl p-4 border border-teal/20">
          <p className="text-teal-dark font-medium">
            🧘 It's a rest day! How about a gentle yoga flow?
          </p>
        </div>
      )}

      {/* Remaining workouts */}
      {remaining.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-charcoal">
            {restDay ? 'Upcoming workouts' : "Today's options"}
          </h2>
          {remaining.map((w) => {
            const template = workoutTemplates.find((t) => t.id === w.templateId);
            if (!template) return null;
            return (
              <WorkoutCard
                key={w.index}
                template={template}
                onStart={() => navigate(`/workout/${plan.id}/${w.index}`)}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-4xl mb-3">🎉</p>
          <p className="text-xl font-bold text-coral">Week complete!</p>
          <p className="text-gray-warm mt-1">Amazing work this week!</p>
        </div>
      )}
    </div>
  );
}
