import { useState, useEffect } from 'react';
import { getSettings, saveSettings, resetAllData, getProgression } from '../db/repositories';
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
        <div className="text-coral text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 pb-24 space-y-6">
      <h1 className="text-2xl font-bold text-charcoal">Settings</h1>

      {/* Program Info */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <h2 className="font-semibold text-charcoal">Program</h2>
        <div className="flex justify-between items-center">
          <span className="text-gray-warm">Current week</span>
          <span className="font-semibold text-coral">{currentWeek}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-warm">Equipment</span>
          <span className="font-semibold text-charcoal">2x 18lb dumbbells</span>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <h2 className="font-semibold text-charcoal">Preferences</h2>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-charcoal">Rest day yoga suggestions</span>
          <div
            className={`w-12 h-7 rounded-full transition-colors relative ${
              settings.restDayYogaEnabled ? 'bg-teal' : 'bg-cream-dark'
            }`}
            onClick={() => updateSetting('restDayYogaEnabled', !settings.restDayYogaEnabled)}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                settings.restDayYogaEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-charcoal">Notifications</span>
          <div
            className={`w-12 h-7 rounded-full transition-colors relative ${
              settings.notificationsEnabled ? 'bg-teal' : 'bg-cream-dark'
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
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </div>
        </label>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <h2 className="font-semibold text-coral-dark">Reset</h2>
        <p className="text-sm text-gray-warm">
          This will erase all your workout data and start fresh. This cannot be undone.
        </p>
        {showResetConfirm ? (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-coral-dark text-white rounded-xl font-semibold min-h-[44px]"
            >
              Yes, reset everything
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="flex-1 py-3 bg-cream-dark text-charcoal rounded-xl font-semibold min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 bg-coral/10 text-coral-dark rounded-xl font-semibold min-h-[44px]"
          >
            Reset all data
          </button>
        )}
      </div>
    </div>
  );
}
