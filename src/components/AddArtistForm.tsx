import React, { useState } from 'react';
import { addArtistToLidarr } from '@/services/mediaService';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddArtistForm = ({ lidarrApiUrl, lidarrApiKey }) => {
  const [artistName, setArtistName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artistData = { name: artistName };

    try {
      await addArtistToLidarr(lidarrApiUrl, lidarrApiKey, artistData);
      toast({
        title: 'Success',
        description: 'Artist added to Lidarr!',
      });
      setArtistName('');
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Artist Name"
          required
        />
      </div>
      <Button type="submit">Add Artist</Button>
    </form>
  );
};

export default AddArtistForm;