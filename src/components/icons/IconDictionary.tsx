import React from 'react';
import { useIconMetadata } from '@/hooks/useIconMetadata';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const defaultIconProps: React.SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconDictionary = {
  ChevronDown: ({ className, ...props }: IconProps) => (
    <svg {...defaultIconProps} className={className} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  ChevronUp: ({ className, ...props }: IconProps) => (
    <svg {...defaultIconProps} className={className} {...props}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  ),
  Check: ({ className, ...props }: IconProps) => (
    <svg {...defaultIconProps} className={className} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Search: ({ className, ...props }: IconProps) => (
    <svg {...defaultIconProps} className={className} {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Plus: ({ className, ...props }: IconProps) => (
    <svg {...defaultIconProps} className={className} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Menu: ({ className, ...props }: IconProps) => (
    <svg {...defaultIconProps} className={className} {...props}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
};

export const IconMetadataDisplay = () => {
  const { data: icons, isLoading } = useIconMetadata();

  if (isLoading) return <div>Loading icons metadata...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {icons?.map((icon) => (
        <div key={icon.id} className="p-4 border rounded-lg">
          <h3 className="font-medium">{icon.name}</h3>
          <p className="text-sm text-muted-foreground">{icon.description}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Category: {icon.category}
          </p>
          <p className="text-xs text-muted-foreground">
            Path: {icon.file_path}
          </p>
        </div>
      ))}
    </div>
  );
};

export type IconName = keyof typeof IconDictionary;