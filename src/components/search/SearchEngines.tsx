export const searchEngines = [
  { name: 'Google', url: 'https://www.google.com/search?q=', icon: '🔍' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: '🔎' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🦆' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=', icon: '📺' },
  { name: 'Reddit', url: 'https://www.reddit.com/search/?q=', icon: '📱' },
  { name: 'ChatGPT', url: 'https://chat.openai.com/?', icon: '🤖' },
  { name: "There's an AI for That", url: 'https://theresanaiforthat.com/search/?q=', icon: '🎯' }
];

export const handleSearch = (engineUrl: string, query: string) => {
  if (query.trim()) {
    window.open(engineUrl + encodeURIComponent(query), '_blank');
  }
};