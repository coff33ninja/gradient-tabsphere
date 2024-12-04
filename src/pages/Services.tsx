import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ServiceGrid } from "@/components/services/ServiceGrid";

export default function Services() {
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6]/20 via-[#D946EF]/20 to-[#8B5CF6]/20 pt-16">
      <div className="max-w-[2000px] mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">
          Services
        </h1>
        <ServiceGrid credentials={credentials || []} />
      </div>
    </div>
  );
}