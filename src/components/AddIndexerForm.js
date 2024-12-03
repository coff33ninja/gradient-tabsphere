// AddIndexer Form.js
import React, { useState } from 'react';
import { addIndexerToProwlarr } from './mediaService'; // Adjust the import path
import { useToast } from '@/components/ui/use-toast';

const AddIndexerForm = ({ prowlarrApiUrl, prowlarrApiKey }) => {
  const [indexerName, setIndexerName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const indexerData = { name: indexerName }; // Prepare your indexer data

    try {
      await addIndexerToProwlarr(prowlarrApiUrl, prowlarrApiKey, indexerData);
      toast({ title: 'Success', description: 'Indexer added to Prowlarr!' });
      setIndexerName(''); // Clear input field
    } catch (error) {
      toast({ title: 'Error', description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={indexerName}
        onChange={(e) => setIndexerName(e.target.value)}
        placeholder="Indexer Name"
        required
      />
      <button type="submit">Add Indexer</button>
    </form>
  );
};

export default AddIndexerForm;