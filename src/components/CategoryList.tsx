import { cn } from '@/lib/utils';
import { Icons } from './icons';

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
      <div className="flex justify-center items-center h-full">
        <Icons.spinner className="animate-spin h-6 w-6" />
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
            "w-full px-4 py-3 rounded-md transition-all duration-300 text-left flex items-center gap-2",
            "hover:bg-secondary/40",
            activeCategory === category.id
              ? "bg-primary/20 text-primary relative gradient-border"
              : "text-muted-foreground"
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
          <span className="relative z-10">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};