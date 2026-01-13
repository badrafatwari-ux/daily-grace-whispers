import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<number[]>('daily-verse-favorites', []);

  const isFavorite = useCallback((verseId: number): boolean => {
    return favorites.includes(verseId);
  }, [favorites]);

  const toggleFavorite = useCallback((verseId: number) => {
    setFavorites(prev => {
      if (prev.includes(verseId)) {
        return prev.filter(id => id !== verseId);
      } else {
        return [...prev, verseId];
      }
    });
  }, [setFavorites]);

  const addFavorite = useCallback((verseId: number) => {
    setFavorites(prev => {
      if (prev.includes(verseId)) return prev;
      return [...prev, verseId];
    });
  }, [setFavorites]);

  const removeFavorite = useCallback((verseId: number) => {
    setFavorites(prev => prev.filter(id => id !== verseId));
  }, [setFavorites]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };
}
