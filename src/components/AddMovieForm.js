import React, { useState } from 'react';
import { addMovieToRadarr } from '@/services/mediaService';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddMovieForm = ({ radarrApiUrl, radarrApiKey }) => {
  const [movieName, setMovieName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = { title: movieName };

    try {
      await addMovieToRadarr(radarrApiUrl, radarrApiKey, movieData);
      toast({
        title: 'Success',
        description: 'Movie added to Radarr!',
      });
      setMovieName('');
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
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Movie Name"
          required
        />
      </div>
      <Button type="submit">Add Movie</Button>
    </form>
  );
};

export default AddMovieForm;