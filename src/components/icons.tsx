import {
  ActivitySquare,
  BookText,
  Download,
  FileDown,
  Globe,
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
  activity: ActivitySquare,
  book: BookText,
  download: Download,
  file: FileDown,
  globe: Globe,
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