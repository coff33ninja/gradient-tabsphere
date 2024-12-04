import React, { useState } from 'react';
import { addShowToSonarr } from '@/services/mediaService';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddShowForm = ({ sonarrApiUrl, sonarrApiKey }) => {
  const [showName, setShowName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const showData = { title: showName };

    try {
      await addShowToSonarr(sonarrApiUrl, sonarrApiKey, showData);
      toast({
        title: 'Success',
        description: 'Show added to Sonarr!',
      });
      setShowName('');
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
          value={showName}
          onChange={(e) => setShowName(e.target.value)}
          placeholder="Show Name"
          required
        />
      </div>
      <Button type="submit">Add Show</Button>
    </form>
  );
};

export default AddShowForm;