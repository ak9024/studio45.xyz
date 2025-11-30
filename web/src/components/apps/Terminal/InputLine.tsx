import { useRef, useEffect, type KeyboardEvent } from 'react';
import styles from './InputLine.module.css';

interface InputLineProps {
  currentPath: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (command: string) => void;
  onHistoryNavigation: (direction: 'up' | 'down') => void;
}

function InputLine({ currentPath, value, onChange, onSubmit, onHistoryNavigation }: InputLineProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onHistoryNavigation('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onHistoryNavigation('down');
    }
  };

  return (
    <div className={styles.inputLine}>
      <span className={styles.prompt}>ubuntu@desktop:{currentPath}$</span>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}

export default InputLine;
