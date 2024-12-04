import {
  Activity,
  BookText,
  Download,
  Film,
  Languages,
  Music2 as Music,
  Play,
  Search,
  Tv2 as Tv,
  Inbox,
  Loader2,
} from "lucide-react";

export const Icons = {
  activity: Activity,
  book: BookText,
  download: Download,
  film: Film,
  languages: Languages,
  music: Music,
  play: Play,
  search: Search,
  tv: Tv,
  inbox: Inbox,
  spinner: Loader2,
} as const;

export type Icon = keyof typeof Icons;