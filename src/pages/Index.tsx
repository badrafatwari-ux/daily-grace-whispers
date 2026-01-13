import { PageLayout } from '@/components/PageLayout';
import { VerseCard } from '@/components/VerseCard';
import { StreakBadge } from '@/components/StreakBadge';
import { getVerseForDate } from '@/data/verses';
import { useStreak } from '@/hooks/useStreak';
import { useFavorites } from '@/hooks/useFavorites';
import { useVerseHistory } from '@/hooks/useVerseHistory';
import { format } from 'date-fns';

const Index = () => {
  const todaysVerse = getVerseForDate(new Date());
  const { currentStreak, bestStreak } = useStreak();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Initialize history tracking
  useVerseHistory();

  const today = format(new Date(), 'EEEE, MMMM d');

  return (
    <PageLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">{today}</p>
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Daily Verse
          </h1>
        </div>

        {/* Streak Badge */}
        <div className="flex justify-center">
          <StreakBadge 
            currentStreak={currentStreak} 
            bestStreak={bestStreak} 
          />
        </div>

        {/* Today's Verse */}
        <VerseCard
          verse={todaysVerse}
          isFavorite={isFavorite(todaysVerse.id)}
          onToggleFavorite={() => toggleFavorite(todaysVerse.id)}
          showReflection={true}
        />

        {/* Gentle encouragement */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground italic">
            "Take a moment to reflect on God's word today"
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
