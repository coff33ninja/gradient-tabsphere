import { useState } from 'react';
import { TabNavigation } from '@/components/TabNavigation';
import { AppShortcuts } from '@/components/AppShortcuts';
import { Settings } from '@/components/Settings';
import { mockTabs, mockApps } from '@/services/mockData';
import { Tab } from '@/types';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>(mockTabs[0]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <TabNavigation tabs={mockTabs} onTabChange={setActiveTab} />
        
        <div className="p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{activeTab.title}</h2>
          <p className="text-muted-foreground">{activeTab.content}</p>
        </div>
      </div>

      <AppShortcuts apps={mockApps} />
      <Settings />
    </div>
  );
};

export default Index;