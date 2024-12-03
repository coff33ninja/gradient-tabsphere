export interface Tab {
  id: string;
  title: string;
  icon?: string;
  content?: string;
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

export interface Link {
  id: number;
  title: string | null;
  url: string | null;
  description: string | null;
  icon_url: string | null;
  category_id: number | null;
}