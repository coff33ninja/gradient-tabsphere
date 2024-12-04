import AddMovieForm from "@/components/AddMovieForm";
import type { Database } from "@/integrations/supabase/types";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const RadarrSection = ({ credentials }: Props) => (
  <div className="p-4 rounded-lg border">
    <h2 className="text-xl font-semibold mb-4">Radarr</h2>
    <AddMovieForm 
      radarrApiUrl={credentials.url} 
      radarrApiKey={credentials.api_key} 
    />
  </div>
);