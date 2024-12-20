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
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

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

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      navigate('/auth');
    }
  };

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
    <div className="min-h-screen bg-gradient-custom pt-16">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <div className="sticky top-20">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">
                  Admin Settings
                </h1>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign out
                </Button>
              </div>
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </aside>

          <main className="flex-1 min-h-[calc(100vh-8rem)]">
            <div className="admin-card">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminZone;