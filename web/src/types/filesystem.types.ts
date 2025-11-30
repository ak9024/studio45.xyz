export type FileType = 'file' | 'folder';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  path: string;
  parentId: string | null;
  children?: string[];
  size?: number;
  modified: Date;
  content?: string;
  icon?: string;
}

export interface FileSystemState {
  nodes: Record<string, FileNode>;
  currentPath: string;
  selectedItems: string[];
  clipboard: {
    items: string[];
    operation: 'copy' | 'cut';
  } | null;
}

export interface FileSystemContextType {
  state: FileSystemState;
  navigateToPath: (path: string) => void;
  createFolder: (parentId: string, name: string) => void;
  createFile: (parentId: string, name: string, content?: string) => void;
  deleteItems: (ids: string[]) => void;
  renameItem: (id: string, newName: string) => void;
  copyItems: (ids: string[]) => void;
  cutItems: (ids: string[]) => void;
  pasteItems: (targetId: string) => void;
  selectItems: (ids: string[]) => void;
  getNodeById: (id: string) => FileNode | undefined;
  getNodeByPath: (path: string) => FileNode | undefined;
  getChildrenOfNode: (nodeId: string) => FileNode[];
  updateFileContent: (id: string, content: string) => void;
}
