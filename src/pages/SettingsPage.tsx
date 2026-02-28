import { useState, useEffect } from 'react';
import { getSettings, saveSettings, resetAllData, getProgression } from '../db/repositories';
import { PageTransition } from '../components/PageTransition';
import type { AppSettings } from '../types';

export function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    async function load() {
      const [s, p] = await Promise.all([getSettings(), getProgression()]);
      setSettings(s);
      setCurrentWeek(p?.currentWeek ?? 1);
    }
    load();
  }, []);

  async function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    if (!settings) return;
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await saveSettings(updated);
  }

  async function handleReset() {
    await resetAllData();
    window.location.reload();
  }

  if (!settings) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-peach/30 border-t-peach rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="font-display text-3xl text-peach-light font-bold leading-none">Settings</h1>
        <p className="text-text-muted text-xs font-medium mt-1">
          Customize your experience
        </p>
      </div>

      <div className="px-5 space-y-4">
        {/* Program Info */}
        <div className="glass-card p-5 space-y-4">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">Program</h2>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary font-medium">Current week</span>
            <span className="font-display text-2xl text-peach font-bold">{currentWeek}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary font-medium">Equipment</span>
            <span className="font-semibold text-text-primary">2× 18lb dumbbells</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card p-5 space-y-5">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">Preferences</h2>

          <div className="flex items-center justify-between">
            <span className="text-text-primary font-medium">Notifications</span>
            <button
              className={`w-14 h-8 rounded-full transition-colors relative ${
                settings.notificationsEnabled ? 'bg-mint' : 'bg-white/10'
              }`}
              onClick={async () => {
                if (!settings.notificationsEnabled && 'Notification' in window) {
                  const perm = await Notification.requestPermission();
                  if (perm !== 'granted') return;
                }
                updateSetting('notificationsEnabled', !settings.notificationsEnabled);
              }}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-dark-base rounded-full shadow-md transition-transform duration-200 ${
                  settings.notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reset */}
        <div className="glass-card p-5 space-y-3">
          <h2 className="text-xs font-bold text-danger uppercase tracking-wider">Danger zone</h2>
          <p className="text-sm text-text-muted">
            Erase all data and start fresh. This cannot be undone.
          </p>
          {showResetConfirm ? (
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-danger text-dark-base rounded-xl font-bold active:scale-95 transition-all min-h-[44px]"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-white/10 text-text-primary rounded-xl font-bold active:scale-95 transition-all min-h-[44px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 bg-danger/10 text-danger rounded-xl font-bold active:scale-95 transition-all min-h-[44px]"
            >
              Reset all data
            </button>
          )}
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
