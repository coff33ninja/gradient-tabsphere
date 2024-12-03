import { Link } from '@/types';

interface SearchResultsProps {
  results: Link[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="absolute w-full mt-2 bg-background/95 backdrop-blur-sm rounded-lg 
                  border border-white/10 shadow-lg overflow-hidden z-50 
                  animate-in fade-in-0 zoom-in-95">
      {results.map((result) => (
        <a
          key={result.id}
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
        >
          <div className="flex items-center gap-3">
            {result.icon_url && (
              <img 
                src={result.icon_url} 
                alt="" 
                className="w-6 h-6 rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = result.icon_backup_url || '/placeholder.svg';
                }}
              />
            )}
            <div>
              <h4 className="font-medium text-foreground/90">{result.title}</h4>
              {result.description && (
                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                  {result.description}
                </p>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};