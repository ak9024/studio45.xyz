import { useState, useEffect, useRef } from 'react';
import { useFileSystem } from '@/contexts/FileSystemContext';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { executeCommand, type CommandResult } from './commandProcessor';
import TabBar from './TabBar';
import OutputArea from './OutputArea';
import InputLine from './InputLine';
import styles from './Terminal.module.css';

interface TerminalProps {
  windowId: string;
}

interface HistoryEntry {
  type: 'input' | 'output' | 'error';
  content: string;
}

interface TerminalTab {
  id: string;
  title: string;
  history: HistoryEntry[];
  currentInput: string;
  currentPath: string;
  commandHistory: string[];
  historyIndex: number;
}

function Terminal({ windowId }: TerminalProps) {
  const { state: fsState, getNodeByPath, getChildrenOfNode } = useFileSystem();
  const { state: wmState, updateWindowData } = useWindowManager();

  const window = wmState.windows.find(w => w.id === windowId);
  const windowData = window?.data || {};

  const [tabs, setTabs] = useState<TerminalTab[]>(
    (windowData.tabs as TerminalTab[]) || [
      {
        id: 'tab-1',
        title: 'Terminal',
        history: [],
        currentInput: '',
        currentPath: '/home/ubuntu',
        commandHistory: [],
        historyIndex: -1,
      },
    ]
  );

  const [activeTabId, setActiveTabId] = useState<string>(
    (windowData.activeTabId as string) || 'tab-1'
  );

  const outputRef = useRef<HTMLDivElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId)!;

  useEffect(() => {
    updateWindowData(windowId, { tabs, activeTabId });
  }, [tabs, activeTabId, windowId, updateWindowData]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [activeTab.history]);

  const handleCommand = (command: string) => {
    setTabs(prev =>
      prev.map(tab => {
        if (tab.id !== activeTabId) return tab;

        // Add command to history
        const newHistory: HistoryEntry[] = [
          ...tab.history,
          { type: 'input', content: `ubuntu@desktop:${tab.currentPath}$ ${command}` },
        ];

        const result: CommandResult = executeCommand(command, {
          currentPath: tab.currentPath,
          getNodeByPath,
          getChildrenOfNode,
          nodes: fsState.nodes,
        });

        let updatedHistory = newHistory;

        if (result.output === '__CLEAR__') {
          updatedHistory = [];
        } else if (result.output) {
          updatedHistory.push({
            type: 'output',
            content: result.output,
          });
        }

        return {
          ...tab,
          history: updatedHistory,
          currentInput: '',
          currentPath: result.newPath || tab.currentPath,
          commandHistory: command.trim() ? [...tab.commandHistory, command] : tab.commandHistory,
          historyIndex: -1,
        };
      })
    );
  };

  const handleInputChange = (value: string) => {
    setTabs(prev =>
      prev.map(tab =>
        tab.id === activeTabId ? { ...tab, currentInput: value } : tab
      )
    );
  };

  const handleHistoryNavigation = (direction: 'up' | 'down') => {
    setTabs(prev =>
      prev.map(tab => {
        if (tab.id !== activeTabId) return tab;

        const maxIndex = tab.commandHistory.length - 1;
        let newIndex = tab.historyIndex;

        if (direction === 'up') {
          newIndex = tab.historyIndex === -1 ? maxIndex : Math.max(0, tab.historyIndex - 1);
        } else {
          newIndex = Math.min(maxIndex, tab.historyIndex + 1);
          if (newIndex === maxIndex && tab.historyIndex === maxIndex) {
            newIndex = -1;
          }
        }

        const newInput = newIndex === -1 ? '' : tab.commandHistory[newIndex];

        return {
          ...tab,
          currentInput: newInput,
          historyIndex: newIndex,
        };
      })
    );
  };

  const handleNewTab = () => {
    const newTab: TerminalTab = {
      id: `tab-${Date.now()}`,
      title: 'Terminal',
      history: [],
      currentInput: '',
      currentPath: '/home/ubuntu',
      commandHistory: [],
      historyIndex: -1,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (tabId: string) => {
    if (tabs.length === 1) return; // Don't close last tab

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  return (
    <div className={styles.terminal}>
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={setActiveTabId}
        onNewTab={handleNewTab}
        onCloseTab={handleCloseTab}
      />
      <div ref={outputRef} className={styles.output}>
        <OutputArea history={activeTab.history} />
      </div>
      <InputLine
        currentPath={activeTab.currentPath}
        value={activeTab.currentInput}
        onChange={handleInputChange}
        onSubmit={handleCommand}
        onHistoryNavigation={handleHistoryNavigation}
      />
    </div>
  );
}

export default Terminal;
