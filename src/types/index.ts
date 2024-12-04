export interface Tab {
  id: string;
  title: string;
  content?: string;
  icon?: string;
}

export interface AppShortcut {
  id: string;
  name: string;
  url: string;
  icon?: string;
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
  icon_url?: string | null;
  icon_backup_url?: string | null;
  last_scraped_at?: string | null;
  scraping_error?: string | null;
}

export interface Category {
  id: number;
  name: string;
}