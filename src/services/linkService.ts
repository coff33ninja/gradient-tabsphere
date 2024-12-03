import { supabase } from '@/integrations/supabase/client';
import { scrapeAndDownloadIcon } from '@/scraper';

export const saveLinkWithIcon = async (url: string, categoryId: string) => {
  try {
    const iconUrl = await scrapeAndDownloadIcon(url);
    
    const { data: maxIdData, error: maxIdError } = await supabase
      .from('links')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);
    
    if (maxIdError) throw maxIdError;
    
    const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;
    
    const { error } = await supabase
      .from('links')
      .insert([
        {
          id: nextId,
          url,
          category_id: parseInt(categoryId, 10),
          icon_url: iconUrl,
          last_scraped_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Error saving link:', error);
  }
};