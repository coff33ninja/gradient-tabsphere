import {
  Activity,
  BookOpen,
  Download,
  Film,
  Languages as LanguagesIcon,
  Music,
  Play,
  Search,
  Tv2,
  Inbox,
  Loader2,
} from "lucide-react";

export const Icons = {
  activity: Activity,
  book: BookOpen,
  download: Download,
  film: Film,
  languages: LanguagesIcon,
  music: Music,
  play: Play,
  search: Search,
  tv: Tv2,
  inbox: Inbox,
  spinner: Loader2,
} as const;

export type Icon = keyof typeof Icons;