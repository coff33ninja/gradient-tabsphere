export interface Tab {
  id: string;
  title: string;
  icon?: string;
  content: string;
}

export interface AppShortcut {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
}