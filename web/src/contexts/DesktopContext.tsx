import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { DesktopContextType, DesktopState, SystemIndicators } from '@/types/application.types';

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

const initialState: DesktopState = {
  pinnedApps: ['files', 'terminal', 'text-editor', 'settings'],
  systemTime: new Date(),
  systemIndicators: {
    wifi: {
      connected: true,
      strength: 4,
    },
    battery: {
      level: 75,
      charging: false,
    },
    volume: {
      level: 60,
      muted: false,
    },
  },
  wallpaper: 'default',
};

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DesktopState>(initialState);

  const updateSystemTime = () => {
    setState(prev => ({ ...prev, systemTime: new Date() }));
  };

  const updateIndicator = (
    indicator: keyof SystemIndicators,
    value: Partial<SystemIndicators[keyof SystemIndicators]>
  ) => {
    setState(prev => ({
      ...prev,
      systemIndicators: {
        ...prev.systemIndicators,
        [indicator]: {
          ...prev.systemIndicators[indicator],
          ...value,
        },
      },
    }));
  };

  const setWallpaper = (wallpaper: string) => {
    setState(prev => ({ ...prev, wallpaper }));
  };

  // Update time every second
  useEffect(() => {
    const interval = setInterval(updateSystemTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DesktopContext.Provider
      value={{
        state,
        updateSystemTime,
        updateIndicator,
        setWallpaper,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within DesktopProvider');
  }
  return context;
}
