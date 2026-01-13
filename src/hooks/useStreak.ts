import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastVisitDate: string | null;
}

const initialStreakData: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  lastVisitDate: null,
};

export function useStreak() {
  const [streakData, setStreakData] = useLocalStorage<StreakData>('daily-verse-streak', initialStreakData);

  const getDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const updateStreak = useCallback(() => {
    const today = getDateString(new Date());
    
    if (streakData.lastVisitDate === today) {
      // Already visited today, no update needed
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = getDateString(yesterday);

    let newCurrentStreak: number;
    
    if (streakData.lastVisitDate === yesterdayString) {
      // Consecutive day - increment streak
      newCurrentStreak = streakData.currentStreak + 1;
    } else if (streakData.lastVisitDate === null) {
      // First visit ever
      newCurrentStreak = 1;
    } else {
      // Streak broken - reset to 1
      newCurrentStreak = 1;
    }

    const newBestStreak = Math.max(streakData.bestStreak, newCurrentStreak);

    setStreakData({
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastVisitDate: today,
    });
  }, [streakData, setStreakData]);

  // Update streak on mount
  useEffect(() => {
    updateStreak();
  }, []);

  return {
    currentStreak: streakData.currentStreak,
    bestStreak: streakData.bestStreak,
    lastVisitDate: streakData.lastVisitDate,
  };
}
