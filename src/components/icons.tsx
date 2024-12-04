import {
  Activity,
  Book,
  Download,
  File,
  Globe,
  Languages,
  Music,
  Play,
  Search,
  Tv,
  Inbox,
  Loader2,
  RefreshCw,
} from "lucide-react";

export const Icons = {
  activity: Activity,
  book: Book,
  download: Download,
  file: File,
  globe: Globe,
  languages: Languages,
  music: Music,
  play: Play,
  search: Search,
  tv: Tv,
  inbox: Inbox,
  spinner: Loader2,
  refresh: RefreshCw,
} as const;

export type Icon = keyof typeof Icons;