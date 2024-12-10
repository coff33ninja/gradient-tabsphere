import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TabNavigation } from "@/components/TabNavigation";
import { IconManager } from "@/components/admin/IconManager";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { ThemeManager } from "@/components/admin/ThemeManager";
import { LinkManager } from "@/components/admin/LinkManager";
import { Tab } from "@/types";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const AdminZone = () => {
  const navigate = useNavigate();
  const { data: userRole, isLoading: isRoleLoading } = useUserRole();
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*");
      
      if (error) throw error;
      return data || [];
    },
  });

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

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (userRole !== "admin") {
    navigate("/");
    return null;
  }

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