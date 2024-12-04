export const searchEngines = [
  { name: 'Google', url: 'https://www.google.com/search?q=', icon: '🔍' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: '🔎' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🦆' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=', icon: '📺' },
  { name: 'Reddit', url: 'https://www.reddit.com/search/?q=', icon: '📱' },
  { name: 'ChatGPT', url: 'https://chat.openai.com/?q=', icon: '🤖' },
  { name: "There's an AI for That", url: 'https://theresanaiforthat.com/search/?q=', icon: '🎯' },
  { name: 'Brave', url: 'https://search.brave.com/search?q=', icon: '🦁' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q=', icon: '💻' },
  { name: 'GitHub', url: 'https://github.com/search?q=', icon: '🐙' },
  { name: 'Wikipedia', url: 'https://wikipedia.org/w/index.php?search=', icon: '📚' },
  { name: 'Amazon', url: 'https://www.amazon.com/s?k=', icon: '🛒' },
  { name: 'IMDb', url: 'https://www.imdb.com/find?q=', icon: '🎬' },
  { name: 'Scholar', url: 'https://scholar.google.com/scholar?q=', icon: '🎓' },
  { name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/input?i=', icon: '🧮' }
];

export const handleSearch = (engineUrl: string, query: string) => {
  if (query.trim()) {
    window.open(engineUrl + encodeURIComponent(query), '_blank');
  }
};