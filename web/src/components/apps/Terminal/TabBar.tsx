import styles from './TabBar.module.css';

interface Tab {
  id: string;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  onNewTab: () => void;
  onCloseTab: (id: string) => void;
}

function TabBar({ tabs, activeTabId, onTabClick, onNewTab, onCloseTab }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTabId ? styles.active : ''}`}
            onClick={() => onTabClick(tab.id)}
          >
            <span className={styles.title}>{tab.title}</span>
            {tabs.length > 1 && (
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                aria-label="Close tab"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <button className={styles.newTab} onClick={onNewTab} aria-label="New tab">
        +
      </button>
    </div>
  );
}

export default TabBar;
