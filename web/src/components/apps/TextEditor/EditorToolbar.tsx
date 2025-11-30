import styles from './EditorToolbar.module.css';

interface EditorToolbarProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  onSave: () => void;
  canSave: boolean;
}

function EditorToolbar({ fontSize, onFontSizeChange, onSave, canSave }: EditorToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <button
        className={`${styles.button} ${!canSave ? styles.disabled : ''}`}
        onClick={onSave}
        disabled={!canSave}
        title="Save (Ctrl+S)"
      >
        Save
      </button>
      <div className={styles.separator} />
      <div className={styles.fontSizeControl}>
        <button
          className={styles.iconButton}
          onClick={() => onFontSizeChange(Math.max(10, fontSize - 1))}
          aria-label="Decrease font size"
          title="Decrease font size"
        >
          A−
        </button>
        <span className={styles.fontSize}>{fontSize}px</span>
        <button
          className={styles.iconButton}
          onClick={() => onFontSizeChange(Math.min(24, fontSize + 1))}
          aria-label="Increase font size"
          title="Increase font size"
        >
          A+
        </button>
      </div>
    </div>
  );
}

export default EditorToolbar;
