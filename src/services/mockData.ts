import { Tab, AppShortcut } from '../types';

export const mockTabs: Tab[] = [
  {
    id: '1',
    title: 'Dashboard',
    content: 'Welcome to your dashboard!'
  },
  {
    id: '2',
    title: 'Media',
    content: 'Your media collection'
  },
  {
    id: '3',
    title: 'Downloads',
    content: 'Active downloads'
  }
];

export const mockApps: AppShortcut[] = [
  {
    id: '1',
    name: 'Sonarr',
    url: 'http://localhost:8989'
  },
  {
    id: '2',
    name: 'Radarr',
    url: 'http://localhost:7878'
  },
  {
    id: '3',
    name: 'qBittorrent',
    url: 'http://localhost:8080'
  }
];