import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Verse } from '@/data/verses';

interface VerseCardProps {
  verse: Verse;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showReflection?: boolean;
  className?: string;
}

export function VerseCard({ 
  verse, 
  isFavorite, 
  onToggleFavorite, 
  showReflection = true,
  className 
}: VerseCardProps) {
  return (
    <div className={cn("card-verse p-6 space-y-4", className)}>
      {/* Decorative cross element */}
      <div className="flex justify-center mb-2">
        <div className="w-8 h-8 rounded-full bg-sky-soft flex items-center justify-center">
          <span className="text-primary text-lg">✝</span>
        </div>
      </div>

      {/* Verse text */}
      <blockquote className="verse-text text-center text-foreground leading-relaxed">
        "{verse.text}"
      </blockquote>

      {/* Reference */}
      <p className="verse-reference text-center">
        — {verse.reference}
      </p>

      {/* Reflection */}
      {showReflection && (
        <div className="pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {verse.reflection}
          </p>
        </div>
      )}

      {/* Favorite button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onToggleFavorite}
          className={cn(
            "btn-favorite p-3 rounded-full transition-all duration-300",
            isFavorite 
              ? "active bg-gold-soft" 
              : "bg-secondary hover:bg-secondary/80"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={cn(
              "w-6 h-6 transition-all duration-300",
              isFavorite 
                ? "fill-accent text-accent" 
                : "text-muted-foreground"
            )} 
          />
        </button>
      </div>
    </div>
  );
}
