import { useRef } from 'react';
import type { AppId } from '../../types/application.types';
import { ICON_PATHS } from '../../utils/constants';
import styles from './DockItem.module.css';

interface DockItemProps {
  appId: AppId;
  name: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

function DockItem({ appId: _appId, name, icon, isActive, onClick }: DockItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const getTooltipPosition = () => {
    if (!itemRef.current) return {};
    const rect = itemRef.current.getBoundingClientRect();
    return {
      top: `${rect.top + rect.height / 2}px`,
      transform: 'translateY(-50%)',
    };
  };

  return (
    <div
      ref={itemRef}
      className={`${styles.dockItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      title={name}
    >
      <svg className={styles.icon} viewBox="0 0 24 24">
        <path d={ICON_PATHS[icon] || ICON_PATHS.folder} />
      </svg>
      <div className={styles.tooltip} style={getTooltipPosition()}>
        {name}
      </div>
    </div>
  );
}

export default DockItem;
