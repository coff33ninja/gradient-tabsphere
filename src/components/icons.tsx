import {
  Activity,
  BookOpen,
  Download,
  Film,
  Languages,
  Music,
  Play,
  Search,
  Tv,
  Inbox,
  Loader2,
} from "lucide-react";

export const Icons = {
  activity: Activity,
  book: BookOpen,
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