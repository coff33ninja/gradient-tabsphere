import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TabNavigation } from "@/components/TabNavigation";
import { Tab } from "@/types";
import { useUserRole } from "@/hooks/useUserRole";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/Footer";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminContent } from "@/components/admin/AdminContent";

const AdminZone = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const { data: userRole, isLoading: isRoleLoading, error: roleError } = useUserRole();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please sign in to access the admin zone",
            variant: "destructive",
          });
          navigate("/auth");
        }
      } catch (error) {
        console.error("Auth error:", error);
        toast({
          title: "Authentication error",
          description: "There was a problem checking your authentication status. Please try again.",
          variant: "destructive",
        });
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate, toast]);

  const { data: credentials } = useQuery({
    queryKey: ["credentials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("credentials")
        .select("*")
        .order("service");

      if (error) throw error;
      return data || [];
    },
  });

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (roleError) {
    toast({
      title: "Error checking permissions",
      description: "There was a problem verifying your access rights. Please try again.",
      variant: "destructive",
    });
    navigate("/");
    return null;
  }

  if (userRole !== "admin") {
    toast({
      title: "Access denied",
      description: "You don't have permission to access the admin zone",
      variant: "destructive",
    });
    navigate("/");
    return null;
  }

  const tabs: Tab[] = [
    {
      id: "theme",
      title: "Theme Settings",
      icon: "palette"
    },
    {
      id: "links",
      title: "Link Management",
      icon: "link"
    },
    {
      id: "services",
      title: "Service Management",
      icon: "settings"
    },
    {
      id: "icons",
      title: "Icon Management",
      icon: "image"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-custom pt-16">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <div className="sticky top-20 space-y-6">
              <AdminHeader />
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </aside>

          <main className="flex-1 min-h-[calc(100vh-8rem)]">
            <AdminContent 
              activeTab={activeTab} 
              credentials={credentials || []} 
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminZone;