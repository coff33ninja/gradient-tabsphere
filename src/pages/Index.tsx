import { useState, useEffect } from 'react';
import { TabNavigation } from '@/components/TabNavigation';
import { AppShortcuts } from '@/components/AppShortcuts';
import { Settings } from '@/components/Settings';
import { SearchBar } from '@/components/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tab, AppShortcut } from '@/types';
import { Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-[2000px] mx-auto space-y-4 md:space-y-8">
        <SearchBar />
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {categories && categories.length > 0 && (
            <TabNavigation 
              tabs={categories} 
              activeTab={activeTab}
              onTabChange={setActiveTab} 
            />
          )}
          
          <div className="flex-1 p-4 md:p-6 bg-card rounded-lg shadow-lg animate-fade-in min-h-[calc(100vh-20rem)] md:min-h-[calc(100vh-12rem)]">
            {activeTab && (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-4">{activeTab.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {links?.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {link.icon_url && (
                          <img
                            src={link.icon_url}
                            alt=""
                            className="w-6 h-6 rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = link.icon_backup_url || '/placeholder.svg';
                            }}
                          />
                        )}
                        <div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {link.title}
                          </h3>
                          {link.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {link.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AppShortcuts apps={defaultApps} />
      <Settings />
    </div>
  );
};

export default Index;