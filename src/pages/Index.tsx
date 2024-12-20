import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SearchBar } from '@/components/SearchBar';
import { CategoryList } from '@/components/CategoryList';
import { LinkGrid } from '@/components/LinkGrid';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: services = [], isLoading: isServicesLoading } = useQuery({
    queryKey: ['credentials'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('credentials')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

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
                isLoading={isLoading}
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
            "flex-1",
            !activeCategory && 'hidden md:block'
          )}>
            {activeTab ? (
              <LinkGrid activeTab={activeTab} />
            ) : (
              !isCategoryMenuOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
                  {services.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                      <Icons.alert className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-muted-foreground">
                        No services found
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Sign in to add and manage your services
                      </p>
                    </div>
                  ) : (
                    services.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-white/10 hover:border-white/20"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                              {service.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {service.service}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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