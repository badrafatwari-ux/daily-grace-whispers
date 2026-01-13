import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { VerseListItem } from '@/components/VerseListItem';
import { VerseCard } from '@/components/VerseCard';
import { useFavorites } from '@/hooks/useFavorites';
import { getVerseById, type Verse } from '@/data/verses';
import { ArrowLeft, Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);

  const favoriteVerses = favorites
    .map(id => getVerseById(id))
    .filter((v): v is Verse => v !== undefined);

  if (selectedVerse) {
    return (
      <PageLayout title="Favorite Verse">
        <div className="py-4 space-y-4">
          <button 
            onClick={() => setSelectedVerse(null)}
            className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Favorites
          </button>
          
          <VerseCard
            verse={selectedVerse}
            isFavorite={isFavorite(selectedVerse.id)}
            onToggleFavorite={() => toggleFavorite(selectedVerse.id)}
            showReflection={true}
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Favorite Verses">
      <div className="py-4 space-y-4">
        {favoriteVerses.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No favorites yet</p>
            <p className="text-sm text-muted-foreground/70">
              Tap the heart icon to save verses
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteVerses.map((verse) => (
              <VerseListItem
                key={verse.id}
                verse={verse}
                isFavorite={true}
                onClick={() => setSelectedVerse(verse)}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Favorites;
