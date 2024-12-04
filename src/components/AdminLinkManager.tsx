import React, { useState } from 'react';
import { Link } from '@/types';
import { useLinks } from '@/hooks/useLinks';
import { useLinkMutations } from '@/hooks/useLinkMutations';
import { LinkEditor } from './admin/LinkEditor';
import { LinkDisplay } from './admin/LinkDisplay';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, X } from 'lucide-react';
import { toast } from './ui/use-toast';

export const AdminLinkManager = () => {
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  
  const { data: links, isLoading } = useLinks();
  const { 
    updateLinkMutation, 
    uploadIconMutation, 
    rescrapeMetadataMutation 
  } = useLinkMutations();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      const { data: maxIdData } = await supabase
        .from('categories')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);
      
      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;
      
      const { error } = await supabase
        .from('categories')
        .insert([{ id: nextId, name: newCategoryName.trim() }]);
      
      if (error) throw error;
      
      toast({
        title: 'Category Added',
        description: `${newCategoryName} has been added successfully.`
      });
      
      setNewCategoryName('');
      setIsAddingCategory(false);
    } catch (error) {
      toast({
        title: 'Error Adding Category',
        description: 'Failed to add category. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
  };

  const handleUpdateLink = (updatedLink: Link) => {
    setEditingLink(updatedLink);
  };

  const handleSaveLink = () => {
    if (editingLink) {
      updateLinkMutation.mutate({
        id: editingLink.id,
        title: editingLink.title,
        url: editingLink.url,
        description: editingLink.description,
        category_id: editingLink.category_id
      }, {
        onSuccess: () => setEditingLink(null)
      });
    }
  };

  const handleIconUpload = (link: Link) => {
    if (iconFile) {
      uploadIconMutation.mutate({ 
        linkId: link.id, 
        file: iconFile 
      }, {
        onSuccess: () => setIconFile(null)
      });
    }
  };

  const handleRescrape = (url: string) => {
    rescrapeMetadataMutation.mutate(url);
  };

  const filteredLinks = selectedCategory 
    ? links?.filter(link => link.category_id === selectedCategory)
    : links;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Admin Link Management</h2>
        
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            variant="outline"
            onClick={() => setSelectedCategory(null)}
            className={!selectedCategory ? 'bg-primary/20' : ''}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'bg-primary/20' : ''}
            >
              {category.name}
            </Button>
          ))}
          {!isAddingCategory ? (
            <Button
              variant="outline"
              onClick={() => setIsAddingCategory(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Category
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="w-48"
              />
              <Button onClick={addCategory} size="sm">
                Add
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName('');
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredLinks?.map((link) => (
          <div 
            key={link.id} 
            className="border rounded-lg p-4 bg-white/5 backdrop-blur-sm"
          >
            {editingLink?.id === link.id ? (
              <LinkEditor
                link={editingLink}
                categories={categories}
                onSave={handleSaveLink}
                onCancel={() => setEditingLink(null)}
                onChange={handleUpdateLink}
              />
            ) : (
              <LinkDisplay
                link={link}
                onEdit={() => handleEditLink(link)}
                onRescrape={() => handleRescrape(link.url || '')}
                onIconFileChange={setIconFile}
                onIconUpload={() => handleIconUpload(link)}
                iconFile={iconFile}
                categoryName={categories.find(c => c.id === link.category_id)?.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};