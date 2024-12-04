import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tab } from '@/types';
import { Loader2 } from 'lucide-react';
import { TabNavigation } from './TabNavigation';

interface CategoryListProps {
  activeTab: Tab | null;
  setActiveTab: (tab: Tab | null) => void;
}

export const CategoryList = ({ activeTab, setActiveTab }: CategoryListProps) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data.map(category => ({
        id: category.id.toString(),
        title: category.name,
        icon: '📁',
        content: `Content for ${category.name}`
      }));
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return categories && categories.length > 0 ? (
    <TabNavigation 
      tabs={categories} 
      activeTab={activeTab}
      onTabChange={setActiveTab} 
    />
  ) : null;
};