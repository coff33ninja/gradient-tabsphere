import {
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Plus,
  Search,
  Globe,
  Refresh,
  LogIn,
  Menu,
} from "lucide-react";

export const Icons = {
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  check: Check,
  x: X,
  plus: Plus,
  search: Search,
  globe: Globe,
  refresh: Refresh,
  login: LogIn,
  menu: Menu,
} as const;

export type Icon = keyof typeof Icons;
