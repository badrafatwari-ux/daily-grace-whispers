import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { VerseListItem } from '@/components/VerseListItem';
import { VerseCard } from '@/components/VerseCard';
import { useVerseHistory } from '@/hooks/useVerseHistory';
import { useFavorites } from '@/hooks/useFavorites';
import { type Verse } from '@/data/verses';
import { ArrowLeft, Clock } from 'lucide-react';

const History = () => {
  const { getHistoryWithVerses } = useVerseHistory();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedVerse, setSelectedVerse] = useState<{ verse: Verse; date: string } | null>(null);

  const history = getHistoryWithVerses();

  if (selectedVerse) {
    return (
      <PageLayout title="Verse Detail">
        <div className="py-4 space-y-4">
          <button 
            onClick={() => setSelectedVerse(null)}
            className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </button>
          
          <VerseCard
            verse={selectedVerse.verse}
            isFavorite={isFavorite(selectedVerse.verse.id)}
            onToggleFavorite={() => toggleFavorite(selectedVerse.verse.id)}
            showReflection={true}
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Verse History">
      <div className="py-4 space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No history yet</p>
            <p className="text-sm text-muted-foreground/70">
              Your daily verses will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <VerseListItem
                key={entry.date}
                verse={entry.verse}
                date={entry.date}
                isFavorite={isFavorite(entry.verse.id)}
                onClick={() => setSelectedVerse({ verse: entry.verse, date: entry.date })}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default History;
