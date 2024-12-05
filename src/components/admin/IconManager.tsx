import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { IconMetadataDisplay } from '../icons/IconDictionary';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';

export const IconManager = () => {
  const { toast } = useToast();
  const [newIcon, setNewIcon] = useState({
    name: '',
    file_path: '',
    category: 'misc' as const,
    description: ''
  });

  const addIcon = async () => {
    try {
      const { error } = await supabase
        .from('icon_metadata')
        .insert([newIcon]);

      if (error) throw error;

      toast({
        title: 'Icon added successfully',
        description: `Added ${newIcon.name} to the icon database.`
      });

      setNewIcon({
        name: '',
        file_path: '',
        category: 'misc',
        description: ''
      });
    } catch (error) {
      toast({
        title: 'Error adding icon',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 p-4 border rounded-lg">
        <h3 className="text-lg font-medium">Add New Icon</h3>
        <Input
          placeholder="Icon name"
          value={newIcon.name}
          onChange={(e) => setNewIcon(prev => ({ ...prev, name: e.target.value }))}
        />
        <Input
          placeholder="File path"
          value={newIcon.file_path}
          onChange={(e) => setNewIcon(prev => ({ ...prev, file_path: e.target.value }))}
        />
        <Select
          value={newIcon.category}
          onValueChange={(value: any) => setNewIcon(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {['navigation', 'action', 'status', 'media', 'social', 'misc'].map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Description"
          value={newIcon.description}
          onChange={(e) => setNewIcon(prev => ({ ...prev, description: e.target.value }))}
        />
        <Button onClick={addIcon}>Add Icon</Button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Icon Database</h3>
        <IconMetadataDisplay />
      </div>
    </div>
  );
};