import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { Icons } from "@/components/icons";
import { SERVICE_CONFIGS } from "@/components/services/ServiceConfig";

const AdminZone = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: credentials, isLoading } = useQuery({
    queryKey: ['credentials'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('credentials')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  const categories = Array.from(
    new Set(Object.values(SERVICE_CONFIGS).map(config => config.category))
  );

  const filteredCredentials = credentials?.filter(cred => 
    !selectedCategory || SERVICE_CONFIGS[cred.service].category === categories[selectedCategory - 1]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Icons.spinner className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <ServiceGrid credentials={filteredCredentials || []} />
    </div>
  );
};

export default AdminZone;