import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface Link {
  id: number;
  title: string | null;
  url: string | null;
  description: string | null;
}

interface LinkEditorProps {
  link: Link;
  onSave: () => void;
  onCancel: () => void;
  onChange: (updatedLink: Link) => void;
}

export const LinkEditor = ({ link, onSave, onCancel, onChange }: LinkEditorProps) => {
  return (
    <div className="space-y-4">
      <Input 
        value={link.title || ''} 
        onChange={(e) => onChange({...link, title: e.target.value})}
        placeholder="Link Title"
      />
      <Input 
        value={link.url || ''} 
        onChange={(e) => onChange({...link, url: e.target.value})}
        placeholder="URL"
      />
      <Textarea 
        value={link.description || ''} 
        onChange={(e) => onChange({...link, description: e.target.value})}
        placeholder="Description"
      />
      <div className="flex space-x-2">
        <Button 
          onClick={onSave}
          className="flex items-center gap-2"
        >
          <Check className="h-4 w-4" /> Save
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" /> Cancel
        </Button>
      </div>
    </div>
  );
};