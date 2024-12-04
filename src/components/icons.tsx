import {
  ActivitySquare,
  BookOpen,
  Download,
  Film,
  Languages,
  Music,
  Play,
  Search,
  Tv2,
  Inbox,
  Loader2,
} from "lucide-react";

export const Icons = {
  activity: ActivitySquare,
  book: BookOpen,
  download: Download,
  film: Film,
  languages: Languages,
  music: Music,
  play: Play,
  search: Search,
  tv: Tv2,
  inbox: Inbox,
  spinner: Loader2,
} as const;

export type Icon = keyof typeof Icons;