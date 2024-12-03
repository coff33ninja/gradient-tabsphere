import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from '@/types';

export const useLinks = () => {
  return useQuery({
    queryKey: ['admin-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });
};