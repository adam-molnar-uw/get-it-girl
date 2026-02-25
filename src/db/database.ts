import { openDB, type IDBPDatabase } from 'idb';
import type { WorkoutDB } from './schema';

const DB_NAME = 'workout-pwa';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<WorkoutDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<WorkoutDB>> {
  if (!dbPromise) {
    dbPromise = openDB<WorkoutDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Weekly plans
        db.createObjectStore('weeklyPlans', { keyPath: 'id' });

        // Workout sessions
        const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
        sessionStore.createIndex('by-week', 'weekPlanId');

        // History
        const historyStore = db.createObjectStore('history', { keyPath: 'id' });
        historyStore.createIndex('by-week', 'weekPlanId');
        historyStore.createIndex('by-date', 'completedAt');

        // Progression state (single record)
        db.createObjectStore('progression', { keyPath: 'id' });

        // Settings (single record)
        db.createObjectStore('settings', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}
