import {
  ActivitySquare,
  BookText,
  Download,
  Film,
  Languages,
  Music2,
  Play,
  Search,
  Tv,
  Inbox,
  Loader2,
} from "lucide-react";

export const Icons = {
  activity: ActivitySquare,
  book: BookText,
  download: Download,
  film: Film,
  languages: Languages,
  music: Music2,
  play: Play,
  search: Search,
  tv: Tv,
  inbox: Inbox,
  spinner: Loader2,
} as const;

export type Icon = keyof typeof Icons;