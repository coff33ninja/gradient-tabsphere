import {
  Activity,
  BookText,
  Download,
  FileDown,
  Globe2,
  Languages,
  Music2,
  PlayCircle,
  Search,
  Tv2,
  Inbox,
  Loader2,
  RefreshCw,
} from "lucide-react";

export const Icons = {
  activity: Activity,
  book: BookText,
  download: Download,
  file: FileDown,
  globe: Globe2,
  languages: Languages,
  music: Music2,
  play: PlayCircle,
  search: Search,
  tv: Tv2,
  inbox: Inbox,
  spinner: Loader2,
  refresh: RefreshCw,
} as const;

export type Icon = keyof typeof Icons;