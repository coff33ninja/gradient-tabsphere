import AddArtistForm from "@/components/AddArtistForm";
import type { Database } from "@/integrations/supabase/types";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const LidarrSection = ({ credentials }: Props) => (
  <div className="p-4 rounded-lg border">
    <h2 className="text-xl font-semibold mb-4">Lidarr</h2>
    <AddArtistForm 
      lidarrApiUrl={credentials.url} 
      lidarrApiKey={credentials.api_key} 
    />
  </div>
);