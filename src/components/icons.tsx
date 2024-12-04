import {
  ActivitySquare,
  BookText,
  Download as DownloadIcon,
  FileDown,
  Globe,
  Languages as LanguagesIcon,
  Music2,
  PlayCircle,
  Search,
  Tv2,
  InboxIcon,
  Loader2,
  RefreshCw,
} from "lucide-react";

export const Icons = {
  activity: ActivitySquare,
  book: BookText,
  download: DownloadIcon,
  file: FileDown,
  globe: Globe,
  languages: LanguagesIcon,
  music: Music2,
  play: PlayCircle,
  search: Search,
  tv: Tv2,
  inbox: InboxIcon,
  spinner: Loader2,
  refresh: RefreshCw,
} as const;

export type Icon = keyof typeof Icons;