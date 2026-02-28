import type { Badge, EarnedBadge, BadgeCategory } from '../types';

interface BadgeGridProps {
  allBadges: Badge[];
  earnedBadges: EarnedBadge[];
}

const CATEGORY_NAMES: Record<BadgeCategory, string> = {
  'first-steps': 'First Steps',
  'streak': 'Streak Milestones',
  'volume': 'Volume',
  'type-mastery': 'Type Mastery',
  'progression': 'Progression',
  'perfect-week': 'Perfect Week',
};

const CATEGORY_ORDER: BadgeCategory[] = [
  'first-steps',
  'streak',
  'volume',
  'type-mastery',
  'progression',
  'perfect-week',
];

export function BadgeGrid({ allBadges, earnedBadges }: BadgeGridProps) {
  const earnedIds = new Set(earnedBadges.map((b) => b.id));

  // Group by category
  const grouped = new Map<BadgeCategory, Badge[]>();
  for (const badge of allBadges) {
    const list = grouped.get(badge.category) ?? [];
    list.push(badge);
    grouped.set(badge.category, list);
  }

  return (
    <div className="space-y-6">
      {CATEGORY_ORDER.map((category) => {
        const badges = grouped.get(category);
        if (!badges || badges.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
              {CATEGORY_NAMES[category]}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => {
                const earned = earnedIds.has(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`glass-card p-3 text-center transition-all ${
                      earned ? '' : 'opacity-30 grayscale'
                    }`}
                  >
                    <span className="text-3xl block mb-1.5">{badge.emoji}</span>
                    <p className="text-[11px] font-bold text-text-primary leading-tight">
                      {badge.name}
                    </p>
                    {earned && (
                      <div className="mt-1.5 w-5 h-5 mx-auto rounded-full bg-mint/20 flex items-center justify-center">
                        <span className="text-mint text-[10px] font-bold">✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
