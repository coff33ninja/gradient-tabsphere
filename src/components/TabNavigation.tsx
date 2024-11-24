import { Tab } from '../types';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: Tab | null;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-secondary/20 rounded-lg">
      {tabs.map((tab) => (
        <DropdownMenu key={tab.id}>
          <DropdownMenuTrigger asChild>
            <button
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
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[300px] p-2">
            <ScrollArea className="h-[300px]">
              <div className="grid gap-2">
                {tab.content && (
                  <div className="p-2 text-sm text-muted-foreground">
                    {tab.content}
                  </div>
                )}
              </div>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
};