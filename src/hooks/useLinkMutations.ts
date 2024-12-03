import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { scrapeAndDownloadIcon } from '@/scraper';

export const useLinkMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const uploadIconMutation = useMutation({
    mutationFn: async ({ linkId, file }: { linkId: number, file: File }) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${linkId}_icon.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('link_icons')
        .upload(fileName, file, {
          upsert: true
        });
      
      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('link_icons')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('links')
        .update({ icon_url: data.publicUrl })
        .eq('id', linkId);
      
      if (updateError) throw updateError;

      return data.publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-links'] });
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

  const rescrapeMetadataMutation = useMutation({
    mutationFn: async (url: string) => {
      const iconUrl = await scrapeAndDownloadIcon(url);
      return iconUrl;
    },
    onSuccess: async (iconUrl, url) => {
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

  return {
    updateLinkMutation,
    uploadIconMutation,
    rescrapeMetadataMutation
  };
};