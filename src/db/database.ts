import { openDB, type IDBPDatabase } from 'idb';
import type { WorkoutDB } from './schema';

const DB_NAME = 'workout-pwa';
const DB_VERSION = 2;

let dbPromise: Promise<IDBPDatabase<WorkoutDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<WorkoutDB>> {
  if (!dbPromise) {
    dbPromise = openDB<WorkoutDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          // Original stores
          db.createObjectStore('weeklyPlans', { keyPath: 'id' });

          const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
          sessionStore.createIndex('by-week', 'weekPlanId');

          const historyStore = db.createObjectStore('history', { keyPath: 'id' });
          historyStore.createIndex('by-week', 'weekPlanId');
          historyStore.createIndex('by-date', 'completedAt');

          db.createObjectStore('progression', { keyPath: 'id' });
          db.createObjectStore('settings', { keyPath: 'id' });
        }

        if (oldVersion < 2) {
          // Streak & badge stores
          db.createObjectStore('badges', { keyPath: 'id' });
          db.createObjectStore('streaks', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}
