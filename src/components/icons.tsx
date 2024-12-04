import {
  ActivitySquare,
  BookOpen,
  Download as DownloadIcon,
  FileDown as FileDownIcon,
  Globe,
  Languages as LanguagesIcon,
  Music2 as MusicIcon,
  PlayCircle as PlayIcon,
  Search as SearchIcon,
  Tv,
  Inbox as InboxIcon,
  Loader2,
  RefreshCw,
} from "lucide-react";

export const Icons = {
  activity: ActivitySquare,
  book: BookOpen,
  download: DownloadIcon,
  file: FileDownIcon,
  globe: Globe,
  languages: LanguagesIcon,
  music: MusicIcon,
  play: PlayIcon,
  search: SearchIcon,
  tv: Tv,
  inbox: InboxIcon,
  spinner: Loader2,
  refresh: RefreshCw,
} as const;

export type Icon = keyof typeof Icons;