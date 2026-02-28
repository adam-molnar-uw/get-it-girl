import type { DBSchema } from 'idb';
import type {
  WeeklyPlan,
  WorkoutSession,
  WorkoutHistoryEntry,
  ProgressionState,
  AppSettings,
  EarnedBadge,
  StreakData,
} from '../types';

export interface WorkoutDB extends DBSchema {
  weeklyPlans: {
    key: string;
    value: WeeklyPlan;
  };
  sessions: {
    key: string;
    value: WorkoutSession;
    indexes: { 'by-week': string };
  };
  history: {
    key: string;
    value: WorkoutHistoryEntry;
    indexes: { 'by-week': string; 'by-date': string };
  };
  progression: {
    key: string;
    value: ProgressionState;
  };
  settings: {
    key: string;
    value: AppSettings;
  };
  badges: {
    key: string;
    value: EarnedBadge;
  };
  streaks: {
    key: string;
    value: StreakData;
  };
}
