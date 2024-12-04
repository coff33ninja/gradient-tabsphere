import AddIndexerForm from "@/components/AddIndexerForm";
import type { Database } from "@/integrations/supabase/types";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const ProwlarrSection = ({ credentials }: Props) => (
  <div className="p-4 rounded-lg border">
    <h2 className="text-xl font-semibold mb-4">Prowlarr</h2>
    <AddIndexerForm 
      prowlarrApiUrl={credentials.url} 
      prowlarrApiKey={credentials.api_key} 
    />
  </div>
);