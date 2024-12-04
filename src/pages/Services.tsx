import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CredentialDialog } from "@/components/CredentialDialog";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import AddShowForm from "@/components/AddShowForm";
import AddMovieForm from "@/components/AddMovieForm";
import AddIndexerForm from "@/components/AddIndexerForm";
import AddTorrentForm from "@/components/AddTorrentForm";

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
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
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
        {sonarrCreds && (
          <div className="p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Sonarr</h2>
            <AddShowForm 
              sonarrApiUrl={sonarrCreds.url} 
              sonarrApiKey={sonarrCreds.api_key} 
            />
          </div>
        )}

        {radarrCreds && (
          <div className="p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Radarr</h2>
            <AddMovieForm 
              radarrApiUrl={radarrCreds.url} 
              radarrApiKey={radarrCreds.api_key} 
            />
          </div>
        )}

        {prowlarrCreds && (
          <div className="p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Prowlarr</h2>
            <AddIndexerForm 
              prowlarrApiUrl={prowlarrCreds.url} 
              prowlarrApiKey={prowlarrCreds.api_key} 
            />
          </div>
        )}

        {qbittorrentCreds && (
          <div className="p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">qBittorrent</h2>
            <AddTorrentForm 
              qbittorrentApiUrl={qbittorrentCreds.url}
              username={qbittorrentCreds.username}
              password={qbittorrentCreds.password}
            />
          </div>
        )}
      </div>

      <CredentialDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
