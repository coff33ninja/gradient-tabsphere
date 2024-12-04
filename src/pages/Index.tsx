import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { CategoryList } from '@/components/CategoryList';
import { LinkGrid } from '@/components/LinkGrid';
import { Tab } from '@/types';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400/20 via-pink-500/20 to-purple-600/20 pt-16">
      <div className="max-w-[2000px] mx-auto space-y-4 md:space-y-8 p-4 md:p-8">
        <SearchBar />
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <CategoryList 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <LinkGrid activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Index;