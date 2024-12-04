import React from 'react';
import { AdminLinkManager } from '@/components/AdminLinkManager';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { RoleBasedContent } from '@/components/RoleBasedContent';
import { useToast } from '@/components/ui/use-toast';

const Credentials = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return null;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "You don't have permission to access this page",
          variant: "destructive",
        });
        navigate('/');
        return null;
      }

      return profileData;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <RoleBasedContent allowedRoles={['admin', 'moderator']}>
        <AdminLinkManager />
      </RoleBasedContent>
    </div>
  );
};

export default Credentials;