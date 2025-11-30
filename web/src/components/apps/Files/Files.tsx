import { useState, useEffect } from 'react';
import { useFileSystem } from '@/contexts/FileSystemContext';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import Sidebar from './Sidebar';
import PathBar from './PathBar';
import Toolbar from './Toolbar';
import FileGrid from './FileGrid';
import FileList from './FileList';
import styles from './Files.module.css';

interface FilesProps {
  windowId: string;
}

type ViewMode = 'grid' | 'list';

function Files({ windowId }: FilesProps) {
  const { state: fsState, navigateToPath, getNodeByPath, getChildrenOfNode } = useFileSystem();
  const { state: wmState, updateWindowData, openWindow } = useWindowManager();

  const window = wmState.windows.find(w => w.id === windowId);
  const windowData = window?.data || {};

  const [viewMode, setViewMode] = useState<ViewMode>(
    (windowData.viewMode as ViewMode) || 'grid'
  );
  const [currentPath, setCurrentPath] = useState<string>(
    (windowData.currentPath as string) || '/home/ubuntu'
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Update window data when state changes
  useEffect(() => {
    updateWindowData(windowId, {
      viewMode,
      currentPath,
      selectedIds,
    });
  }, [viewMode, currentPath, selectedIds, windowId, updateWindowData]);

  // Sync with filesystem context
  useEffect(() => {
    if (fsState.currentPath !== currentPath) {
      setCurrentPath(fsState.currentPath);
    }
  }, [fsState.currentPath]);

  const currentNode = getNodeByPath(currentPath);
  const children = currentNode ? getChildrenOfNode(currentNode.id) : [];

  const handleNavigate = (path: string) => {
    navigateToPath(path);
    setCurrentPath(path);
    setSelectedIds([]);
  };

  const handleFileDoubleClick = (fileId: string) => {
    const node = fsState.nodes[fileId];
    if (!node) return;

    if (node.type === 'folder') {
      handleNavigate(node.path);
    } else if (node.type === 'file') {
      // Open in text editor
      openWindow('text-editor', { fileId: node.id });
    }
  };

  return (
    <div className={styles.files}>
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      <div className={styles.main}>
        <PathBar currentPath={currentPath} onNavigate={handleNavigate} />
        <Toolbar viewMode={viewMode} onViewModeChange={setViewMode} />
        <div className={styles.content}>
          {viewMode === 'grid' ? (
            <FileGrid
              files={children}
              selectedIds={selectedIds}
              onSelect={setSelectedIds}
              onDoubleClick={handleFileDoubleClick}
            />
          ) : (
            <FileList
              files={children}
              selectedIds={selectedIds}
              onSelect={setSelectedIds}
              onDoubleClick={handleFileDoubleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Files;
