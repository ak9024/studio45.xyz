import { useDesktop } from '../../../contexts/DesktopContext';
import styles from './SystemIndicators.module.css';

function SystemIndicators() {
  const { state } = useDesktop();
  const { wifi, battery, volume } = state.systemIndicators;

  return (
    <div className={styles.indicators}>
      {/* WiFi Indicator */}
      <div className={styles.indicator} title={`WiFi: ${wifi.connected ? 'Connected' : 'Disconnected'}`}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
      </div>

      {/* Volume Indicator */}
      <div className={styles.indicator} title={`Volume: ${volume.muted ? 'Muted' : volume.level + '%'}`}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          {volume.muted ? (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          ) : (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          )}
        </svg>
      </div>

      {/* Battery Indicator */}
      <div className={styles.indicator} title={`Battery: ${battery.level}%${battery.charging ? ' (Charging)' : ''}`}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
        </svg>
        <span className={styles.label}>{battery.level}%</span>
      </div>

      {/* Power Menu */}
      <div className={styles.indicator} title="Power">
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
        </svg>
      </div>
    </div>
  );
}

export default SystemIndicators;
