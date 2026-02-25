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
        <div className="w-10 h-10 border-4 border-coral/30 border-t-coral rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-coral-dark to-coral px-5 pt-6 pb-5 rounded-b-[2rem] shadow-lg">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/80 text-sm mt-1">Customize your experience</p>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Program Info */}
        <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
          <h2 className="font-bold text-charcoal text-sm uppercase tracking-wide">Program</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-warm">Current week</span>
            <span className="font-bold text-coral text-lg">{currentWeek}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-warm">Equipment</span>
            <span className="font-semibold text-charcoal">2x 18lb dumbbells</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-5 shadow-md space-y-5">
          <h2 className="font-bold text-charcoal text-sm uppercase tracking-wide">Preferences</h2>

          <div className="flex items-center justify-between">
            <span className="text-charcoal font-medium">Rest day yoga suggestions</span>
            <button
              className={`w-14 h-8 rounded-full transition-colors relative ${
                settings.restDayYogaEnabled ? 'bg-teal' : 'bg-cream-dark'
              }`}
              onClick={() => updateSetting('restDayYogaEnabled', !settings.restDayYogaEnabled)}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                  settings.restDayYogaEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-charcoal font-medium">Notifications</span>
            <button
              className={`w-14 h-8 rounded-full transition-colors relative ${
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
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                  settings.notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-5 shadow-md space-y-3">
          <h2 className="font-bold text-coral-dark text-sm uppercase tracking-wide">Reset</h2>
          <p className="text-sm text-gray-warm">
            This will erase all your workout data and start fresh. This cannot be undone.
          </p>
          {showResetConfirm ? (
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-coral-dark text-white rounded-xl font-bold shadow-md active:scale-95 transition-all min-h-[44px]"
              >
                Yes, reset everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-cream-dark text-charcoal rounded-xl font-semibold active:scale-95 transition-all min-h-[44px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 bg-coral/10 text-coral-dark rounded-xl font-semibold active:scale-95 transition-all min-h-[44px]"
            >
              Reset all data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
