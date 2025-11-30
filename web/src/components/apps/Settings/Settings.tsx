import { useState } from 'react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import SettingsSidebar from './SettingsSidebar';
import AppearancePanel from './panels/AppearancePanel';
import SystemPanel from './panels/SystemPanel';
import AboutPanel from './panels/AboutPanel';
import styles from './Settings.module.css';

interface SettingsProps {
  windowId: string;
}

type PanelType = 'appearance' | 'system' | 'about';

function Settings({ windowId }: SettingsProps) {
  const { state: wmState } = useWindowManager();
  const window = wmState.windows.find(w => w.id === windowId);
  const windowData = window?.data || {};

  const [activePanel, setActivePanel] = useState<PanelType>(
    (windowData.activePanel as PanelType) || 'appearance'
  );

  const renderPanel = () => {
    switch (activePanel) {
      case 'appearance':
        return <AppearancePanel />;
      case 'system':
        return <SystemPanel />;
      case 'about':
        return <AboutPanel />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.settings}>
      <SettingsSidebar
        activePanel={activePanel}
        onPanelChange={setActivePanel}
      />
      <div className={styles.panel}>
        {renderPanel()}
      </div>
    </div>
  );
}

export default Settings;
