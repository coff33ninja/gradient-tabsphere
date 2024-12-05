import React, { useState } from 'react';
import { addBookToReadarr } from '@/services/mediaService';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddBookForm = ({ readarrApiUrl, readarrApiKey }) => {
  const [bookTitle, setBookTitle] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title: bookTitle };

    try {
      await addBookToReadarr(readarrApiUrl, readarrApiKey, bookData);
      toast({
        title: 'Success',
        description: 'Book added to Readarr!',
      });
      setBookTitle('');
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
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Book Title"
          required
        />
      </div>
      <Button type="submit">Add Book</Button>
    </form>
  );
};

export default AddBookForm;