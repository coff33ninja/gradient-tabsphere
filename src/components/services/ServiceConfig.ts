import { Icons } from "@/components/icons";

export type ServiceCategory = "Media" | "Downloads" | "Management" | "Tools";

export interface ServiceConfig {
  category: ServiceCategory;
  icon: keyof typeof Icons;
  defaultPort: number;
  requiresApiKey: boolean;
  requiresAuth: boolean;
}

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  sonarr: {
    category: "Media",
    icon: "tv",
    defaultPort: 8989,
    requiresApiKey: true,
    requiresAuth: false
  },
  radarr: {
    category: "Media",
    icon: "play",
    defaultPort: 7878,
    requiresApiKey: true,
    requiresAuth: false
  },
  prowlarr: {
    category: "Tools",
    icon: "search",
    defaultPort: 9696,
    requiresApiKey: true,
    requiresAuth: false
  },
  qbittorrent: {
    category: "Downloads",
    icon: "download",
    defaultPort: 8080,
    requiresApiKey: false,
    requiresAuth: true
  },
  lidarr: {
    category: "Media",
    icon: "music",
    defaultPort: 8686,
    requiresApiKey: true,
    requiresAuth: false
  },
  readarr: {
    category: "Media",
    icon: "book",
    defaultPort: 8787,
    requiresApiKey: true,
    requiresAuth: false
  },
  transmission: {
    category: "Downloads",
    icon: "download",
    defaultPort: 9091,
    requiresApiKey: false,
    requiresAuth: true
  },
  deluge: {
    category: "Downloads",
    icon: "download",
    defaultPort: 8112,
    requiresApiKey: false,
    requiresAuth: true
  },
  rtorrent: {
    category: "Downloads",
    icon: "download",
    defaultPort: 8080,
    requiresApiKey: false,
    requiresAuth: true
  },
  bazarr: {
    category: "Media",
    icon: "languages",
    defaultPort: 6767,
    requiresApiKey: true,
    requiresAuth: false
  },
  nzbget: {
    category: "Downloads",
    icon: "download",
    defaultPort: 6789,
    requiresApiKey: false,
    requiresAuth: true
  },
  sabnzbd: {
    category: "Downloads",
    icon: "download",
    defaultPort: 8080,
    requiresApiKey: true,
    requiresAuth: false
  },
  jackett: {
    category: "Tools",
    icon: "search",
    defaultPort: 9117,
    requiresApiKey: true,
    requiresAuth: false
  },
  plex: {
    category: "Media",
    icon: "play",
    defaultPort: 32400,
    requiresApiKey: true,
    requiresAuth: false
  },
  jellyfin: {
    category: "Media",
    icon: "play",
    defaultPort: 8096,
    requiresApiKey: false,
    requiresAuth: true
  },
  emby: {
    category: "Media",
    icon: "play",
    defaultPort: 8096,
    requiresApiKey: true,
    requiresAuth: false
  },
  tautulli: {
    category: "Management",
    icon: "activity",
    defaultPort: 8181,
    requiresApiKey: true,
    requiresAuth: false
  },
  overseerr: {
    category: "Management",
    icon: "inbox",
    defaultPort: 5055,
    requiresApiKey: true,
    requiresAuth: false
  },
  ombi: {
    category: "Management",
    icon: "inbox",
    defaultPort: 3579,
    requiresApiKey: true,
    requiresAuth: false
  }
};