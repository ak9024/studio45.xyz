import { DesktopProvider } from '@/contexts/DesktopContext';
import { WindowManagerProvider } from '@/contexts/WindowManagerContext';
import { FileSystemProvider } from '@/contexts/FileSystemContext';
import Desktop from '@/components/Desktop/Desktop';

function App() {
  return (
    <DesktopProvider>
      <FileSystemProvider>
        <WindowManagerProvider>
          <Desktop />
        </WindowManagerProvider>
      </FileSystemProvider>
    </DesktopProvider>
  );
}

export default App;
