import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export function useNativeSetup() {
  useEffect(() => {
    const setupNative = async () => {
      if (Capacitor.isNativePlatform()) {
        // Configure status bar
        try {
          await StatusBar.setStyle({ style: Style.Light });
          await StatusBar.setBackgroundColor({ color: '#faf6f1' });
        } catch (e) {
          console.log('StatusBar not available');
        }

        // Hide splash screen after app loads
        try {
          await SplashScreen.hide();
        } catch (e) {
          console.log('SplashScreen not available');
        }
      }
    };

    setupNative();
  }, []);
}
