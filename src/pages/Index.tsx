import { useState, useEffect } from 'react';
import { TabNavigation } from '@/components/TabNavigation';
import { AppShortcuts } from '@/components/AppShortcuts';
import { Settings } from '@/components/Settings';
import { SearchBar } from '@/components/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tab, AppShortcut } from '@/types';
import { Loader2, MonitorPlay, Film, Radar, Download } from 'lucide-react';

const defaultApps: AppShortcut[] = [
  {
    id: '1',
    name: 'Sonarr',
    icon: '📺',
    url: 'http://localhost:8989'
  },
  {
    id: '2',
    name: 'Radarr',
    icon: '🎬',
    url: 'http://localhost:7878'
  },
  {
    id: '3',
    name: 'Prowlarr',
    icon: '🔍',
    url: 'http://localhost:9696'
  },
  {
    id: '4',
    name: 'qBittorrent',
    icon: '⬇️',
    url: 'http://localhost:8080'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data.map(category => ({
        id: category.id.toString(),
        title: category.name,
        icon: '📁',
        content: `Content for ${category.name}`
      }));
    }
  });

  const { data: links } = useQuery({
    queryKey: ['links', activeTab?.id],
    enabled: !!activeTab?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('category_id', activeTab?.id);
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (categories && categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <SearchBar />
        
        {categories && categories.length > 0 && (
          <TabNavigation 
            tabs={categories} 
            activeTab={activeTab}
            onTabChange={setActiveTab} 
          />
        )}
      </div>

      <AppShortcuts apps={defaultApps} />
      <Settings />
    </div>
  );
};

export default Index;