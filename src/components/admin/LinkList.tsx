import { Link } from '@/types';
import { LinkEditor } from './LinkEditor';
import { LinkDisplay } from './LinkDisplay';

interface LinkListProps {
  links: Link[];
  editingLink: Link | null;
  categories: any[];
  onEdit: (link: Link) => void;
  onSave: () => void;
  onCancel: () => void;
  onUpdate: (link: Link) => void;
  onRescrape: (url: string) => void;
  onIconFileChange: (file: File | null) => void;
  onIconUpload: (link: Link) => void;
  iconFile: File | null;
}

export const LinkList = ({
  links,
  editingLink,
  categories,
  onEdit,
  onSave,
  onCancel,
  onUpdate,
  onRescrape,
  onIconFileChange,
  onIconUpload,
  iconFile,
}: LinkListProps) => {
  return (
    <div className="space-y-4">
      {links?.map((link) => (
        <div 
          key={link.id} 
          className="border rounded-lg p-4 bg-background/80"
        >
          {editingLink?.id === link.id ? (
            <LinkEditor
              link={editingLink}
              categories={categories}
              onSave={onSave}
              onCancel={onCancel}
              onChange={onUpdate}
            />
          ) : (
            <LinkDisplay
              link={link}
              onEdit={() => onEdit(link)}
              onRescrape={() => onRescrape(link.url || '')}
              onIconFileChange={onIconFileChange}
              onIconUpload={() => onIconUpload(link)}
              iconFile={iconFile}
              categoryName={categories.find(c => c.id === link.category_id)?.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};