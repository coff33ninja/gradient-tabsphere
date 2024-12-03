import { useState } from 'react';
import { Search } from 'lucide-react';
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

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const { data: searchResults } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      
      const { data: links } = await supabase
        .from('links')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5);
      
      return links || [];
    },
    enabled: query.length > 2
  });

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative flex gap-2 items-center">
        <div className="relative flex-1 gradient-border">
          <input
            type="text"
            placeholder="Search anywhere..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/40 backdrop-blur-sm 
                     border border-white/10 focus:border-primary/50 focus:ring-2 
                     focus:ring-primary/20 outline-none transition-all duration-300
                     text-lg placeholder:text-muted-foreground/50"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchEngines[0].url, query);
              }
            }}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
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
              <Search className="h-5 w-5" />
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