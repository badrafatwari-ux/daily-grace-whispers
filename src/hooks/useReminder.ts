import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format
}

const defaultSettings: ReminderSettings = {
  enabled: false,
  time: '09:00',
};

export function useReminder() {
  const [settings, setSettings] = useLocalStorage<ReminderSettings>('daily-verse-reminder', defaultSettings);

  const toggleReminder = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      enabled: !prev.enabled,
    }));
  }, [setSettings]);

  const setReminderTime = useCallback((time: string) => {
    setSettings(prev => ({
      ...prev,
      time,
    }));
  }, [setSettings]);

  const setReminderEnabled = useCallback((enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      enabled,
    }));
  }, [setSettings]);

  return {
    reminderEnabled: settings.enabled,
    reminderTime: settings.time,
    toggleReminder,
    setReminderTime,
    setReminderEnabled,
  };
}
