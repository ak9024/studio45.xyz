import CodeEditorLib from '@uiw/react-textarea-code-editor';
import styles from './CodeEditor.module.css';

interface CodeEditorProps {
  fileId: string;
  content: string;
  onChange: (value: string) => void;
  fontSize: number;
}

function CodeEditor({ fileId, content, onChange, fontSize }: CodeEditorProps) {
  // Detect language from file ID/name
  const getLanguage = (id: string): string => {
    if (id.endsWith('.js') || id.includes('project.js')) return 'js';
    if (id.endsWith('.ts') || id.endsWith('.tsx')) return 'typescript';
    if (id.endsWith('.py')) return 'python';
    if (id.endsWith('.html')) return 'html';
    if (id.endsWith('.css')) return 'css';
    if (id.endsWith('.json')) return 'json';
    if (id.endsWith('.md') || id.includes('README')) return 'markdown';
    return 'text';
  };

  const language = getLanguage(fileId);

  return (
    <div className={styles.codeEditor}>
      <CodeEditorLib
        value={content}
        language={language}
        onChange={(e) => onChange(e.target.value)}
        padding={15}
        style={{
          fontSize,
          fontFamily: '"Ubuntu Mono", "Fira Code", "Consolas", monospace',
          lineHeight: 1.6,
          backgroundColor: '#1E1E1E',
          color: '#D4D4D4',
          minHeight: '100%',
        }}
        className={styles.editor}
      />
    </div>
  );
}

export default CodeEditor;
