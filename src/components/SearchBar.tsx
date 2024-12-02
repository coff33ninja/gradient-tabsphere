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

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const searchEngines = [
    { name: 'Google', url: 'https://www.google.com/search?q=' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
    { name: 'Reddit', url: 'https://www.reddit.com/search/?q=' },
    { name: 'ChatGPT', url: 'https://chat.openai.com/?' },
    { name: "There's an AI for That", url: 'https://theresanaiforthat.com/search/?q=' }
  ];

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

  const handleSearch = (engineUrl: string) => {
    if (query.trim()) {
      window.open(engineUrl + encodeURIComponent(query), '_blank');
    }
  };

  return (
    <div className="relative flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gradient-to-r from-purple-400/10 to-pink-500/10 border border-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchEngines[0].url);
            }
          }}
        />
        {searchResults && searchResults.length > 0 && (
          <div className="absolute w-full mt-1 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-secondary z-50">
            {searchResults.map((result) => (
              <a
                key={result.id}
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {result.icon_url && (
                    <img src={result.icon_url} alt="" className="w-4 h-4" />
                  )}
                  <div>
                    <h4 className="font-medium">{result.title}</h4>
                    {result.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {result.description}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="bg-gradient-to-r from-purple-400/20 to-pink-500/20 hover:from-purple-400/30 hover:to-pink-500/30"
          >
            <Search className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {searchEngines.map((engine) => (
            <DropdownMenuItem
              key={engine.name}
              onClick={() => handleSearch(engine.url)}
              className="cursor-pointer"
            >
              Search with {engine.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};