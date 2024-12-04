import { useState, useEffect } from 'react';
import { Link } from '@/types';
import { useLinks } from '@/hooks/useLinks';
import { useLinkMutations } from '@/hooks/useLinkMutations';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { CategoryManager } from './admin/CategoryManager';
import { LinkList } from './admin/LinkList';

export const AdminLinkManager = () => {
  const navigate = useNavigate();
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: linksData, isLoading } = useLinks();
  const { 
    updateLinkMutation, 
    uploadIconMutation, 
    rescrapeMetadataMutation 
  } = useLinkMutations();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

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
    ? linksData?.filter(link => link.category_id === selectedCategory)
    : linksData;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Admin Link Management</h2>
        
        <CategoryManager
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      <LinkList
        links={filteredLinks || []}
        editingLink={editingLink}
        categories={categories}
        onEdit={handleEditLink}
        onSave={handleSaveLink}
        onCancel={() => setEditingLink(null)}
        onUpdate={handleUpdateLink}
        onRescrape={handleRescrape}
        onIconFileChange={setIconFile}
        onIconUpload={handleIconUpload}
        iconFile={iconFile}
      />
    </div>
  );
};