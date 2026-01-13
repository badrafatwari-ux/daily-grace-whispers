import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useReminder } from '@/hooks/useReminder';
import { useStreak } from '@/hooks/useStreak';
import { Bell, Clock, Trash2, AlertTriangle, Flame } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

const Settings = () => {
  const { reminderEnabled, reminderTime, toggleReminder, setReminderTime } = useReminder();
  const { currentStreak, bestStreak } = useStreak();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetData = () => {
    // Clear all localStorage data
    localStorage.removeItem('daily-verse-streak');
    localStorage.removeItem('daily-verse-favorites');
    localStorage.removeItem('daily-verse-history');
    localStorage.removeItem('daily-verse-reflections');
    localStorage.removeItem('daily-verse-reminder');
    
    // Reload the page to reset state
    window.location.reload();
  };

  return (
    <PageLayout title="Settings">
      <div className="py-4 space-y-6">
        {/* Stats Section */}
        <section className="card-verse p-4 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Flame className="w-4 h-4 text-accent" />
            Your Progress
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
              <p className="text-xs text-muted-foreground mt-1">Current Streak</p>
            </div>
            <div className="bg-secondary rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-accent">{bestStreak}</p>
              <p className="text-xs text-muted-foreground mt-1">Best Streak</p>
            </div>
          </div>
        </section>

        {/* Daily Reminder Section */}
        <section className="card-verse p-4 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Daily Reminder
          </h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Enable Reminder</p>
              <p className="text-xs text-muted-foreground">Get notified to read your daily verse</p>
            </div>
            <Switch
              checked={reminderEnabled}
              onCheckedChange={toggleReminder}
            />
          </div>

          {reminderEnabled && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-foreground">Reminder Time</p>
              </div>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className={cn(
                  "bg-secondary border border-border rounded-lg px-3 py-2",
                  "text-sm text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
              />
            </div>
          )}

          {reminderEnabled && (
            <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
              ℹ️ Reminder settings are saved. For native notifications, please enable them in your device settings after installing the app.
            </p>
          )}
        </section>

        {/* About Section */}
        <section className="card-verse p-4 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">About</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Daily Christian Verse & Reflection
            </p>
            <p className="text-xs text-muted-foreground">
              Start each day with God's Word. This app provides daily Bible verses with reflections to help you grow in faith.
            </p>
            <p className="text-xs text-muted-foreground">
              Version 1.0.0
            </p>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="card-verse p-4 space-y-4 border-destructive/20">
          <h2 className="text-sm font-semibold text-destructive flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Danger Zone
          </h2>
          
          <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card">
              <AlertDialogHeader>
                <AlertDialogTitle>Reset All Data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your favorites, reflections, streak data, and settings. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleResetData}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Reset Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for your spiritual journey
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
