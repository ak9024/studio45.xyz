import type { FileNode } from '@/types/filesystem.types';
import FileItem from './FileItem';
import styles from './FileList.module.css';

interface FileListProps {
  files: FileNode[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onDoubleClick: (fileId: string) => void;
}

function FileList({ files, selectedIds, onSelect, onDoubleClick }: FileListProps) {
  const handleClick = (fileId: string, e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      // Multi-select
      if (selectedIds.includes(fileId)) {
        onSelect(selectedIds.filter(id => id !== fileId));
      } else {
        onSelect([...selectedIds, fileId]);
      }
    } else {
      onSelect([fileId]);
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  if (files.length === 0) {
    return (
      <div className={styles.empty}>
        <p>This folder is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.nameColumn}>Name</div>
        <div className={styles.sizeColumn}>Size</div>
        <div className={styles.modifiedColumn}>Modified</div>
      </div>
      <div className={styles.items}>
        {files.map(file => (
          <div
            key={file.id}
            className={`${styles.row} ${selectedIds.includes(file.id) ? styles.selected : ''}`}
            onClick={(e) => handleClick(file.id, e)}
            onDoubleClick={() => onDoubleClick(file.id)}
          >
            <div className={styles.nameColumn}>
              <FileItem
                file={file}
                isSelected={selectedIds.includes(file.id)}
                onClick={() => {}}
                onDoubleClick={() => {}}
                viewMode="list"
              />
            </div>
            <div className={styles.sizeColumn}>
              {file.type === 'folder' ? '-' : formatSize(file.size)}
            </div>
            <div className={styles.modifiedColumn}>
              {formatDate(file.modified)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileList;
