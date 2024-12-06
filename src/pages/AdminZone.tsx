import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TabNavigation } from "@/components/TabNavigation";
import { IconManager } from "@/components/admin/IconManager";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { ThemeManager } from "@/components/admin/ThemeManager";
import { LinkManager } from "@/components/admin/LinkManager";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { Tab } from "@/types";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";

const AdminZone = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: userRole, isLoading: isRoleLoading, error: roleError } = useUserRole();
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

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

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*");
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Categories fetch error:", error);
        toast({
          title: "Error loading categories",
          description: "There was a problem loading the categories. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
  });

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
    {
      id: "categories",
      title: "Category Management",
      icon: "folder"
    }
  ];

  const renderTabContent = () => {
    if (!activeTab) {
      setActiveTab(tabs[0]);
      return null;
    }

    switch (activeTab.id) {
      case "theme":
        return <ThemeManager />;
      case "links":
        return <LinkManager />;
      case "services":
        return <ServiceGrid credentials={credentials || []} />;
      case "icons":
        return <IconManager />;
      case "categories":
        return (
          <CategoryManager
            categories={categories || []}
            selectedCategory={null}
            onCategorySelect={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400/20 via-pink-500/20 to-purple-600/20 pt-16">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <div className="sticky top-20">
              <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Admin Settings
              </h1>
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </aside>
          
          <main className="flex-1 min-h-[calc(100vh-8rem)]">
            <div className="bg-background/60 backdrop-blur-lg rounded-lg border p-6">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminZone;