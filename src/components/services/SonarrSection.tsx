import AddShowForm from "@/components/AddShowForm";
import type { Database } from "@/integrations/supabase/types";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const SonarrSection = ({ credentials }: Props) => (
  <div className="p-4 rounded-lg border">
    <h2 className="text-xl font-semibold mb-4">Sonarr</h2>
    <AddShowForm 
      sonarrApiUrl={credentials.url} 
      sonarrApiKey={credentials.api_key} 
    />
  </div>
);