import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SearchBar } from '@/components/SearchBar';
import { CategoryList } from '@/components/CategoryList';
import { LinkGrid } from '@/components/LinkGrid';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tab } from '@/types';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  const { toast } = useToast();
  
  const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  const activeTab = activeCategory ? {
    id: activeCategory.toString(),
    title: categories.find(c => c.id === activeCategory)?.name || ''
  } as Tab : null;

  if (categoriesError) {
    toast({
      title: "Error loading categories",
      description: "Please try again later",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-custom pt-16 pb-36">
      <div className="max-w-[2000px] mx-auto space-y-4 md:space-y-8 p-4 md:p-8">
        <SearchBar />
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 relative">
          {activeCategory && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 md:hidden mb-2"
              onClick={() => setActiveCategory(null)}
            >
              <Icons.chevronLeft className="h-4 w-4" />
              Back to Categories
            </Button>
          )}
          
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            isCategoryMenuOpen ? "md:w-64" : "md:w-0",
            activeCategory ? 'hidden md:block' : 'block'
          )}>
            <div className={cn(
              "relative",
              !isCategoryMenuOpen && "md:hidden"
            )}>
              <CategoryList 
                categories={categories}
                isLoading={isCategoriesLoading}
                activeCategory={activeCategory}
                onCategorySelect={setActiveCategory}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex absolute -right-12 top-2"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          >
            {isCategoryMenuOpen ? (
              <Icons.chevronLeft className="h-4 w-4" />
            ) : (
              <Icons.chevronRight className="h-4 w-4" />
            )}
          </Button>

          <div className={cn(
            "flex-1 transition-all duration-300",
            !activeCategory && 'hidden md:block'
          )}>
            {activeTab ? (
              <LinkGrid activeTab={activeTab} />
            ) : (
              !isCategoryMenuOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
                  <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                    <Icons.folder className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground">
                      Select a category to view links
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Choose a category from the sidebar to view its links
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;