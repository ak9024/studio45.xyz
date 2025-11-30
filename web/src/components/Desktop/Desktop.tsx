import TopBar from '@/components/TopBar/TopBar';
import Dock from '@/components/Dock/Dock';
import styles from './Desktop.module.css';

function Desktop() {
  const handleAppClick = (appId: string) => {
    console.log('App clicked:', appId);
    // TODO: Open window with WindowManager
  };

  return (
    <div className={styles.desktop}>
      <div className={styles.wallpaper} />
      <TopBar />
      <Dock onAppClick={handleAppClick} activeApps={[]} />
      {/* Windows will go here */}
    </div>
  );
}

export default Desktop;
