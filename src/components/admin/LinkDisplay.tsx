import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RoleBasedContent } from '@/components/RoleBasedContent';
import { Link } from '@/types';

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
    <div className="flex items-center justify-between">
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
            title="Edit Link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Button>
          {onDelete && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onDelete}
              className="text-destructive"
              title="Delete Link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
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