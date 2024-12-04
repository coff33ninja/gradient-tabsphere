import AddBookForm from "@/components/AddBookForm";
import type { Database } from "@/integrations/supabase/types";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const ReadarrSection = ({ credentials }: Props) => (
  <div className="p-4 rounded-lg border">
    <h2 className="text-xl font-semibold mb-4">Readarr</h2>
    <AddBookForm 
      readarrApiUrl={credentials.url} 
      readarrApiKey={credentials.api_key} 
    />
  </div>
);