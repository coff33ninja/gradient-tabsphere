import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RoleBasedContent } from '@/components/RoleBasedContent';
import { Link } from '@/types';
import { Icons } from '@/components/icons'; // Add this import

interface LinkDisplayProps {
  link: Link;
  categoryName?: string;
  onEdit: () => void;
  onDelete?: () => void;
  onRescrape: () => void;
  onIconFileChange: (file: File | null) => void;
  onIconUpload: () => void;
  iconFile: File | null;
}

export const LinkDisplay = ({ 
  link, 
  categoryName,
  onEdit, 
  onDelete,
  onRescrape, 
  onIconFileChange,
  onIconUpload,
  iconFile 
}: LinkDisplayProps) => {
  return (
    <div className="flex items-center justify-between p-4 admin-card">
      <div className="flex items-start space-x-4">
        <div>
          <h3 className="font-semibold">{link.title}</h3>
          <p className="text-muted-foreground">{link.url}</p>
          {categoryName && (
            <Badge variant="secondary" className="mt-2">
              {categoryName}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <RoleBasedContent allowedRoles={['admin']}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onEdit}
            className="hover-glow-button"
            title="Edit Link"
          >
            <Icons.edit className="h-4 w-4" />
          </Button>
          {onDelete && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onDelete}
              className="hover-glow-button text-destructive"
              title="Delete Link"
            >
              <Icons.trash className="h-4 w-4" />
            </Button>
          )}
        </RoleBasedContent>
        <RoleBasedContent allowedRoles={['admin', 'moderator']}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onRescrape}
            className="hover-glow-button"
            title="Rescrape Metadata"
          >
            <Icons.refresh className="h-4 w-4" />
          </Button>
          <div>
            <Input 
              type="file" 
              accept="image/*"
              onChange={(e) => onIconFileChange(e.target.files?.[0] || null)}
              className="hidden"
              id={`icon-upload-${link.id}`}
            />
            <label htmlFor={`icon-upload-${link.id}`}>
              <Button 
                variant="outline" 
                size="icon"
                className="hover-glow-button"
                title="Upload Icon"
              >
                <Icons.upload className="h-4 w-4" />
              </Button>
            </label>
            {iconFile && (
              <Button 
                onClick={onIconUpload}
                className="ml-2 hover-glow-button"
              >
                Save Icon
              </Button>
            )}
          </div>
        </RoleBasedContent>
      </div>
    </div>
  );
};