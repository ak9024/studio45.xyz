import type { AppId } from '@/types/application.types';

export interface AppDefinition {
  id: AppId;
  name: string;
  icon: string;
  defaultSize: {
    width: number;
    height: number;
  };
  defaultPosition?: {
    x: number;
    y: number;
  };
}

export const APPS: Record<AppId, AppDefinition> = {
  files: {
    id: 'files',
    name: 'Files',
    icon: 'folder',
    defaultSize: {
      width: 800,
      height: 600,
    },
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: 'terminal',
    defaultSize: {
      width: 700,
      height: 500,
    },
  },
  'text-editor': {
    id: 'text-editor',
    name: 'Text Editor',
    icon: 'file-text',
    defaultSize: {
      width: 750,
      height: 550,
    },
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: 'settings',
    defaultSize: {
      width: 600,
      height: 500,
    },
  },
};

export const ICON_PATHS: Record<string, string> = {
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  terminal: 'M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10zM7 10h2v2H7v-2zm0 4h2v2H7v-2zm4-4h6v2h-6v-2zm0 4h6v2h-6v-2z',
  'file-text': 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
};
