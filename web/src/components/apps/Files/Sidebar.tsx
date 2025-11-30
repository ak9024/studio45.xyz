import styles from './Sidebar.module.css';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const commonLocations = [
  { name: 'Home', path: '/home/ubuntu', icon: '🏠' },
  { name: 'Desktop', path: '/home/ubuntu/Desktop', icon: '🖥️' },
  { name: 'Documents', path: '/home/ubuntu/Documents', icon: '📄' },
  { name: 'Downloads', path: '/home/ubuntu/Downloads', icon: '⬇️' },
  { name: 'Pictures', path: '/home/ubuntu/Pictures', icon: '🖼️' },
];

function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Places</div>
        {commonLocations.map(location => (
          <button
            key={location.path}
            className={`${styles.item} ${currentPath === location.path ? styles.active : ''}`}
            onClick={() => onNavigate(location.path)}
          >
            <span className={styles.icon}>{location.icon}</span>
            <span className={styles.name}>{location.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
