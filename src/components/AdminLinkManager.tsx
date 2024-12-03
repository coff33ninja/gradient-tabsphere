import React, { useState } from 'react';
import { Link } from '@/types';
import { useLinks } from '@/hooks/useLinks';
import { useLinkMutations } from '@/hooks/useLinkMutations';
import { LinkEditor } from './admin/LinkEditor';
import { LinkDisplay } from './admin/LinkDisplay';

export const AdminLinkManager = () => {
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  
  const { data: links, isLoading } = useLinks();
  const { 
    updateLinkMutation, 
    uploadIconMutation, 
    rescrapeMetadataMutation 
  } = useLinkMutations();

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
        description: editingLink.description
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Admin Link Management</h2>
      {links?.map((link) => (
        <div 
          key={link.id} 
          className="border rounded-lg p-4 mb-4 bg-white/5 backdrop-blur-sm"
        >
          {editingLink?.id === link.id ? (
            <LinkEditor
              link={editingLink}
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
            />
          )}
        </div>
      ))}
    </div>
  );
};