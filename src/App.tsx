import { HashRouter, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { TodayPage } from './pages/TodayPage';
import { WeekPage } from './pages/WeekPage';
import { WorkoutPage } from './pages/WorkoutPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-dvh flex flex-col bg-retro-cream">
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
