import {
  ActivitySquare,
  BookOpen,
  Download,
  FileDown,
  Globe,
  Languages,
  Music2,
  PlayCircle,
  Search,
  Tv,
  Inbox,
  Loader2,
  RefreshCw,
} from "lucide-react";

export const Icons = {
  activity: ActivitySquare,
  book: BookOpen,
  download: Download,
  file: FileDown,
  globe: Globe,
  languages: Languages,
  music: Music2,
  play: PlayCircle,
  search: Search,
  tv: Tv,
  inbox: Inbox,
  spinner: Loader2,
  refresh: RefreshCw,
} as const;

export type Icon = keyof typeof Icons;