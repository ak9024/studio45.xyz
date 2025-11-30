export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  position: Position;
  size: Size;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  isActive: boolean;
  data?: Record<string, unknown>;
}

export interface WindowManagerState {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
}

export interface WindowManagerContextType {
  state: WindowManagerState;
  openWindow: (appId: string, initialData?: Record<string, unknown>) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: Position) => void;
  updateWindowSize: (windowId: string, size: Size) => void;
  updateWindowData: (windowId: string, data: Record<string, unknown>) => void;
}
