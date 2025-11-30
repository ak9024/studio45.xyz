import styles from './OutputArea.module.css';

interface HistoryEntry {
  type: 'input' | 'output' | 'error';
  content: string;
}

interface OutputAreaProps {
  history: HistoryEntry[];
}

function OutputArea({ history }: OutputAreaProps) {
  if (history.length === 0) {
    return (
      <div className={styles.welcome}>
        <p>Welcome to Ubuntu Terminal!</p>
        <p>Type 'help' for available commands.</p>
      </div>
    );
  }

  return (
    <div className={styles.outputArea}>
      {history.map((entry, index) => (
        <div
          key={index}
          className={`${styles.entry} ${styles[entry.type]}`}
        >
          {entry.content.split('\n').map((line, i) => (
            <div key={i}>{line || '\u00A0'}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OutputArea;
