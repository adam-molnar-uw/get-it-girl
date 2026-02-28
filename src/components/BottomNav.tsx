import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Today', icon: '🏠' },
  { to: '/week', label: 'Planner', icon: '📅' },
  { to: '/history', label: 'Activity', icon: '📋' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-dark-card/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 min-w-[64px] min-h-[44px] justify-center px-3 py-1.5 transition-all duration-200 ${
                  isActive
                    ? 'text-peach'
                    : 'text-text-muted'
                }`
              }
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
