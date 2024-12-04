import {
  Activity,
  BookOpen,
  Download as DownloadIcon,
  FileDown,
  Globe2,
  Languages as LanguagesIcon,
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
  book: BookOpen,
  download: DownloadIcon,
  file: FileDown,
  globe: Globe2,
  languages: LanguagesIcon,
  music: Music2,
  play: PlayCircle,
  search: Search,
  tv: Tv2,
  inbox: Inbox,
  spinner: Loader2,
  refresh: RefreshCw,
} as const;

export type Icon = keyof typeof Icons;