export type WorkoutType =
  | 'lower-body'
  | 'upper-body'
  | 'full-body'
  | 'hiit'
  | 'yoga'
  | 'cardio'
  | 'pilates'
  | 'stretch'
  | 'recovery';

export type MuscleGroup =
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'core'
  | 'full-body'
  | 'hip-flexors'
  | 'adductors'
  | 'lats'
  | 'rear-delts'
  | 'rotator-cuff';

export type SwapGroup = string; // e.g. "squat-pattern", "hinge-pattern", "push-horizontal"

export interface ExerciseVariation {
  exerciseId: string;
  unlocksAtWeek: number; // which progression week this becomes available
}

export type Equipment =
  | 'dumbbells'
  | 'bodyweight'
  | 'band'
  | 'barbell'
  | 'bench'
  | 'cable-machine'
  | 'machine'
  | 'rack'
  | 'ab-wheel';

export interface Exercise {
  id: string;
  name: string;
  emoji: string;
  muscleGroups: MuscleGroup[];
  swapGroup: SwapGroup;
  workoutTypes: WorkoutType[];
  equipment: Equipment[];
  gifUrl?: string;
  description?: string; // brief "how to" explanation
  cues: string[]; // form cues
  variations: ExerciseVariation[]; // harder versions (variation chain)
  isYoga?: boolean;
  defaultHoldSeconds?: number; // for yoga/stretch poses
  isProtocol?: boolean; // for cardio protocols (no sets/reps)
}

export interface ProgressionTier {
  weekRange: [number, number];
  sets: number;
  reps: number;
  tempoNote?: string; // e.g. "3s slow eccentric"
  equipmentNote?: string; // e.g. "Add resistance bands"
  yogaHoldSeconds: number;
}

export interface TemplateExercise {
  exerciseId: string;
  orderIndex: number;
}

export type WorkoutLocation = 'gym' | 'home' | 'anywhere';

export interface WorkoutTemplate {
  id: string;
  name: string;
  emoji: string;
  type: WorkoutType;
  exercises: TemplateExercise[];
  description: string;
  estimatedMinutes?: number;
  location?: WorkoutLocation;
  alternativeId?: string; // gym↔home pair
}

// --- Persisted types (IndexedDB) ---

export interface WeeklyPlanWorkout {
  templateId: string;
  assignedDay?: number; // 0=Sun, 1=Mon, ... 6=Sat
  completed: boolean;
  completedAt?: string; // ISO date
  sessionId?: string;
}

export interface WeeklyPlan {
  id: string; // "2026-W09" format
  weekNumber: number; // overall program week (1, 2, 3...)
  startDate: string; // ISO date of Monday
  workouts: WeeklyPlanWorkout[];
  generatedAt: string;
}

export interface WorkoutSessionExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  holdSeconds?: number;
  tempoNote?: string;
  completed: boolean;
  completedSets?: number; // 0..sets — undefined treated as 0 (or sets if completed for old data)
}

export interface WorkoutSession {
  id: string;
  weekPlanId: string;
  templateId: string;
  exercises: WorkoutSessionExercise[];
  startedAt: string;
  completedAt?: string;
}

export interface WorkoutHistoryEntry {
  id: string;
  weekPlanId: string;
  templateId: string;
  templateName: string;
  templateEmoji: string;
  completedAt: string;
  exerciseCount: number;
  duration?: number; // minutes
}

export interface ProgressionState {
  id: 'current';
  currentWeek: number;
  startDate: string; // when the program started
}

export interface AppSettings {
  id: 'settings';
  notificationsEnabled: boolean;
  reminderHour: number;
  restDayYogaEnabled: boolean;
}

// --- Streak & Badge types ---

export type BadgeCategory =
  | 'first-steps'
  | 'streak'
  | 'volume'
  | 'type-mastery'
  | 'progression'
  | 'perfect-week';

export type BadgeCriteria =
  | { type: 'first-workout' }
  | { type: 'first-week-complete' }
  | { type: 'streak-weeks'; weeks: number }
  | { type: 'total-workouts'; count: number }
  | { type: 'type-count'; workoutType: WorkoutType; count: number }
  | { type: 'reach-week'; weekNumber: number }
  | { type: 'perfect-week' };

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: BadgeCategory;
  criteria: BadgeCriteria;
}

export interface EarnedBadge {
  id: string;
  earnedAt: string;
  weekPlanId?: string;
}

export interface StreakData {
  id: 'current';
  currentStreak: number;
  longestStreak: number;
  lastCalculatedAt: string;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const WORKOUT_DAYS: DayOfWeek[] = [0, 1, 2, 3, 4, 5, 6]; // Every day
export const REST_DAYS: DayOfWeek[] = []; // No rest days
