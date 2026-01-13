import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getVerseForDate, type Verse } from '@/data/verses';

interface HistoryEntry {
  verseId: number;
  date: string;
}

export function useVerseHistory() {
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('daily-verse-history', []);

  const getDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const recordTodaysVerse = useCallback(() => {
    const today = getDateString(new Date());
    const todaysVerse = getVerseForDate(new Date());

    setHistory(prev => {
      // Check if today is already recorded
      if (prev.some(entry => entry.date === today)) {
        return prev;
      }

      // Add today's verse to history
      return [{ verseId: todaysVerse.id, date: today }, ...prev];
    });
  }, [setHistory]);

  // Record today's verse on mount
  useEffect(() => {
    recordTodaysVerse();
  }, []);

  const getHistoryWithVerses = useCallback((): (HistoryEntry & { verse: Verse })[] => {
    return history.map(entry => {
      const verse = getVerseForDate(new Date(entry.date));
      return { ...entry, verse };
    });
  }, [history]);

  return {
    history,
    getHistoryWithVerses,
    recordTodaysVerse,
  };
}
