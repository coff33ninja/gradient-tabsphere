import { Tab, AppShortcut } from '../types';

export const mockTabs: Tab[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: '🏠',
    content: 'Welcome to your dashboard!'
  },
  {
    id: '2',
    title: 'Media',
    icon: '🎬',
    content: 'Your media collection'
  },
  {
    id: '3',
    title: 'Downloads',
    icon: '⬇️',
    content: 'Active downloads'
  }
];

export const mockApps: AppShortcut[] = [
  {
    id: '1',
    name: 'Sonarr',
    icon: '📺',
    url: 'http://localhost:8989'
  },
  {
    id: '2',
    name: 'Radarr',
    icon: '🎬',
    url: 'http://localhost:7878'
  },
  {
    id: '3',
    name: 'qBittorrent',
    icon: '⬇️',
    url: 'http://localhost:8080'
  }
];