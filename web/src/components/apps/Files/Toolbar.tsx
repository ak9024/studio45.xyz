import styles from './Toolbar.module.css';

interface ToolbarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

function Toolbar({ viewMode, onViewModeChange }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
          onClick={() => onViewModeChange('grid')}
          aria-label="Grid view"
          title="Grid view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" />
            <rect x="9" y="1" width="6" height="6" />
            <rect x="1" y="9" width="6" height="6" />
            <rect x="9" y="9" width="6" height="6" />
          </svg>
        </button>
        <button
          className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
          onClick={() => onViewModeChange('list')}
          aria-label="List view"
          title="List view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="2" width="14" height="2" />
            <rect x="1" y="7" width="14" height="2" />
            <rect x="1" y="12" width="14" height="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
