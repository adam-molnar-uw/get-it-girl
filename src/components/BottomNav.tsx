import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'TODAY', icon: '🏠' },
  { to: '/week', label: 'WEEK', icon: '📅' },
  { to: '/history', label: 'HISTORY', icon: '📋' },
  { to: '/settings', label: 'SETTINGS', icon: '⚙️' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="retro-stripes" />
      <div className="bg-dark-card/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2 pb-[env(safe-area-inset-bottom)]">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 min-w-[64px] min-h-[44px] justify-center px-3 py-1.5 transition-all duration-200 border-b-3 ${
                  isActive
                    ? 'text-peach border-peach'
                    : 'text-text-secondary border-transparent'
                }`
              }
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[11px] font-bold tracking-[0.1em]">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
