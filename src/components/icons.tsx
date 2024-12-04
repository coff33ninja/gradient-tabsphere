import {
  ActivitySquare,
  BookText,
  Download,
  Film,
  Languages as LanguagesIcon,
  Music2,
  Play,
  Search,
  Tv2,
  Inbox,
  Loader2,
} from "lucide-react";

export const Icons = {
  activity: ActivitySquare,
  book: BookText,
  download: Download,
  film: Film,
  languages: LanguagesIcon,
  music: Music2,
  play: Play,
  search: Search,
  tv: Tv2,
  inbox: Inbox,
  spinner: Loader2,
} as const;

export type Icon = keyof typeof Icons;