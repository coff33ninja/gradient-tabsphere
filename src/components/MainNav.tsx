import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogIn } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserMenu } from "./nav/UserMenu";
import { cn } from "@/lib/utils";

export function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/credentials", label: "Account" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold hover:from-purple-500 hover:to-pink-600 transition-all duration-300",
                location.pathname === item.path && "bg-accent/50"
              )}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold hover:from-purple-500 hover:to-pink-600"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}