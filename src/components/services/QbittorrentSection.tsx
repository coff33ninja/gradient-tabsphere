import AddTorrentForm from "@/components/AddTorrentForm";
import type { Database } from "@/integrations/supabase/types";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const QbittorrentSection = ({ credentials }: Props) => (
  <div className="p-4 rounded-lg border">
    <h2 className="text-xl font-semibold mb-4">qBittorrent</h2>
    <AddTorrentForm 
      torrentApiUrl={credentials.url}
      username={credentials.username}
      password={credentials.password}
      client="qbittorrent"
    />
  </div>
);