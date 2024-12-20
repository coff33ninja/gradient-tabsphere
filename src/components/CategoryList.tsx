import { cn } from '@/lib/utils';
import { Icons } from './icons';
import '@/styles/animations.css';

type Category = {
  id: number;
  name: string;
  icon_url?: string | null;
};

type CategoryListProps = {
  categories: Category[];
  isLoading: boolean;
  activeCategory: number | null;
  onCategorySelect: (categoryId: number) => void;
}

export const CategoryList = ({ 
  categories, 
  isLoading, 
  activeCategory,
  onCategorySelect 
}: CategoryListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-1 w-full bg-secondary/20 p-4 rounded-lg md:h-[calc(100vh-12rem)] h-[calc(100vh-20rem)] overflow-y-auto">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex items-center gap-2 px-4 py-3 rounded-md bg-white/5"
          >
            <div className="w-5 h-5 rounded-full bg-white/10" />
            <div className="h-4 w-24 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full bg-secondary/20 p-4 rounded-lg md:h-[calc(100vh-12rem)] h-[calc(100vh-20rem)]">
        <Icons.folder className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">No categories found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 w-full bg-secondary/20 p-4 rounded-lg md:h-[calc(100vh-12rem)] h-[calc(100vh-20rem)] overflow-y-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={cn(
            "hover-glow-button w-full px-4 py-3 rounded-md text-left flex items-center gap-2 transition-all duration-300",
            activeCategory === category.id
              ? "bg-primary/20 text-primary relative gradient-border"
              : "text-muted-foreground hover:bg-white/5"
          )}
        >
          {category.icon_url ? (
            <img 
              src={category.icon_url} 
              alt="" 
              className="w-5 h-5 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <Icons.folder className="w-5 h-5" />
          )}
          <span className="relative z-10 truncate">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};