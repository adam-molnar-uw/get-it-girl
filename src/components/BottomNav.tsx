import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Today', icon: '🏠' },
  { to: '/week', label: 'Week', icon: '📅' },
  { to: '/history', label: 'History', icon: '📋' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-cream-dark z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 min-w-[64px] min-h-[44px] justify-center rounded-xl px-3 py-1 transition-colors ${
                isActive ? 'text-coral' : 'text-gray-warm'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
