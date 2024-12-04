import {
  Activity,
  Book,
  Download as DownloadIcon,
  Film as FilmIcon,
  Languages as LanguagesIcon,
  Music,
  Play as PlayIcon,
  Search,
  Tv,
  Inbox as InboxIcon,
  Loader2,
} from "lucide-react";

export const Icons = {
  activity: Activity,
  book: Book,
  download: DownloadIcon,
  film: FilmIcon,
  languages: LanguagesIcon,
  music: Music,
  play: PlayIcon,
  search: Search,
  tv: Tv,
  inbox: InboxIcon,
  spinner: Loader2,
} as const;

export type Icon = keyof typeof Icons;