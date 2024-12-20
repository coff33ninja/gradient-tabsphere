import { ThemeManager } from './ThemeManager';
import { LinkManager } from './LinkManager';
import { ServiceGrid } from '../services/ServiceGrid';
import { IconManager } from './IconManager';
import { Tab } from '@/types';

interface AdminContentProps {
  activeTab: Tab | null;
  credentials: any[];
}

export const AdminContent = ({ activeTab, credentials }: AdminContentProps) => {
  if (!activeTab) return null;

  const renderContent = () => {
    switch (activeTab.id) {
      case "theme":
        return <ThemeManager />;
      case "links":
        return <LinkManager />;
      case "services":
        return <ServiceGrid credentials={credentials || []} />;
      case "icons":
        return <IconManager />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-card animate-fade-in">
      {renderContent()}
    </div>
  );
};