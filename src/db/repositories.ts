import { getDB } from './database';
import type {
  WeeklyPlan,
  WorkoutSession,
  WorkoutHistoryEntry,
  ProgressionState,
  AppSettings,
} from '../types';

// --- Weekly Plans ---

export async function getWeeklyPlan(id: string): Promise<WeeklyPlan | undefined> {
  const db = await getDB();
  return db.get('weeklyPlans', id);
}

export async function saveWeeklyPlan(plan: WeeklyPlan): Promise<void> {
  const db = await getDB();
  await db.put('weeklyPlans', plan);
}

export async function getAllWeeklyPlans(): Promise<WeeklyPlan[]> {
  const db = await getDB();
  return db.getAll('weeklyPlans');
}

// --- Sessions ---

export async function getSession(id: string): Promise<WorkoutSession | undefined> {
  const db = await getDB();
  return db.get('sessions', id);
}

export async function saveSession(session: WorkoutSession): Promise<void> {
  const db = await getDB();
  await db.put('sessions', session);
}

export async function getSessionsByWeek(weekPlanId: string): Promise<WorkoutSession[]> {
  const db = await getDB();
  return db.getAllFromIndex('sessions', 'by-week', weekPlanId);
}

// --- History ---

export async function addHistoryEntry(entry: WorkoutHistoryEntry): Promise<void> {
  const db = await getDB();
  await db.put('history', entry);
}

export async function getHistoryByWeek(weekPlanId: string): Promise<WorkoutHistoryEntry[]> {
  const db = await getDB();
  return db.getAllFromIndex('history', 'by-week', weekPlanId);
}

export async function getAllHistory(): Promise<WorkoutHistoryEntry[]> {
  const db = await getDB();
  return db.getAll('history');
}

// --- Progression ---

export async function getProgression(): Promise<ProgressionState | undefined> {
  const db = await getDB();
  return db.get('progression', 'current');
}

export async function saveProgression(state: ProgressionState): Promise<void> {
  const db = await getDB();
  await db.put('progression', state);
}

// --- Settings ---

const DEFAULT_SETTINGS: AppSettings = {
  id: 'settings',
  notificationsEnabled: false,
  reminderHour: 17,
  restDayYogaEnabled: true,
};

export async function getSettings(): Promise<AppSettings> {
  const db = await getDB();
  const settings = await db.get('settings', 'settings');
  return settings ?? DEFAULT_SETTINGS;
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const db = await getDB();
  await db.put('settings', settings);
}

// --- Reset ---

export async function resetAllData(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(
    ['weeklyPlans', 'sessions', 'history', 'progression', 'settings'],
    'readwrite'
  );
  await Promise.all([
    tx.objectStore('weeklyPlans').clear(),
    tx.objectStore('sessions').clear(),
    tx.objectStore('history').clear(),
    tx.objectStore('progression').clear(),
    tx.objectStore('settings').clear(),
    tx.done,
  ]);
}
