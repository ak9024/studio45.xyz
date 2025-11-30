import type { ReactNode } from 'react';

export type AppId = 'files' | 'terminal' | 'text-editor' | 'settings';

export interface Application {
  id: AppId;
  name: string;
  icon: string;
  component: ReactNode;
  defaultSize: {
    width: number;
    height: number;
  };
  defaultPosition?: {
    x: number;
    y: number;
  };
}

export interface SystemIndicators {
  wifi: {
    connected: boolean;
    strength: number;
  };
  battery: {
    level: number;
    charging: boolean;
  };
  volume: {
    level: number;
    muted: boolean;
  };
}

export interface DesktopState {
  pinnedApps: AppId[];
  systemTime: Date;
  systemIndicators: SystemIndicators;
  wallpaper: string;
}

export interface DesktopContextType {
  state: DesktopState;
  updateSystemTime: () => void;
  updateIndicator: (indicator: keyof SystemIndicators, value: Partial<SystemIndicators[keyof SystemIndicators]>) => void;
  setWallpaper: (wallpaper: string) => void;
}
