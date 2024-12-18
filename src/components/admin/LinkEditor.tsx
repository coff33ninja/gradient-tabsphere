import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@/types';

interface LinkEditorProps {
  link: Link;
  categories: { id: number; name: string; }[];
  onSave: () => void;
  onCancel: () => void;
  onChange: (updatedLink: Link) => void;
}

export const LinkEditor = ({ link, categories, onSave, onCancel, onChange }: LinkEditorProps) => {
  const handleChange = (field: keyof Link, value: any) => {
    onChange({
      ...link,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <Input 
        value={link.title || ''} 
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Link Title"
      />
      <Input 
        value={link.url || ''} 
        onChange={(e) => handleChange('url', e.target.value)}
        placeholder="URL"
      />
      <Textarea 
        value={link.description || ''} 
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Description"
      />
      <Select
        value={link.category_id?.toString() || ''}
        onValueChange={(value) => handleChange('category_id', parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex space-x-2">
        <Button 
          onClick={onSave}
          className="flex items-center gap-2"
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Save
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-2"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Cancel
        </Button>
      </div>
    </div>
  );
};