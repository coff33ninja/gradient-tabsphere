import { Tab } from '../types';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from './LoadingSpinner';

interface CategoryListProps {
  categories: any[];
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
    return <LoadingSpinner />;
  }

  return (
    <nav className="tab-navigation">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={cn(
            "tab-button",
            activeCategory === category.id && "active"
          )}
        >
          <span className="relative z-10 break-words">
            {category.name}
          </span>
        </button>
      ))}
    </nav>
  );
};