import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tab } from '@/types';
import { Icons } from './icons';
import { AddLinkForm } from './admin/AddLinkForm';
import { RoleBasedContent } from './RoleBasedContent';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState } from 'react';

interface LinkGridProps {
  activeTab: Tab | null;
}

export const LinkGrid = ({ activeTab }: LinkGridProps) => {
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  
  const { data: links = [], refetch } = useQuery({
    queryKey: ['links', activeTab?.id],
    enabled: !!activeTab?.id,
    queryFn: async () => {
      if (!activeTab?.id) return [];
      
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('category_id', parseInt(activeTab.id));
      
      if (error) throw error;
      return data || [];
    }
  });

  if (!activeTab) return null;

  return (
    <div className="flex-1 p-4 md:p-6 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg animate-fade-in min-h-[calc(100vh-20rem)] md:min-h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          {activeTab.title}
        </h2>
        <RoleBasedContent allowedRoles={['admin', 'moderator']}>
          <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Icons.plus className="h-4 w-4" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Link to {activeTab.title}</DialogTitle>
              </DialogHeader>
              <AddLinkForm 
                categoryId={parseInt(activeTab.id)} 
                onSuccess={() => {
                  refetch();
                  setIsAddLinkOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </RoleBasedContent>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {links?.map((link) => (
          <a
            key={link.id}
            href={link.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group border border-white/20 hover:border-white/30 shadow-lg"
          >
            <div className="flex items-center gap-3">
              {link.icon_url ? (
                <img 
                  src={link.icon_url}
                  alt=""
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (link.icon_backup_url) {
                      target.src = link.icon_backup_url;
                    } else {
                      target.style.display = 'none';
                      target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }
                  }}
                />
              ) : (
                <Icons.globe className="w-5 h-5 text-muted-foreground fallback-icon" />
              )}
              <div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                {link.description && (
                  <p className="text-sm text-muted-foreground/90 line-clamp-2">
                    {link.description}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              {link.last_scraped_at && (
                <span className="flex items-center gap-1">
                  <Icons.refresh className="w-3 h-3" />
                  {new Date(link.last_scraped_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
