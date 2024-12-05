import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useToast } from '@/components/ui/use-toast';

interface CategoryIconUploadProps {
  categoryId: number;
  onSuccess: (iconUrl: string) => void;
}

export const CategoryIconUpload = ({ categoryId, onSuccess }: CategoryIconUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${categoryId}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('category_icons')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('category_icons')
        .getPublicUrl(filePath);

      // Update category with icon URL
      const { error: updateError } = await supabase
        .from('categories')
        .update({ icon_url: publicUrl })
        .eq('id', categoryId);

      if (updateError) throw updateError;

      onSuccess(publicUrl);
      toast({
        title: "Icon uploaded successfully",
        description: "The category icon has been updated.",
      });
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast({
        title: "Error uploading icon",
        description: "There was a problem uploading the icon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id={`icon-upload-${categoryId}`}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => document.getElementById(`icon-upload-${categoryId}`)?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Icons.image className="h-4 w-4" />
        )}
        <span className="ml-2">Upload Icon</span>
      </Button>
    </div>
  );
};