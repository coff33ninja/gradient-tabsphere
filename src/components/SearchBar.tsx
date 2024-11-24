import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const searchEngines = [
    { name: 'Google', url: 'https://www.google.com/search?q=' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
    { name: 'Reddit', url: 'https://www.reddit.com/search/?q=' },
  ];

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
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/20 border border-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchEngines[0].url);
            }
          }}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {searchEngines.map((engine) => (
            <DropdownMenuItem
              key={engine.name}
              onClick={() => handleSearch(engine.url)}
            >
              Search with {engine.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};