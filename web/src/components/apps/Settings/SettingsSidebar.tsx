import styles from './SettingsSidebar.module.css';

type PanelType = 'appearance' | 'system' | 'about';

interface SettingsSidebarProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
}

const panels: { id: PanelType; name: string; icon: string }[] = [
  { id: 'appearance', name: 'Appearance', icon: '🎨' },
  { id: 'system', name: 'System', icon: '⚙️' },
  { id: 'about', name: 'About', icon: 'ℹ️' },
];

function SettingsSidebar({ activePanel, onPanelChange }: SettingsSidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>Settings</div>
      <div className={styles.panels}>
        {panels.map(panel => (
          <button
            key={panel.id}
            className={`${styles.panel} ${activePanel === panel.id ? styles.active : ''}`}
            onClick={() => onPanelChange(panel.id)}
          >
            <span className={styles.icon}>{panel.icon}</span>
            <span className={styles.name}>{panel.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SettingsSidebar;
