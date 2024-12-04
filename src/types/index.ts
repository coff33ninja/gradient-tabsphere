export interface Tab {
  id: string;
  title: string;
  content?: string;
}

export interface AppShortcut {
  id: string;
  name: string;
  url: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface Link {
  id: number;
  title: string | null;
  url: string | null;
  description: string | null;
  category_id: number | null;
}