import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, RefreshCw, Upload } from 'lucide-react';

interface Link {
  id: number;
  title: string | null;
  url: string | null;
  icon_url: string | null;
}

interface LinkDisplayProps {
  link: Link;
  onEdit: () => void;
  onRescrape: () => void;
  onIconFileChange: (file: File | null) => void;
  onIconUpload: () => void;
  iconFile: File | null;
}

export const LinkDisplay = ({ 
  link, 
  onEdit, 
  onRescrape, 
  onIconFileChange,
  onIconUpload,
  iconFile 
}: LinkDisplayProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {link.icon_url && (
          <img 
            src={link.icon_url} 
            alt="Link Icon" 
            className="w-12 h-12 rounded"
          />
        )}
        <div>
          <h3 className="font-semibold">{link.title}</h3>
          <p className="text-muted-foreground">{link.url}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onEdit}
          title="Edit Link"
        >
          <Edit className="h-4 w-4" />
        </Button>
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
      </div>
    </div>
  );
};