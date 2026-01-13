import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface ReflectionNote {
  verseId: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export function useReflections() {
  const [reflections, setReflections] = useLocalStorage<ReflectionNote[]>('daily-verse-reflections', []);

  const getReflection = useCallback((verseId: number): ReflectionNote | undefined => {
    return reflections.find(r => r.verseId === verseId);
  }, [reflections]);

  const saveReflection = useCallback((verseId: number, note: string) => {
    const now = new Date().toISOString();
    
    setReflections(prev => {
      const existingIndex = prev.findIndex(r => r.verseId === verseId);
      
      if (existingIndex >= 0) {
        // Update existing reflection
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          note,
          updatedAt: now,
        };
        return updated;
      } else {
        // Add new reflection
        return [...prev, {
          verseId,
          note,
          createdAt: now,
          updatedAt: now,
        }];
      }
    });
  }, [setReflections]);

  const deleteReflection = useCallback((verseId: number) => {
    setReflections(prev => prev.filter(r => r.verseId !== verseId));
  }, [setReflections]);

  return {
    reflections,
    getReflection,
    saveReflection,
    deleteReflection,
  };
}
