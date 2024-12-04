import { Tab } from '../types';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: Tab | null;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex flex-col space-y-1 w-full md:w-64 bg-secondary/20 p-4 rounded-lg h-[calc(100vh-12rem)] overflow-y-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab)}
          className={cn(
            "w-full px-4 py-3 rounded-md transition-all duration-300 text-left",
            "hover:bg-secondary/40",
            activeTab?.id === tab.id
              ? "bg-primary/20 text-primary relative gradient-border"
              : "text-muted-foreground"
          )}
        >
          <span className="relative z-10 break-words">
            {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
};