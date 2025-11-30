import TopBar from '@/components/TopBar/TopBar';
import Dock from '@/components/Dock/Dock';
import Window from '@/components/Window/Window';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { useDesktop } from '@/contexts/DesktopContext';
import Files from '@/components/apps/Files/Files';
import Terminal from '@/components/apps/Terminal/Terminal';
import TextEditor from '@/components/apps/TextEditor/TextEditor';
import Settings from '@/components/apps/Settings/Settings';
import styles from './Desktop.module.css';

function Desktop() {
  const { state: desktopState } = useDesktop();
  const {
    state,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  const handleAppClick = (appId: string) => {
    // Check if app is already open
    const existingWindow = state.windows.find(w => w.appId === appId && !w.isMinimized);
    if (existingWindow) {
      focusWindow(existingWindow.id);
    } else {
      openWindow(appId);
    }
  };

  const activeApps = state.windows
    .filter(w => !w.isMinimized)
    .map(w => w.appId);

  return (
    <div className={styles.desktop}>
      <div
        className={styles.wallpaper}
        style={{ backgroundColor: desktopState.wallpaper }}
      />
      <TopBar />
      <Dock onAppClick={handleAppClick} activeApps={activeApps} />

      {state.windows.map(window => {
        let AppComponent = null;

        // Render the appropriate app component
        switch (window.appId) {
          case 'files':
            AppComponent = <Files windowId={window.id} />;
            break;
          case 'terminal':
            AppComponent = <Terminal windowId={window.id} />;
            break;
          case 'text-editor':
            AppComponent = <TextEditor windowId={window.id} />;
            break;
          case 'settings':
            AppComponent = <Settings windowId={window.id} />;
            break;
          default:
            AppComponent = (
              <div style={{ padding: '20px' }}>
                <h2>{window.title}</h2>
                <p>Component for {window.appId} not found</p>
              </div>
            );
        }

        return (
          <Window
            key={window.id}
            windowState={window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
            onSizeChange={(size) => updateWindowSize(window.id, size)}
          >
            {AppComponent}
          </Window>
        );
      })}
    </div>
  );
}

export default Desktop;
