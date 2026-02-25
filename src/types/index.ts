export type WorkoutType =
  | 'lower-body'
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
  | 'adductors';

export type SwapGroup = string; // e.g. "squat-pattern", "hinge-pattern", "push-horizontal"

export interface ExerciseVariation {
  exerciseId: string;
  unlocksAtWeek: number; // which progression week this becomes available
}

export interface Exercise {
  id: string;
  name: string;
  emoji: string;
  muscleGroups: MuscleGroup[];
  swapGroup: SwapGroup;
  workoutTypes: WorkoutType[];
  equipment: ('dumbbells' | 'bodyweight' | 'band')[];
  gifUrl?: string;
  description?: string; // brief "how to" explanation
  cues: string[]; // form cues
  variations: ExerciseVariation[]; // harder versions (variation chain)
  isYoga?: boolean;
  defaultHoldSeconds?: number; // for yoga/stretch poses
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

export interface WorkoutTemplate {
  id: string;
  name: string;
  emoji: string;
  type: WorkoutType;
  exercises: TemplateExercise[];
  description: string;
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

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const WORKOUT_DAYS: DayOfWeek[] = [2, 4, 5, 6, 0]; // Tue, Thu, Fri, Sat, Sun
export const REST_DAYS: DayOfWeek[] = [1, 3]; // Mon, Wed
