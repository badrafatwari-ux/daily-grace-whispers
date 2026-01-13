import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Verse } from '@/data/verses';
import { format } from 'date-fns';

interface VerseListItemProps {
  verse: Verse;
  date?: string;
  isFavorite?: boolean;
  onClick?: () => void;
  className?: string;
}

export function VerseListItem({ 
  verse, 
  date, 
  isFavorite, 
  onClick,
  className 
}: VerseListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl bg-card border border-border/50 shadow-card",
        "transition-all duration-200 hover:shadow-soft hover:border-border",
        "active:scale-[0.98]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {date && (
            <p className="text-xs text-muted-foreground mb-1">
              {format(new Date(date), 'MMMM d, yyyy')}
            </p>
          )}
          <p className="font-serif text-sm text-foreground line-clamp-2 leading-relaxed">
            "{verse.text}"
          </p>
          <p className="text-xs text-primary mt-2 font-medium">
            {verse.reference}
          </p>
        </div>
        
        {isFavorite && (
          <Heart className="w-4 h-4 fill-accent text-accent flex-shrink-0 mt-1" />
        )}
      </div>
    </button>
  );
}
