import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CredentialDialog } from "@/components/CredentialDialog";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SearchBar } from "@/components/SearchBar";
import { SERVICE_CONFIGS } from "@/components/services/ServiceConfig";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CategoryList } from "@/components/CategoryList";

export default function Credentials() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: credentials, isLoading } = useQuery({
    queryKey: ["credentials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("credentials")
        .select("*")
        .order("service");
      
      if (error) throw error;
      return data;
    },
  });

  // Group services by category
  const categories = Array.from(new Set(Object.values(SERVICE_CONFIGS).map(config => config.category)));

  // Update the categories mapping to use numbers for IDs
  const categoryList = categories.map((category, index) => ({
    id: index + 1,
    name: category
  }));

  const filteredCredentials = credentials?.filter(cred => 
    !selectedCategory || SERVICE_CONFIGS[cred.service].category === categories[selectedCategory - 1]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400/20 via-pink-500/20 to-purple-600/20 pt-16">
      <div className="max-w-[2000px] mx-auto p-4 md:p-8">
        <SearchBar />
        
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <CategoryList
            categories={categoryList}
            isLoading={isLoading}
            activeCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Services
              </h1>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:opacity-90 transition-opacity"
              >
                Add Service
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCredentials?.map((credential) => (
                <ServiceCard key={credential.id} credentials={credential} />
              ))}
            </div>
          </div>
        </div>

        <CredentialDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
    </div>
  );
}