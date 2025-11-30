import { useDesktop } from '@/contexts/DesktopContext';
import styles from './AppearancePanel.module.css';

const wallpapers = [
  { id: 'default', name: 'Default Ubuntu', color: '#77216F' },
  { id: 'orange', name: 'Ubuntu Orange', color: '#E95420' },
  { id: 'blue', name: 'Ocean Blue', color: '#3584E4' },
  { id: 'green', name: 'Forest Green', color: '#26A269' },
  { id: 'purple', name: 'Deep Purple', color: '#613583' },
  { id: 'dark', name: 'Dark Grey', color: '#2C2C2C' },
];

function AppearancePanel() {
  const { state, setWallpaper } = useDesktop();

  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Appearance</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Wallpaper</h3>
        <p className={styles.description}>Choose a background color for your desktop</p>
        <div className={styles.wallpaperGrid}>
          {wallpapers.map(wp => (
            <button
              key={wp.id}
              className={`${styles.wallpaperOption} ${state.wallpaper === wp.color ? styles.active : ''}`}
              style={{ backgroundColor: wp.color }}
              onClick={() => setWallpaper(wp.color)}
              title={wp.name}
            >
              {state.wallpaper === wp.color && (
                <div className={styles.checkmark}>✓</div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Theme</h3>
        <p className={styles.description}>Light and dark mode coming soon</p>
      </section>
    </div>
  );
}

export default AppearancePanel;
