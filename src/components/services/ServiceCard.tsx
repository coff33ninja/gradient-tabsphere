import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import type { Database } from "@/integrations/supabase/types";
import { SERVICE_CONFIGS } from "./ServiceConfig";
import { scrapeAndDownloadIcon } from "@/scraper";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const ServiceCard = ({ credentials }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const config = SERVICE_CONFIGS[credentials.service];
  const DefaultIcon = Icons[config.icon as keyof typeof Icons];

  useEffect(() => {
    const fetchServiceIcon = async () => {
      try {
        setIsLoading(true);
        // Try to load custom icon first
        try {
          const customIconUrl = `/custom-icons/${credentials.service}.png`;
          const response = await fetch(customIconUrl);
          if (response.ok) {
            setIconUrl(customIconUrl);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.debug("No custom icon found, falling back to scraping");
        }

        // Fall back to scraping if no custom icon
        const scrapedIconUrl = await scrapeAndDownloadIcon(credentials.url);
        setIconUrl(scrapedIconUrl);
      } catch (error) {
        console.error("Error fetching service icon:", error);
        toast({
          title: "Error fetching service icon",
          description: "Using default icon instead. Consider adding a custom icon in /custom-icons/",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceIcon();
  }, [credentials.url, credentials.service, toast]);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 bg-white/5 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center space-x-2">
          {isLoading ? (
            <Skeleton className="h-5 w-5 rounded-full" />
          ) : iconUrl ? (
            <img 
              src={iconUrl} 
              alt={`${credentials.name} icon`} 
              className="w-5 h-5 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                toast({
                  title: "Error loading custom icon",
                  description: "Using default icon instead. Check icon format and path.",
                  variant: "destructive",
                });
              }}
            />
          ) : (
            <DefaultIcon className="w-5 h-5 text-[#8B5CF6] group-hover:text-[#D946EF] transition-colors" />
          )}
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
            {credentials.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{credentials.url}</p>
      </CardContent>
    </Card>
  );
};