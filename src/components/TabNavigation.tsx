import { useState } from 'react';
import { Tab } from '../types';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  tabs: Tab[];
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation = ({ tabs, onTabChange }: TabNavigationProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex space-x-2 p-4 bg-secondary/20 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab)}
          className={cn(
            "px-4 py-2 rounded-md transition-all duration-300",
            activeTab.id === tab.id
              ? "gradient-border bg-primary/20 text-primary"
              : "hover:bg-secondary/40 text-muted-foreground"
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon} {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
};