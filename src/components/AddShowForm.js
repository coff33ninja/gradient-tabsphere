// AddShowForm.js
import React, { useState } from 'react';
import { addShowToSonarr } from './mediaService'; // Adjust the import path
import { useToast } from '@/components/ui/use-toast';

const AddShowForm = ({ sonarrApiUrl, sonarrApiKey }) => {
  const [showName, setShowName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const showData = { title: showName }; // Prepare your show data

    try {
      await addShowToSonarr(sonarrApiUrl, sonarrApiKey, showData);
      toast({ title: 'Success', description: 'Show added to Sonarr!' });
      setShowName(''); // Clear input field
    } catch (error) {
      toast({ title: 'Error', description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={showName}
        onChange={(e) => setShowName(e.target.value)}
        placeholder="Show Name"
        required
      />
      <button type="submit">Add Show</button>
    </form>
  );
};

export default AddShowForm;