import styles from './PathBar.module.css';

interface PathBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

function PathBar({ currentPath, onNavigate }: PathBarProps) {
  const pathParts = currentPath.split('/').filter(Boolean);

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      onNavigate('/');
    } else {
      const newPath = '/' + pathParts.slice(0, index + 1).join('/');
      onNavigate(newPath);
    }
  };

  return (
    <div className={styles.pathBar}>
      <button
        className={styles.breadcrumb}
        onClick={() => handleBreadcrumbClick(-1)}
      >
        /
      </button>
      {pathParts.map((part, index) => (
        <div key={index} className={styles.breadcrumbWrapper}>
          <span className={styles.separator}>/</span>
          <button
            className={styles.breadcrumb}
            onClick={() => handleBreadcrumbClick(index)}
          >
            {part}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PathBar;
