import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  FileSystemContextType,
  FileSystemState,
  FileNode,
} from '@/types/filesystem.types';

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

// Mock filesystem data
const createInitialNodes = (): Record<string, FileNode> => {
  const now = new Date();
  return {
    'root': {
      id: 'root',
      name: '/',
      type: 'folder',
      path: '/',
      parentId: null,
      children: ['home'],
      modified: now,
    },
    'home': {
      id: 'home',
      name: 'home',
      type: 'folder',
      path: '/home',
      parentId: 'root',
      children: ['ubuntu'],
      modified: now,
    },
    'ubuntu': {
      id: 'ubuntu',
      name: 'ubuntu',
      type: 'folder',
      path: '/home/ubuntu',
      parentId: 'home',
      children: ['documents', 'downloads', 'desktop', 'pictures', 'readme', 'hello'],
      modified: now,
    },
    'documents': {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      path: '/home/ubuntu/Documents',
      parentId: 'ubuntu',
      children: ['notes', 'project'],
      modified: now,
    },
    'downloads': {
      id: 'downloads',
      name: 'Downloads',
      type: 'folder',
      path: '/home/ubuntu/Downloads',
      parentId: 'ubuntu',
      children: [],
      modified: now,
    },
    'desktop': {
      id: 'desktop',
      name: 'Desktop',
      type: 'folder',
      path: '/home/ubuntu/Desktop',
      parentId: 'ubuntu',
      children: [],
      modified: now,
    },
    'pictures': {
      id: 'pictures',
      name: 'Pictures',
      type: 'folder',
      path: '/home/ubuntu/Pictures',
      parentId: 'ubuntu',
      children: [],
      modified: now,
    },
    'readme': {
      id: 'readme',
      name: 'README.md',
      type: 'file',
      path: '/home/ubuntu/README.md',
      parentId: 'ubuntu',
      content: '# Welcome to Ubuntu!\n\nThis is a simulated Ubuntu desktop environment built with React.\n\n## Features\n\n- File manager\n- Terminal\n- Text editor\n- Settings\n\nEnjoy exploring!',
      size: 165,
      modified: now,
    },
    'hello': {
      id: 'hello',
      name: 'hello.txt',
      type: 'file',
      path: '/home/ubuntu/hello.txt',
      parentId: 'ubuntu',
      content: 'Hello, World!\n\nThis is a sample text file.',
      size: 45,
      modified: now,
    },
    'notes': {
      id: 'notes',
      name: 'notes.txt',
      type: 'file',
      path: '/home/ubuntu/Documents/notes.txt',
      parentId: 'documents',
      content: 'My Notes:\n\n- Learn React\n- Build awesome projects\n- Have fun coding!',
      size: 70,
      modified: now,
    },
    'project': {
      id: 'project',
      name: 'project.js',
      type: 'file',
      path: '/home/ubuntu/Documents/project.js',
      parentId: 'documents',
      content: '// My JavaScript Project\n\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("World");',
      size: 110,
      modified: now,
    },
  };
};

export function FileSystemProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FileSystemState>({
    nodes: createInitialNodes(),
    currentPath: '/home/ubuntu',
    selectedItems: [],
    clipboard: null,
  });

  const getNodeById = (id: string): FileNode | undefined => {
    return state.nodes[id];
  };

  const getNodeByPath = (path: string): FileNode | undefined => {
    return Object.values(state.nodes).find(node => node.path === path);
  };

  const getChildrenOfNode = (nodeId: string): FileNode[] => {
    const node = state.nodes[nodeId];
    if (!node || !node.children) return [];

    return node.children
      .map(childId => state.nodes[childId])
      .filter(Boolean)
      .sort((a, b) => {
        // Folders first, then alphabetically
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
  };

  const navigateToPath = (path: string) => {
    const node = getNodeByPath(path);
    if (node && node.type === 'folder') {
      setState(prev => ({
        ...prev,
        currentPath: path,
        selectedItems: [],
      }));
    }
  };

  const createFolder = (parentId: string, name: string) => {
    const parent = state.nodes[parentId];
    if (!parent || parent.type !== 'folder') return;

    const newId = `folder-${crypto.randomUUID()}`;
    const newPath = `${parent.path === '/' ? '' : parent.path}/${name}`;

    const newFolder: FileNode = {
      id: newId,
      name,
      type: 'folder',
      path: newPath,
      parentId,
      children: [],
      modified: new Date(),
    };

    setState(prev => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [newId]: newFolder,
        [parentId]: {
          ...prev.nodes[parentId],
          children: [...(prev.nodes[parentId].children || []), newId],
        },
      },
    }));
  };

  const createFile = (parentId: string, name: string, content = '') => {
    const parent = state.nodes[parentId];
    if (!parent || parent.type !== 'folder') return;

    const newId = `file-${crypto.randomUUID()}`;
    const newPath = `${parent.path === '/' ? '' : parent.path}/${name}`;

    const newFile: FileNode = {
      id: newId,
      name,
      type: 'file',
      path: newPath,
      parentId,
      content,
      size: content.length,
      modified: new Date(),
    };

    setState(prev => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [newId]: newFile,
        [parentId]: {
          ...prev.nodes[parentId],
          children: [...(prev.nodes[parentId].children || []), newId],
        },
      },
    }));
  };

  const deleteItems = (ids: string[]) => {
    setState(prev => {
      const newNodes = { ...prev.nodes };

      ids.forEach(id => {
        const node = newNodes[id];
        if (!node) return;

        // Remove from parent's children
        if (node.parentId) {
          const parent = newNodes[node.parentId];
          if (parent && parent.children) {
            newNodes[node.parentId] = {
              ...parent,
              children: parent.children.filter(childId => childId !== id),
            };
          }
        }

        // Delete the node
        delete newNodes[id];

        // Recursively delete children if it's a folder
        if (node.type === 'folder' && node.children) {
          deleteItems(node.children);
        }
      });

      return {
        ...prev,
        nodes: newNodes,
        selectedItems: prev.selectedItems.filter(id => !ids.includes(id)),
      };
    });
  };

  const renameItem = (id: string, newName: string) => {
    const node = state.nodes[id];
    if (!node) return;

    const newPath = node.path.substring(0, node.path.lastIndexOf('/') + 1) + newName;

    setState(prev => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [id]: {
          ...node,
          name: newName,
          path: newPath,
        },
      },
    }));
  };

  const copyItems = (ids: string[]) => {
    setState(prev => ({
      ...prev,
      clipboard: { items: ids, operation: 'copy' },
    }));
  };

  const cutItems = (ids: string[]) => {
    setState(prev => ({
      ...prev,
      clipboard: { items: ids, operation: 'cut' },
    }));
  };

  const pasteItems = (targetId: string) => {
    if (!state.clipboard) return;

    const target = state.nodes[targetId];
    if (!target || target.type !== 'folder') return;

    // For now, just implement copy (not move)
    // Full implementation would handle both operations
    setState(prev => ({
      ...prev,
      clipboard: null,
    }));
  };

  const selectItems = (ids: string[]) => {
    setState(prev => ({
      ...prev,
      selectedItems: ids,
    }));
  };

  const updateFileContent = (id: string, content: string) => {
    const node = state.nodes[id];
    if (!node || node.type !== 'file') return;

    setState(prev => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [id]: {
          ...node,
          content,
          size: content.length,
          modified: new Date(),
        },
      },
    }));
  };

  return (
    <FileSystemContext.Provider
      value={{
        state,
        navigateToPath,
        createFolder,
        createFile,
        deleteItems,
        renameItem,
        copyItems,
        cutItems,
        pasteItems,
        selectItems,
        getNodeById,
        getNodeByPath,
        getChildrenOfNode,
        updateFileContent,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}

export function useFileSystem() {
  const context = useContext(FileSystemContext);
  if (context === undefined) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  return context;
}
