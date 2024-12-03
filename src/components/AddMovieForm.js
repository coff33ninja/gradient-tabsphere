// AddMovieForm.js
import React, { useState } from 'react';
import { addMovieToRadarr } from './mediaService'; // Adjust the import path
import { useToast } from '@/components/ui/use-toast';

const AddMovieForm = ({ radarrApiUrl, radarrApiKey }) => {
  const [movieName, setMovieName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = { title: movieName }; // Prepare your movie data

    try {
      await addMovieToRadarr(radarrApiUrl, radarrApiKey, movieData);
      toast({ title: 'Success', description: 'Movie added to Radarr!' });
      setMovieName(''); // Clear input field
    } catch (error) {
      toast({ title: 'Error', description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Movie Name"
        required
      />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;