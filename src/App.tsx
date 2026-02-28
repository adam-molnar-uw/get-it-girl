import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { Onboarding } from './components/Onboarding';
import { TodayPage } from './pages/TodayPage';
import { WeekPage } from './pages/WeekPage';
import { WorkoutPage } from './pages/WorkoutPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

const ONBOARDING_KEY = 'gig-onboarding-done';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem(ONBOARDING_KEY)
  );

  function handleOnboardingComplete() {
    localStorage.setItem(ONBOARDING_KEY, '1');
    setShowOnboarding(false);
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <HashRouter>
      <div className="min-h-dvh flex flex-col bg-dark-base">
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/week" element={<WeekPage />} />
          <Route path="/workout/:weekId/:workoutIndex" element={<WorkoutPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  );
}
