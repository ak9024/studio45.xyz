import Clock from './Clock';
import SystemIndicators from './SystemIndicators/SystemIndicators';
import styles from './TopBar.module.css';

function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <div className={styles.appMenu}>Activities</div>
      </div>
      <div className={styles.center}>
        <Clock />
      </div>
      <div className={styles.right}>
        <SystemIndicators />
      </div>
    </div>
  );
}

export default TopBar;
