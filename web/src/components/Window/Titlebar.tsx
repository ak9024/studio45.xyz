import type { MouseEvent } from 'react';
import styles from './Titlebar.module.css';

interface TitlebarProps {
  title: string;
  isActive: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDragStart: (e: MouseEvent) => void;
}

function Titlebar({
  title,
  isActive,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onDragStart,
}: TitlebarProps) {
  const handleDoubleClick = () => {
    onMaximize();
  };

  return (
    <div
      className={`${styles.titlebar} ${isActive ? styles.active : ''}`}
      onMouseDown={onDragStart}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.close}`}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
        />
        <button
          className={`${styles.button} ${styles.minimize}`}
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          aria-label="Minimize"
        />
        <button
          className={`${styles.button} ${styles.maximize}`}
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          aria-label={isMaximized ? 'Restore' : 'Maximize'}
        />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default Titlebar;
