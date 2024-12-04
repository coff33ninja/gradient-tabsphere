import type { Database } from "@/integrations/supabase/types";

type ServiceType = Database["public"]["Enums"]["service_type"];

export interface ServiceConfig {
  defaultPort: number;
  requiresApiKey: boolean;
  requiresAuth: boolean;
  baseUrlPath?: string;
  category: ServiceCategory;
  icon: string;
}

export type ServiceCategory = 
  | "Media Management"
  | "Download Clients"
  | "Indexers"
  | "Media Servers"
  | "Monitoring";

export const SERVICE_CONFIGS: Record<ServiceType, ServiceConfig> = {
  // Media Management
  sonarr: { defaultPort: 8989, requiresApiKey: true, requiresAuth: false, category: "Media Management", icon: "tv" },
  radarr: { defaultPort: 7878, requiresApiKey: true, requiresAuth: false, category: "Media Management", icon: "film" },
  lidarr: { defaultPort: 8686, requiresApiKey: true, requiresAuth: false, category: "Media Management", icon: "music" },
  readarr: { defaultPort: 8787, requiresApiKey: true, requiresAuth: false, category: "Media Management", icon: "book" },
  bazarr: { defaultPort: 6767, requiresApiKey: true, requiresAuth: false, category: "Media Management", icon: "languages" },
  
  // Download Clients
  qbittorrent: { defaultPort: 8080, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/api', category: "Download Clients", icon: "download" },
  transmission: { defaultPort: 9091, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/transmission/rpc', category: "Download Clients", icon: "download" },
  deluge: { defaultPort: 8112, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/json', category: "Download Clients", icon: "download" },
  rtorrent: { defaultPort: 8000, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/RPC2', category: "Download Clients", icon: "download" },
  nzbget: { defaultPort: 6789, requiresApiKey: false, requiresAuth: true, category: "Download Clients", icon: "download" },
  sabnzbd: { defaultPort: 8080, requiresApiKey: true, requiresAuth: false, category: "Download Clients", icon: "download" },
  
  // Indexers
  prowlarr: { defaultPort: 9696, requiresApiKey: true, requiresAuth: false, category: "Indexers", icon: "search" },
  jackett: { defaultPort: 9117, requiresApiKey: true, requiresAuth: false, category: "Indexers", icon: "search" },
  
  // Media Servers
  plex: { defaultPort: 32400, requiresApiKey: true, requiresAuth: false, category: "Media Servers", icon: "play" },
  jellyfin: { defaultPort: 8096, requiresApiKey: true, requiresAuth: false, category: "Media Servers", icon: "play" },
  emby: { defaultPort: 8096, requiresApiKey: true, requiresAuth: false, category: "Media Servers", icon: "play" },
  
  // Monitoring
  tautulli: { defaultPort: 8181, requiresApiKey: true, requiresAuth: false, category: "Monitoring", icon: "activity" },
  overseerr: { defaultPort: 5055, requiresApiKey: true, requiresAuth: false, category: "Monitoring", icon: "inbox" },
  ombi: { defaultPort: 5000, requiresApiKey: true, requiresAuth: false, category: "Monitoring", icon: "inbox" }
};