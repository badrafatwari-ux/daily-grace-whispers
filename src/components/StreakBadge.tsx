import { Flame, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  currentStreak: number;
  bestStreak: number;
  className?: string;
}

export function StreakBadge({ currentStreak, bestStreak, className }: StreakBadgeProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Current streak */}
      <div className="flex items-center gap-2 streak-badge px-4 py-2 rounded-full">
        <Flame className="w-5 h-5" />
        <span className="text-sm font-semibold">{currentStreak} day{currentStreak !== 1 ? 's' : ''}</span>
      </div>

      {/* Best streak */}
      <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-full">
        <Trophy className="w-4 h-4 text-accent" />
        <span className="text-xs text-muted-foreground">Best: {bestStreak}</span>
      </div>
    </div>
  );
}
