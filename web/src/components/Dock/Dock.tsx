import { useDesktop } from '@/contexts/DesktopContext';
import { APPS } from '@/utils/constants';
import DockItem from '@/components/Dock/DockItem';
import styles from './Dock.module.css';

interface DockProps {
  onAppClick: (appId: string) => void;
  activeApps?: string[];
}

function Dock({ onAppClick, activeApps = [] }: DockProps) {
  const { state } = useDesktop();

  return (
    <div className={styles.dock}>
      <div className={styles.appList}>
        {state.pinnedApps.map(appId => {
          const app = APPS[appId];
          return (
            <DockItem
              key={appId}
              appId={appId}
              name={app.name}
              icon={app.icon}
              isActive={activeApps.includes(appId)}
              onClick={() => onAppClick(appId)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dock;
