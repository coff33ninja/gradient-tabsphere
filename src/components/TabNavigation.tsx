import { Tab } from '../types';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: Tab | null;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex space-x-2 p-4 bg-secondary/20 rounded-lg overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap",
            activeTab?.id === tab.id
              ? "relative gradient-border bg-primary/20 text-primary"
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