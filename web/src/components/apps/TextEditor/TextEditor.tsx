import { useState, useEffect, useCallback } from 'react';
import { useFileSystem } from '@/contexts/FileSystemContext';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import EditorTabBar from './EditorTabBar';
import EditorToolbar from './EditorToolbar';
import CodeEditor from './CodeEditor';
import styles from './TextEditor.module.css';

interface TextEditorProps {
  windowId: string;
}

interface OpenFile {
  fileId: string;
  content: string;
  isDirty: boolean;
}

function TextEditor({ windowId }: TextEditorProps) {
  const { getNodeById, updateFileContent } = useFileSystem();
  const { state: wmState, updateWindowData } = useWindowManager();

  const window = wmState.windows.find(w => w.id === windowId);
  const windowData = window?.data || {};

  const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(
    (windowData.fontSize as number) || 14
  );

  // Initialize with file from window data if provided
  useEffect(() => {
    const initialFileId = windowData.fileId as string | undefined;
    if (initialFileId && openFiles.length === 0) {
      const file = getNodeById(initialFileId);
      if (file && file.type === 'file') {
        setOpenFiles([
          {
            fileId: file.id,
            content: file.content || '',
            isDirty: false,
          },
        ]);
        setActiveFileId(file.id);
      }
    }
  }, [windowData.fileId, getNodeById, openFiles.length]);

  useEffect(() => {
    updateWindowData(windowId, {
      openFiles,
      activeFileId,
      fontSize,
    });
  }, [openFiles, activeFileId, fontSize, windowId, updateWindowData]);

  const activeFile = openFiles.find(f => f.fileId === activeFileId);

  const handleContentChange = (content: string) => {
    setOpenFiles(prev =>
      prev.map(file =>
        file.fileId === activeFileId
          ? { ...file, content, isDirty: true }
          : file
      )
    );
  };

  const handleSave = useCallback(() => {
    if (!activeFile) return;

    updateFileContent(activeFile.fileId, activeFile.content);
    setOpenFiles(prev =>
      prev.map(file =>
        file.fileId === activeFileId ? { ...file, isDirty: false } : file
      )
    );
  }, [activeFile, activeFileId, updateFileContent]);

  const handleCloseTab = (fileId: string) => {
    const file = openFiles.find(f => f.fileId === fileId);

    if (file?.isDirty) {
      const confirmed = globalThis.confirm(
        'You have unsaved changes. Do you want to close without saving?'
      );
      if (!confirmed) return;
    }

    const newOpenFiles = openFiles.filter(f => f.fileId !== fileId);
    setOpenFiles(newOpenFiles);

    if (activeFileId === fileId && newOpenFiles.length > 0) {
      setActiveFileId(newOpenFiles[0].fileId);
    } else if (newOpenFiles.length === 0) {
      setActiveFileId(null);
    }
  };

  const handleNewFile = () => {
    const newFileId = `untitled-${Date.now()}`;
    const newFile: OpenFile = {
      fileId: newFileId,
      content: '',
      isDirty: false,
    };
    setOpenFiles([...openFiles, newFile]);
    setActiveFileId(newFileId);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [activeFile, handleSave]);

  return (
    <div className={styles.textEditor}>
      <EditorTabBar
        openFiles={openFiles.map(f => {
          const node = getNodeById(f.fileId);
          return {
            fileId: f.fileId,
            name: node?.name || 'untitled',
            isDirty: f.isDirty,
          };
        })}
        activeFileId={activeFileId}
        onTabClick={setActiveFileId}
        onCloseTab={handleCloseTab}
        onNewFile={handleNewFile}
      />
      <EditorToolbar
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onSave={handleSave}
        canSave={activeFile?.isDirty || false}
      />
      <div className={styles.editorContainer}>
        {activeFile ? (
          <CodeEditor
            fileId={activeFile.fileId}
            content={activeFile.content}
            onChange={handleContentChange}
            fontSize={fontSize}
          />
        ) : (
          <div className={styles.empty}>
            <p>No file open</p>
            <button onClick={handleNewFile} className={styles.newFileButton}>
              Create New File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextEditor;
