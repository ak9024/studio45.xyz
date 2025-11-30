import type { FileNode } from '@/types/filesystem.types';
import { ICON_PATHS } from '@/utils/constants';
import styles from './FileItem.module.css';

interface FileItemProps {
  file: FileNode;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  viewMode: 'grid' | 'list';
}

function FileItem({ file, isSelected, onClick, onDoubleClick, viewMode }: FileItemProps) {
  const getIcon = () => {
    if (file.type === 'folder') {
      return ICON_PATHS.folder;
    }
    // Simple file type detection
    if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      return ICON_PATHS['file-text'];
    }
    return ICON_PATHS['file-text'];
  };

  const iconPath = getIcon();

  return (
    <div
      className={`${styles.fileItem} ${styles[viewMode]} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <svg
        className={styles.icon}
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={iconPath} />
      </svg>
      <span className={styles.name}>{file.name}</span>
    </div>
  );
}

export default FileItem;
