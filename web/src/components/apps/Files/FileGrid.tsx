import type { FileNode } from '@/types/filesystem.types';
import FileItem from './FileItem';
import styles from './FileGrid.module.css';

interface FileGridProps {
  files: FileNode[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onDoubleClick: (fileId: string) => void;
}

function FileGrid({ files, selectedIds, onSelect, onDoubleClick }: FileGridProps) {
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

  if (files.length === 0) {
    return (
      <div className={styles.empty}>
        <p>This folder is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {files.map(file => (
        <FileItem
          key={file.id}
          file={file}
          isSelected={selectedIds.includes(file.id)}
          onClick={(e) => handleClick(file.id, e)}
          onDoubleClick={() => onDoubleClick(file.id)}
          viewMode="grid"
        />
      ))}
    </div>
  );
}

export default FileGrid;
