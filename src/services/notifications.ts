import { getSettings } from '../db/repositories';

/**
 * Check-on-visit notification model.
 * When the app opens, check if a workout reminder should show.
 */
export async function checkForReminder(hasUncompletedWorkout: boolean): Promise<void> {
  const settings = await getSettings();
  if (!settings.notificationsEnabled) return;
  if (!hasUncompletedWorkout) return;

  const now = new Date();
  const hour = now.getHours();

  // Only show after reminder hour
  if (hour < settings.reminderHour) return;

  // Check if we already reminded today
  const lastReminder = localStorage.getItem('lastReminderDate');
  const today = now.toISOString().split('T')[0];
  if (lastReminder === today) return;

  // Show notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification("Time to work out! 💪", {
      body: "You have a workout waiting for you today.",
      icon: '/get-it-girl/pwa-192x192.png',
    });
    localStorage.setItem('lastReminderDate', today);
  }
}
