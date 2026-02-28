import { useEffect, useState } from 'react';
import type { Badge } from '../types';

interface BadgeToastProps {
  badges: Badge[];
  onDismiss: () => void;
}

export function BadgeToast({ badges, onDismiss }: BadgeToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (badges.length === 0) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-dark-base/90 backdrop-blur-lg transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={() => {
        setVisible(false);
        setTimeout(onDismiss, 300);
      }}
    >
      <div
        className={`glass-card p-8 mx-6 text-center max-w-sm transition-all duration-500 ${
          visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <div className="mb-4">
          {badges.map((badge) => (
            <span key={badge.id} className="text-6xl mx-1 inline-block animate-pop-in">
              {badge.emoji}
            </span>
          ))}
        </div>
        <h2 className="font-display text-2xl text-mint font-bold mb-3">
          {badges.length === 1 ? 'Badge Unlocked!' : 'Badges Unlocked!'}
        </h2>
        <div className="space-y-2">
          {badges.map((badge) => (
            <div key={badge.id}>
              <p className="text-text-primary font-bold text-lg">{badge.name}</p>
              <p className="text-text-muted text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
        <p className="text-text-muted text-xs mt-5 font-medium">
          Tap to continue
        </p>
      </div>
    </div>
  );
}
