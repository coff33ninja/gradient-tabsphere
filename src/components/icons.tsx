import {
  Activity,
  Book,
  Download,
  Film,
  Languages,
  Music,
  Play,
  Search,
  Tv,
  Inbox,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  activity: Activity,
  book: Book,
  download: Download,
  film: Film,
  languages: Languages,
  music: Music,
  play: Play,
  search: Search,
  tv: Tv,
  inbox: Inbox,
} as const;