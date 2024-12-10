import { useState } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { searchEngines, handleSearch } from './search/SearchEngines';
import { SearchResults } from './search/SearchResults';
import { Link } from '@/types';
import { Icons } from './icons';

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const { data: searchResults = [] } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      
      const { data: links } = await supabase
        .from('links')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5);
      
      return (links || []) as Link[];
    },
    enabled: query.length > 2
  });

  return (
    <div className="search-container">
      <div className="relative flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search anywhere..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchEngines[0].url, query);
              }
            }}
          />
          <Icons.search className="search-icon" />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="h-12 w-12 rounded-lg bg-background/40 backdrop-blur-sm 
                       border border-white/10 hover:bg-white/10 
                       transition-all duration-300"
            >
              <Icons.search className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-sm border border-white/10">
            {searchEngines.map((engine) => (
              <DropdownMenuItem
                key={engine.name}
                onClick={() => handleSearch(engine.url, query)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <span className="text-lg">{engine.icon}</span>
                <span>Search with {engine.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SearchResults results={searchResults} />
    </div>
  );
};