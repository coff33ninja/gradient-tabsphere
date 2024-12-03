// AddTorrentForm.js
import React, { useState } from 'react';
import { addTorrentToQbittorrent } from './mediaService'; // Adjust the import path
import { useToast } from '@/components/ui/use-toast';

const AddTorrentForm = ({ qbittorrentApiUrl, username, password }) => {
  const [torrentFile, setTorrentFile] = useState(null);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('torrents', torrentFile); // Prepare your torrent data

    try {
      await addTorrentToQbittorrent(qbittorrentApiUrl, username, password, formData);
      toast({ title: 'Success', description: 'Torrent added to qBittorrent!' });
      setTorrentFile(null); // Clear input field
    } catch (error) {
      toast({ title: 'Error', description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setTorrentFile(e.target.files[0])}
        required
      />
      <button type="submit">Add Torrent</button>
    </form>
  );
};

export default AddTorrentForm;