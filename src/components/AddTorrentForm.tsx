import React, { useState } from 'react';
import { addTorrentToQbittorrent } from '@/services/mediaService';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddTorrentForm = ({ qbittorrentApiUrl, username, password }) => {
  const [torrentFile, setTorrentFile] = useState(null);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('torrents', torrentFile);

    try {
      await addTorrentToQbittorrent(qbittorrentApiUrl, username, password, formData);
      toast({
        title: 'Success',
        description: 'Torrent added to qBittorrent!',
      });
      setTorrentFile(null);
    } catch (error) {
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
          onChange={(e) => setTorrentFile(e.target.files[0])}
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