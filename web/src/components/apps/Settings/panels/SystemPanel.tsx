import styles from './SystemPanel.module.css';

function SystemPanel() {
  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>System Information</h2>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.label}>Operating System</div>
          <div className={styles.value}>Ubuntu 22.04 LTS (Simulated)</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Memory</div>
          <div className={styles.value}>8 GB</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Processor</div>
          <div className={styles.value}>Simulated CPU</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Graphics</div>
          <div className={styles.value}>Web Renderer</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Storage</div>
          <div className={styles.value}>Virtual Filesystem</div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.label}>Desktop Environment</div>
          <div className={styles.value}>React Desktop Simulator</div>
        </div>
      </div>
    </div>
  );
}

export default SystemPanel;
