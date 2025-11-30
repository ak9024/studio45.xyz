import styles from './AboutPanel.module.css';

function AboutPanel() {
  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>About</h2>

      <div className={styles.content}>
        <div className={styles.logo}>🐧</div>

        <h3 className={styles.appName}>Ubuntu Desktop Simulator</h3>
        <p className={styles.version}>Version 1.0.0</p>

        <p className={styles.description}>
          A web-based Ubuntu desktop environment simulator built with React and TypeScript.
          This project demonstrates a functional desktop interface with file management,
          terminal emulation, text editing, and system settings.
        </p>

        <div className={styles.features}>
          <h4>Features</h4>
          <ul>
            <li>Window management with drag and resize</li>
            <li>File manager with grid and list views</li>
            <li>Terminal with command execution</li>
            <li>Text editor with syntax highlighting</li>
            <li>Customizable desktop appearance</li>
          </ul>
        </div>

        <div className={styles.credits}>
          <p>Built with React 19, TypeScript, and Vite</p>
          <p>© 2024 Ubuntu Desktop Simulator</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPanel;
