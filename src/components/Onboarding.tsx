import { useState } from 'react';

const STEPS = [
  {
    emoji: '💪',
    title: 'YOUR WEEKLY WORKOUTS',
    body: 'Each week you get 5-6 workouts — lower body, full body, HIIT, yoga, and more. Pick what feels right each day.',
  },
  {
    emoji: '✅',
    title: 'CHECK THEM OFF',
    body: 'Tap into a workout, do each exercise, and check it off as you go. Swap any exercise for an alternative if you want.',
  },
  {
    emoji: '📈',
    title: 'AUTO-PROGRESSION',
    body: 'The app gradually increases difficulty every 2 weeks — more reps, more sets, slower tempos — so you keep getting stronger.',
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-[100] bg-retro-cream flex flex-col">
      <div className="retro-stripes" />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <p
          className="text-7xl mb-6 animate-pop-in"
          key={step}
        >
          {current.emoji}
        </p>
        <h2 className="font-display text-3xl text-retro-brown tracking-wider mb-4 animate-slide-up">
          {current.title}
        </h2>
        <p className="text-retro-warm text-base leading-relaxed max-w-sm animate-slide-up font-medium">
          {current.body}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === step ? 'bg-retro-red scale-125' : 'bg-retro-cream-dark'
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-10">
        {isLast ? (
          <button
            onClick={onComplete}
            className="w-full py-4 bg-retro-red text-white rounded-xl font-display text-2xl tracking-widest shadow-lg active:scale-[0.97] transition-all"
          >
            LET'S GO!
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={onComplete}
              className="px-6 py-4 text-retro-warm font-bold tracking-wide min-h-[44px]"
            >
              SKIP
            </button>
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 py-4 bg-retro-red text-white rounded-xl font-display text-2xl tracking-widest shadow-lg active:scale-[0.97] transition-all"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
