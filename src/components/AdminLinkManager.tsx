import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, RefreshCw, Edit } from 'lucide-react';
import { scrapeAndDownloadIcon } from '@/scraper';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@/types';
import { LinkEditor } from './admin/LinkEditor';
import { LinkDisplay } from './admin/LinkDisplay';

export const AdminLinkManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  // Fetch links
  const { data: links, isLoading } = useQuery({
    queryKey: ['admin-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  // Mutation for updating link
  const updateLinkMutation = useMutation({
    mutationFn: async (updatedLink: Partial<Link>) => {
      const { error } = await supabase
        .from('links')
        .update(updatedLink)
        .eq('id', updatedLink.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-links'] });
      setEditingLink(null);
      toast({
        title: 'Link Updated',
        description: 'Link metadata has been successfully updated.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error Updating Link',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  });

  // Icon upload mutation
  const uploadIconMutation = useMutation({
    mutationFn: async ({ linkId, file }: { linkId: number, file: File }) => {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${linkId}_icon.${fileExt}`;
      
      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('link_icons')
        .upload(fileName, file, {
          upsert: true
        });
      
      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('link_icons')
        .getPublicUrl(fileName);

      // Update link with new icon URL
      const { error: updateError } = await supabase
        .from('links')
        .update({ icon_url: data.publicUrl })
        .eq('id', linkId);
      
      if (updateError) throw updateError;

      return data.publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-links'] });
      setIconFile(null);
      toast({
        title: 'Icon Uploaded',
        description: 'Link icon has been successfully updated.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error Uploading Icon',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  });

  // Rescrape link metadata
  const rescrapeMetadataMutation = useMutation({
    mutationFn: async (url: string) => {
      const iconUrl = await scrapeAndDownloadIcon(url);
      return iconUrl;
    },
    onSuccess: async (iconUrl, url) => {
      // Update link with new scraped metadata
      const { error } = await supabase
        .from('links')
        .update({ 
          icon_url: iconUrl, 
          last_scraped_at: new Date().toISOString() 
        })
        .eq('url', url);
      
      queryClient.invalidateQueries({ queryKey: ['admin-links'] });
      
      toast({
        title: 'Metadata Refreshed',
        description: 'Link metadata has been successfully rescraped.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error Rescaping Metadata',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  });

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
  };

  const handleSaveLink = () => {
    if (editingLink) {
      updateLinkMutation.mutate({
        id: editingLink.id,
        title: editingLink.title,
        url: editingLink.url,
        description: editingLink.description
      });
    }
  };

  const handleIconUpload = (link: Link) => {
    if (iconFile) {
      uploadIconMutation.mutate({ 
        linkId: link.id, 
        file: iconFile 
      });
    }
  };

  const handleRescrape = (url: string) => {
    rescrapeMetadataMutation.mutate(url);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Admin Link Management</h2>
      {links?.map((link) => (
        <div 
          key={link.id} 
          className="border rounded-lg p-4 mb-4 bg-white/5 backdrop-blur-sm"
        >
          {editingLink?.id === link.id ? (
            <LinkEditor
              link={editingLink}
              onSave={handleSaveLink}
              onCancel={() => setEditingLink(null)}
              onChange={setEditingLink}
            />
          ) : (
            <LinkDisplay
              link={link}
              onEdit={() => handleEditLink(link)}
              onRescrape={() => handleRescrape(link.url || '')}
              onIconFileChange={setIconFile}
              onIconUpload={() => handleIconUpload(link)}
              iconFile={iconFile}
            />
          )}
        </div>
      ))}
    </div>
  );
};