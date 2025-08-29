import { useState, useCallback, useEffect } from 'react';
import type { UserProgress, ModuleProgress } from '../types';

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({});

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('userProgress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Failed to load user progress from localStorage", error);
    }
  }, []);

  const updateProgress = useCallback((moduleId: string, data: ModuleProgress) => {
    setProgress(prevProgress => {
      const newProgress = {
        ...prevProgress,
        [moduleId]: data,
      };
      try {
        localStorage.setItem('userProgress', JSON.stringify(newProgress));
      } catch (error) {
        console.error("Failed to save user progress to localStorage", error);
      }
      return newProgress;
    });
  }, []);

  const getProgress = useCallback((moduleId: string) => {
    return progress[moduleId] || { score: 0, completed: false };
  }, [progress]);

  return { progress, updateProgress, getProgress };
};