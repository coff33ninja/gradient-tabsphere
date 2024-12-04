import React, { useState } from 'react';
import { addTorrentToClient } from '@/services/mediaService';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type TorrentClient = 'qbittorrent' | 'transmission' | 'deluge' | 'rtorrent';

interface AddTorrentFormProps {
  torrentApiUrl: string;
  username: string | null;
  password: string | null;
  client: TorrentClient;
}

const AddTorrentForm = ({ torrentApiUrl, username, password, client }: AddTorrentFormProps) => {
  const [torrentFile, setTorrentFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!torrentFile || !username || !password) return;

    const formData = new FormData();
    formData.append('torrents', torrentFile);

    try {
      await addTorrentToClient(torrentApiUrl, username, password, formData, client);
      toast({
        title: 'Success',
        description: 'Torrent added successfully!',
      });
      setTorrentFile(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="file"
          onChange={(e) => setTorrentFile(e.target.files?.[0] || null)}
          required
          accept=".torrent"
        />
      </div>
      <Button type="submit" disabled={!torrentFile}>
        Add Torrent
      </Button>
    </form>
  );
};

export default AddTorrentForm;