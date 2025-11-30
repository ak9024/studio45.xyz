import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  WindowManagerContextType,
  WindowManagerState,
  WindowState,
  Position,
  Size,
} from '@/types/window.types';
import { APPS } from '@/utils/constants';

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WindowManagerState>({
    windows: [],
    activeWindowId: null,
    nextZIndex: 1000,
  });

  const openWindow = (appId: string, initialData?: Record<string, unknown>) => {
    const app = APPS[appId as keyof typeof APPS];
    if (!app) return;

    const windowId = `window-${crypto.randomUUID()}`;

    // Calculate centered position
    const position: Position = {
      x: (window.innerWidth - app.defaultSize.width) / 2,
      y: (window.innerHeight - app.defaultSize.height - 32) / 2, // Account for topbar
    };

    const newWindow: WindowState = {
      id: windowId,
      appId,
      title: app.name,
      position,
      size: app.defaultSize,
      isMaximized: false,
      isMinimized: false,
      zIndex: state.nextZIndex,
      isActive: true,
      data: initialData,
    };

    setState(prev => ({
      windows: [...prev.windows.map(w => ({ ...w, isActive: false })), newWindow],
      activeWindowId: windowId,
      nextZIndex: prev.nextZIndex + 1,
    }));
  };

  const closeWindow = (windowId: string) => {
    setState(prev => {
      const remainingWindows = prev.windows.filter(w => w.id !== windowId);
      let newActiveId = prev.activeWindowId;

      // If closing the active window, focus the next highest window
      if (windowId === prev.activeWindowId && remainingWindows.length > 0) {
        const highestWindow = remainingWindows.reduce((highest, current) =>
          current.zIndex > highest.zIndex ? current : highest
        );
        newActiveId = highestWindow.id;
        highestWindow.isActive = true;
      } else if (remainingWindows.length === 0) {
        newActiveId = null;
      }

      return {
        ...prev,
        windows: remainingWindows,
        activeWindowId: newActiveId,
      };
    });
  };

  const minimizeWindow = (windowId: string) => {
    setState(prev => ({
      ...prev,
      windows: prev.windows.map(w =>
        w.id === windowId ? { ...w, isMinimized: true, isActive: false } : w
      ),
      activeWindowId: prev.activeWindowId === windowId ? null : prev.activeWindowId,
    }));
  };

  const maximizeWindow = (windowId: string) => {
    setState(prev => ({
      ...prev,
      windows: prev.windows.map(w => {
        if (w.id !== windowId) return w;

        if (w.isMaximized) {
          // Restore to previous size/position (stored in data)
          return {
            ...w,
            isMaximized: false,
            position: (w.data?.previousPosition as Position) || w.position,
            size: (w.data?.previousSize as Size) || w.size,
          };
        } else {
          // Maximize: store current size/position
          return {
            ...w,
            isMaximized: true,
            data: {
              ...w.data,
              previousPosition: w.position,
              previousSize: w.size,
            },
            position: { x: 64, y: 32 }, // Account for dock and topbar
            size: {
              width: window.innerWidth - 64,
              height: window.innerHeight - 32,
            },
          };
        }
      }),
    }));
  };

  const focusWindow = (windowId: string) => {
    setState(prev => ({
      ...prev,
      windows: prev.windows.map(w => ({
        ...w,
        isActive: w.id === windowId,
        zIndex: w.id === windowId ? prev.nextZIndex : w.zIndex,
      })),
      activeWindowId: windowId,
      nextZIndex: prev.nextZIndex + 1,
    }));
  };

  const updateWindowPosition = (windowId: string, position: Position) => {
    setState(prev => ({
      ...prev,
      windows: prev.windows.map(w =>
        w.id === windowId ? { ...w, position } : w
      ),
    }));
  };

  const updateWindowSize = (windowId: string, size: Size) => {
    setState(prev => ({
      ...prev,
      windows: prev.windows.map(w =>
        w.id === windowId ? { ...w, size } : w
      ),
    }));
  };

  const updateWindowData = (windowId: string, data: Record<string, unknown>) => {
    setState(prev => ({
      ...prev,
      windows: prev.windows.map(w =>
        w.id === windowId ? { ...w, data: { ...w.data, ...data } } : w
      ),
    }));
  };

  return (
    <WindowManagerContext.Provider
      value={{
        state,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
        updateWindowData,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}
