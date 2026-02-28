/**
 * Training protocols from program.js and heartRateZones.js
 * Heart rate zones (Karvonen method), VO₂ max protocol, Zone 2 sessions,
 * cycle periodization, and nutrition guidelines.
 */

export interface HeartRateZone {
  id: string;
  name: string;
  label: string;
  low: number;
  high: number;
  color: string;
  rpe: string;
  talkTest: string;
  purpose: string;
}

export function calculateZones(restingHR: number, maxHR: number): HeartRateZone[] {
  const hrr = maxHR - restingHR;
  const karvonen = (pct: number) => Math.round(restingHR + pct * hrr);

  return [
    {
      id: 'zone1',
      name: 'Zone 1',
      label: 'Recovery',
      low: karvonen(0.50),
      high: karvonen(0.60),
      color: '#60A5FA',
      rpe: '1-2 / 10',
      talkTest: 'Full sentences. Could hold a phone call.',
      purpose: 'Active recovery. Increases blood flow without adding training stress.',
    },
    {
      id: 'zone2',
      name: 'Zone 2',
      label: 'Aerobic Base',
      low: karvonen(0.60),
      high: karvonen(0.70),
      color: '#34D399',
      rpe: '3-4 / 10',
      talkTest: 'Full sentences but slightly effortful. Cannot sing.',
      purpose: 'Primary driver of metabolic health. Stimulates mitochondrial biogenesis, fat oxidation, insulin sensitivity.',
    },
    {
      id: 'zone3',
      name: 'Zone 3',
      label: 'Grey Zone',
      low: karvonen(0.70),
      high: karvonen(0.80),
      color: '#FBBF24',
      rpe: '5-6 / 10',
      talkTest: 'Short phrases only.',
      purpose: 'Minimise time here. High fatigue relative to adaptation gained.',
    },
    {
      id: 'zone4',
      name: 'Zone 4',
      label: 'Threshold',
      low: karvonen(0.80),
      high: karvonen(0.90),
      color: '#F97316',
      rpe: '7-8 / 10',
      talkTest: '1 to 2 words only.',
      purpose: 'Lactate threshold. Raises aerobic ceiling. Primarily for performance.',
    },
    {
      id: 'zone5',
      name: 'Zone 5',
      label: 'VO₂ Max',
      low: karvonen(0.90),
      high: maxHR,
      color: '#EF4444',
      rpe: '9-10 / 10',
      talkTest: 'Cannot speak.',
      purpose: 'Directly increases VO₂ max — strongest predictor of all-cause mortality.',
    },
  ];
}

// Default user zones (resting 61, max 185)
export const USER_ZONES = calculateZones(61, 185);

export const VO2_PROTOCOL = {
  name: '4×4 Norwegian Intervals',
  warmupMinutes: 5,
  rounds: { start: 4, max: 6 },
  workSeconds: 240,
  restSeconds: 180,
  targetRPE: '8-9 / 10',
  cooldownMinutes: 5,
  progression: [
    'Weeks 1-2: 4 rounds',
    'Weeks 3-4: 5 rounds',
    'Weeks 5+: 6 rounds',
    'Once at 6 rounds: increase intensity, not duration',
  ],
};

export const ZONE2_PROTOCOL = {
  durationMinutes: { min: 45, max: 60 },
  weeklyFrequency: 3,
  targetBPM: '135-148 bpm',
  keyRule: 'If HR drifts above 148 bpm — slow down. The adaptation happens in the zone, not above it.',
  modalities: ['Stationary Bike', 'Track', 'Outdoor Run'],
};

export const CYCLE_PHASES = [
  {
    phase: 'Menstruation',
    days: 'Days 1-5',
    strength: 'Low',
    tip: 'Reduce intensity 10-20% if needed. Let breath lead in yoga.',
  },
  {
    phase: 'Follicular',
    days: 'Days 6-14',
    strength: 'High',
    tip: 'Your strongest phase. Push heavy, go for rep PRs.',
  },
  {
    phase: 'Ovulation',
    days: 'Day ~14',
    strength: 'Peak',
    tip: 'Power output at maximum. Warm up thoroughly — joint laxity increases.',
  },
  {
    phase: 'Luteal',
    days: 'Days 15-28',
    strength: 'Moderate',
    tip: 'Maintain volume, reduce intensity 10-15%. Carb needs increase.',
  },
];

export const NUTRITION_TIPS = {
  protein: '1.8g per kg bodyweight, spread across 3-4 meals',
  creatine: '3-5g daily — safe indefinitely, cognitive + strength benefits',
  hydration: '2-3L water daily, add electrolytes after hard sessions',
};
