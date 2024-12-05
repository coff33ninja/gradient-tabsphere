import React, { useState } from 'react';
import { addIndexerToProwlarr } from '@/services/mediaService';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddIndexerForm = ({ prowlarrApiUrl, prowlarrApiKey }) => {
  const [indexerName, setIndexerName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const indexerData = { name: indexerName };

    try {
      await addIndexerToProwlarr(prowlarrApiUrl, prowlarrApiKey, indexerData);
      toast({
        title: 'Success',
        description: 'Indexer added to Prowlarr!',
      });
      setIndexerName('');
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
          value={indexerName}
          onChange={(e) => setIndexerName(e.target.value)}
          placeholder="Indexer Name"
          required
        />
      </div>
      <Button type="submit">Add Indexer</Button>
    </form>
  );
};

export default AddIndexerForm;