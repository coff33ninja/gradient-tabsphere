import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, RefreshCw, Upload, Trash2 } from 'lucide-react';
import { RoleBasedContent } from '@/components/RoleBasedContent';
import { Link } from '@/types';

interface LinkDisplayProps {
  link: Link;
  onEdit: () => void;
  onDelete?: () => void;
  onRescrape: () => void;
  onIconFileChange: (file: File | null) => void;
  onIconUpload: () => void;
  iconFile: File | null;
}

export const LinkDisplay = ({ 
  link, 
  onEdit, 
  onDelete,
  onRescrape, 
  onIconFileChange,
  onIconUpload,
  iconFile 
}: LinkDisplayProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-semibold">{link.title}</h3>
          <p className="text-muted-foreground">{link.url}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <RoleBasedContent allowedRoles={['admin']}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onEdit}
            title="Edit Link"
          >
            <Edit className="h-4 w-4" />
          </Button>
          {onDelete && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onDelete}
              className="text-destructive"
              title="Delete Link"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </RoleBasedContent>
        <RoleBasedContent allowedRoles={['admin', 'moderator']}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onRescrape}
            title="Rescrape Metadata"
          >
            <RefreshCw className="h-4 w-4" />
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
                title="Upload Icon"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </label>
            {iconFile && (
              <Button 
                onClick={onIconUpload}
                className="ml-2"
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