import { useState } from 'react';

const STEPS = [
  {
    emoji: '💪',
    title: 'Your Weekly Plan',
    body: 'Each week you have 7 options — 2 Strong Curves strength sessions, 3 Mysore Ashtanga practices, 1 HIIT circuit, and Zone 2 cardio. Rest happens organically. Gym or home versions available.',
  },
  {
    emoji: '✅',
    title: 'Track Your Progress',
    body: 'Tap into a workout, do each exercise, and check it off as you go. Swap any exercise for an alternative if you want.',
  },
  {
    emoji: '📈',
    title: 'Get Stronger',
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
    <div className="fixed inset-0 z-[100] bg-dark-base flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <p
          className="text-8xl mb-8 animate-pop-in"
          key={step}
        >
          {current.emoji}
        </p>
        <h2 className="font-display text-3xl text-text-primary mb-4 animate-slide-up font-bold">
          {current.title}
        </h2>
        <p className="text-text-secondary text-base leading-relaxed max-w-sm animate-slide-up font-medium">
          {current.body}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? 'bg-peach w-8' : 'bg-white/15 w-2'
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2.5rem)' }}>
        {isLast ? (
          <button
            onClick={onComplete}
            className="w-full py-4 bg-gradient-to-r from-peach to-peach-light text-dark-base rounded-2xl font-display text-xl shadow-lg active:scale-[0.97] transition-all font-bold"
          >
            Let's go!
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={onComplete}
              className="px-6 py-4 text-text-muted font-semibold min-h-[44px]"
            >
              Skip
            </button>
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 py-4 bg-gradient-to-r from-peach to-peach-light text-dark-base rounded-2xl font-display text-xl shadow-lg active:scale-[0.97] transition-all font-bold"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
