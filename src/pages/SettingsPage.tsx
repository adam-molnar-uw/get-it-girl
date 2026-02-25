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
        <div className="w-10 h-10 border-4 border-retro-red/30 border-t-retro-red rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="bg-retro-gold px-5 pt-6 pb-5">
        <h1 className="font-display text-4xl text-retro-brown tracking-wide leading-none">SETTINGS</h1>
        <p className="text-retro-brown/60 text-xs font-bold uppercase tracking-widest mt-2">
          Customize your experience
        </p>
      </div>
      <div className="retro-stripes" />

      <div className="px-4 mt-5 space-y-4">
        {/* Program Info */}
        <div className="bg-retro-white rounded-xl p-5 border border-retro-cream-dark shadow-md space-y-4">
          <h2 className="font-display text-lg text-retro-brown tracking-wider">PROGRAM</h2>
          <div className="flex justify-between items-center">
            <span className="text-retro-warm font-medium">Current week</span>
            <span className="font-display text-2xl text-retro-red">{currentWeek}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-retro-warm font-medium">Equipment</span>
            <span className="font-bold text-retro-brown">2× 18lb dumbbells</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-retro-white rounded-xl p-5 border border-retro-cream-dark shadow-md space-y-5">
          <h2 className="font-display text-lg text-retro-brown tracking-wider">PREFERENCES</h2>

          <div className="flex items-center justify-between">
            <span className="text-retro-brown font-medium">Rest day yoga</span>
            <button
              className={`w-14 h-8 rounded-full transition-colors relative ${
                settings.restDayYogaEnabled ? 'bg-retro-green' : 'bg-retro-cream-dark'
              }`}
              onClick={() => updateSetting('restDayYogaEnabled', !settings.restDayYogaEnabled)}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-retro-white rounded-full shadow-md transition-transform duration-200 ${
                  settings.restDayYogaEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-retro-brown font-medium">Notifications</span>
            <button
              className={`w-14 h-8 rounded-full transition-colors relative ${
                settings.notificationsEnabled ? 'bg-retro-green' : 'bg-retro-cream-dark'
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
                className={`absolute top-1 w-6 h-6 bg-retro-white rounded-full shadow-md transition-transform duration-200 ${
                  settings.notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reset */}
        <div className="bg-retro-white rounded-xl p-5 border border-retro-cream-dark shadow-md space-y-3">
          <h2 className="font-display text-lg text-retro-red tracking-wider">RESET</h2>
          <p className="text-sm text-retro-warm">
            Erase all data and start fresh. Cannot be undone.
          </p>
          {showResetConfirm ? (
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-retro-red text-white rounded-lg font-bold shadow-md active:scale-95 transition-all min-h-[44px]"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-retro-cream-dark text-retro-brown rounded-lg font-bold active:scale-95 transition-all min-h-[44px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 bg-retro-red/10 text-retro-red rounded-lg font-bold active:scale-95 transition-all min-h-[44px]"
            >
              Reset all data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
