import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CredentialDialog } from "@/components/CredentialDialog";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SonarrSection } from "@/components/services/SonarrSection";
import { RadarrSection } from "@/components/services/RadarrSection";
import { ProwlarrSection } from "@/components/services/ProwlarrSection";
import { QbittorrentSection } from "@/components/services/QbittorrentSection";

export default function Services() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: credentials, isLoading } = useQuery({
    queryKey: ["credentials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("credentials")
        .select("*")
        .order("service");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getCredentialsByService = (service) => {
    return credentials?.find(cred => cred.service === service) || null;
  };

  const sonarrCreds = getCredentialsByService('sonarr');
  const radarrCreds = getCredentialsByService('radarr');
  const prowlarrCreds = getCredentialsByService('prowlarr');
  const qbittorrentCreds = getCredentialsByService('qbittorrent');

  return (
    <div className="container mx-auto p-4 space-y-6 pt-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Service</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sonarrCreds && <SonarrSection credentials={sonarrCreds} />}
        {radarrCreds && <RadarrSection credentials={radarrCreds} />}
        {prowlarrCreds && <ProwlarrSection credentials={prowlarrCreds} />}
        {qbittorrentCreds && <QbittorrentSection credentials={qbittorrentCreds} />}
      </div>

      <CredentialDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}