import type { Badge } from '../types';

export const allBadges: Badge[] = [
  // === FIRST STEPS ===
  {
    id: 'first-workout',
    name: 'First Step',
    description: 'Complete your first workout',
    emoji: '🌟',
    category: 'first-steps',
    criteria: { type: 'first-workout' },
  },
  {
    id: 'first-week-complete',
    name: 'Week Warrior',
    description: 'Complete all workouts in a week',
    emoji: '🏆',
    category: 'first-steps',
    criteria: { type: 'first-week-complete' },
  },

  // === STREAK MILESTONES ===
  {
    id: 'streak-2w',
    name: '2 Week Streak',
    description: 'Work out 2 weeks in a row',
    emoji: '🔥',
    category: 'streak',
    criteria: { type: 'streak-weeks', weeks: 2 },
  },
  {
    id: 'streak-4w',
    name: '4 Week Streak',
    description: 'A full month of consistency',
    emoji: '🔥',
    category: 'streak',
    criteria: { type: 'streak-weeks', weeks: 4 },
  },
  {
    id: 'streak-8w',
    name: '8 Week Streak',
    description: 'Two months strong',
    emoji: '🔥',
    category: 'streak',
    criteria: { type: 'streak-weeks', weeks: 8 },
  },
  {
    id: 'streak-12w',
    name: '12 Week Streak',
    description: 'Three months — unstoppable',
    emoji: '💎',
    category: 'streak',
    criteria: { type: 'streak-weeks', weeks: 12 },
  },

  // === VOLUME MILESTONES ===
  {
    id: 'volume-10',
    name: '10 Workouts',
    description: 'Complete 10 total workouts',
    emoji: '💪',
    category: 'volume',
    criteria: { type: 'total-workouts', count: 10 },
  },
  {
    id: 'volume-25',
    name: '25 Workouts',
    description: 'Complete 25 total workouts',
    emoji: '🌈',
    category: 'volume',
    criteria: { type: 'total-workouts', count: 25 },
  },
  {
    id: 'volume-50',
    name: '50 Workouts',
    description: 'Complete 50 total workouts',
    emoji: '🚀',
    category: 'volume',
    criteria: { type: 'total-workouts', count: 50 },
  },
  {
    id: 'volume-100',
    name: '100 Workouts',
    description: 'Complete 100 total workouts',
    emoji: '👑',
    category: 'volume',
    criteria: { type: 'total-workouts', count: 100 },
  },

  // === TYPE MASTERY ===
  {
    id: 'lower-master',
    name: 'Leg Day Legend',
    description: 'Complete 5 Lower Body workouts',
    emoji: '🍑',
    category: 'type-mastery',
    criteria: { type: 'type-count', workoutType: 'lower-body', count: 5 },
  },
  {
    id: 'upper-master',
    name: 'Upper Body Boss',
    description: 'Complete 5 Upper Body workouts',
    emoji: '🏋️',
    category: 'type-mastery',
    criteria: { type: 'type-count', workoutType: 'upper-body', count: 5 },
  },
  {
    id: 'full-master',
    name: 'Full Body Force',
    description: 'Complete 5 Full Body + VO₂ workouts',
    emoji: '💥',
    category: 'type-mastery',
    criteria: { type: 'type-count', workoutType: 'full-body', count: 5 },
  },
  {
    id: 'yoga-master',
    name: 'Ashtanga Devotee',
    description: 'Complete 5 Mysore Ashtanga sessions',
    emoji: '🧘',
    category: 'type-mastery',
    criteria: { type: 'type-count', workoutType: 'yoga', count: 5 },
  },
  {
    id: 'cardio-master',
    name: 'Zone 2 Machine',
    description: 'Complete 5 Zone 2 Cardio sessions',
    emoji: '💚',
    category: 'type-mastery',
    criteria: { type: 'type-count', workoutType: 'cardio', count: 5 },
  },

  // === PROGRESSION ===
  {
    id: 'reach-week-5',
    name: 'Level Up',
    description: 'Reach week 5 — extra sets unlocked',
    emoji: '📈',
    category: 'progression',
    criteria: { type: 'reach-week', weekNumber: 5 },
  },
  {
    id: 'reach-week-10',
    name: 'Advanced',
    description: 'Reach week 10 — slow eccentrics',
    emoji: '🏋️',
    category: 'progression',
    criteria: { type: 'reach-week', weekNumber: 10 },
  },
  {
    id: 'reach-week-13',
    name: 'Elite',
    description: 'Reach week 13 — hardest tier',
    emoji: '🎖️',
    category: 'progression',
    criteria: { type: 'reach-week', weekNumber: 13 },
  },

  // === PERFECT WEEK ===
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Complete every workout in one week',
    emoji: '✨',
    category: 'perfect-week',
    criteria: { type: 'perfect-week' },
  },
];
