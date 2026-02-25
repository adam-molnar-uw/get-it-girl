import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Today', icon: '🏠' },
  { to: '/week', label: 'Week', icon: '📅' },
  { to: '/history', label: 'History', icon: '📋' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 min-w-[64px] min-h-[44px] justify-center rounded-2xl px-3 py-1.5 transition-all duration-200 ${
                isActive
                  ? 'text-coral bg-coral/10 scale-105'
                  : 'text-gray-warm active:scale-95'
              }`
            }
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
