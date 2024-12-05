import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface IconMetadata {
  id: number;
  name: string;
  file_path: string;
  category: 'navigation' | 'action' | 'status' | 'media' | 'social' | 'misc';
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useIconMetadata = () => {
  return useQuery({
    queryKey: ['icon-metadata'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('icon_metadata')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as IconMetadata[];
    }
  });
};