import styles from './EditorTabBar.module.css';

interface FileTab {
  fileId: string;
  name: string;
  isDirty: boolean;
}

interface EditorTabBarProps {
  openFiles: FileTab[];
  activeFileId: string | null;
  onTabClick: (fileId: string) => void;
  onCloseTab: (fileId: string) => void;
  onNewFile: () => void;
}

function EditorTabBar({ openFiles, activeFileId, onTabClick, onCloseTab, onNewFile }: EditorTabBarProps) {
  return (
    <div className={styles.tabBar}>
      <div className={styles.tabs}>
        {openFiles.map(file => (
          <div
            key={file.fileId}
            className={`${styles.tab} ${file.fileId === activeFileId ? styles.active : ''}`}
            onClick={() => onTabClick(file.fileId)}
          >
            <span className={styles.title}>
              {file.isDirty && <span className={styles.dirty}>●</span>}
              {file.name}
            </span>
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(file.fileId);
              }}
              aria-label="Close file"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button className={styles.newFile} onClick={onNewFile} aria-label="New file">
        +
      </button>
    </div>
  );
}

export default EditorTabBar;
