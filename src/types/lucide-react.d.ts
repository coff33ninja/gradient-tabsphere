declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export const AppWindow: FC<IconProps>;
  export const LogIn: FC<IconProps>;
  export const LogOut: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const Settings2: FC<IconProps>;
  export const Edit: FC<IconProps>;
  export const RefreshCw: FC<IconProps>;
  export const Upload: FC<IconProps>;
  export const Trash2: FC<IconProps>;
  export const Check: FC<IconProps>;
  export const X: FC<IconProps>;
  export const User: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const ChevronUp: FC<IconProps>;
  export const Circle: FC<IconProps>;
  export const Dot: FC<IconProps>;
  export const GripVertical: FC<IconProps>;
  export const MoreHorizontal: FC<IconProps>;
  export const ArrowLeft: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
}