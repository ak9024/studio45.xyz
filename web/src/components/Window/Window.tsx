import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from 'react';
import type { WindowState, Position, Size } from '@/types/window.types';
import Titlebar from './Titlebar';
import styles from './Window.module.css';

interface WindowProps {
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: Position) => void;
  onSizeChange: (size: Size) => void;
  children: ReactNode;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

function Window({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  children,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);
  const [initialSize, setInitialSize] = useState<Size>(windowState.size);
  const [initialPosition, setInitialPosition] = useState<Position>(windowState.position);

  const minWidth = 300;
  const minHeight = 200;

  const handleMouseDown = () => {
    if (!windowState.isActive) {
      onFocus();
    }
  };

  const handleDragStart = (e: MouseEvent) => {
    if (windowState.isMaximized) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    onFocus();
  };

  const handleResizeStart = (e: MouseEvent, direction: ResizeDirection) => {
    if (windowState.isMaximized) return;

    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialSize(windowState.size);
    setInitialPosition(windowState.position);
    onFocus();
  };

  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const newX = Math.max(64, Math.min(windowState.position.x + deltaX, window.innerWidth - 100));
        const newY = Math.max(32, Math.min(windowState.position.y + deltaY, window.innerHeight - 100));

        onPositionChange({ x: newX, y: newY });
        setDragStart({ x: e.clientX, y: e.clientY });
      } else if (isResizing && resizeDirection) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        let newWidth = initialSize.width;
        let newHeight = initialSize.height;
        let newX = initialPosition.x;
        let newY = initialPosition.y;

        // Handle horizontal resize
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(minWidth, initialSize.width + deltaX);
        } else if (resizeDirection.includes('w')) {
          newWidth = Math.max(minWidth, initialSize.width - deltaX);
          if (newWidth > minWidth) {
            newX = initialPosition.x + deltaX;
          }
        }

        // Handle vertical resize
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, initialSize.height + deltaY);
        } else if (resizeDirection.includes('n')) {
          newHeight = Math.max(minHeight, initialSize.height - deltaY);
          if (newHeight > minHeight) {
            newY = initialPosition.y + deltaY;
          }
        }

        onSizeChange({ width: newWidth, height: newHeight });
        if (newX !== initialPosition.x || newY !== initialPosition.y) {
          onPositionChange({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeDirection, windowState.position, windowState.size, initialSize, initialPosition, onPositionChange, onSizeChange]);

  if (windowState.isMinimized) {
    return null;
  }

  const windowStyle = {
    left: `${windowState.position.x}px`,
    top: `${windowState.position.y}px`,
    width: `${windowState.size.width}px`,
    height: `${windowState.size.height}px`,
    zIndex: windowState.zIndex,
  };

  return (
    <div
      ref={windowRef}
      className={`${styles.window} ${windowState.isActive ? styles.active : ''}`}
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      <Titlebar
        title={windowState.title}
        isActive={windowState.isActive}
        isMaximized={windowState.isMaximized}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onDragStart={handleDragStart}
      />

      <div className={styles.content}>
        {children}
      </div>

      {!windowState.isMaximized && (
        <>
          <div
            className={`${styles.resizeHandle} ${styles.n}`}
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.s}`}
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.e}`}
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.w}`}
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.ne}`}
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.nw}`}
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.se}`}
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className={`${styles.resizeHandle} ${styles.sw}`}
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
        </>
      )}
    </div>
  );
}

export default Window;
