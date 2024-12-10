import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserMenu } from "./nav/UserMenu";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { useToast } from "./ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      // Only redirect if trying to access protected routes
      if (!session && isProtectedRoute(location.pathname)) {
        navigate('/auth');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Only redirect if trying to access protected routes
      if (!session && isProtectedRoute(location.pathname)) {
        navigate('/auth');
        toast({
          title: "Session expired",
          description: "Please sign in again to continue.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname, toast]);

  // Helper function to check if a route requires authentication
  const isProtectedRoute = (path: string): boolean => {
    const protectedRoutes = ['/admin'];
    return protectedRoutes.includes(path);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/admin", label: "Admin Zone", protected: true },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        (!item.protected || user) && (
          <Button
            key={item.path}
            variant="ghost"
            className={cn(
              "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold hover:from-purple-500 hover:to-pink-600 transition-all duration-300",
              location.pathname === item.path && "bg-accent/50"
            )}
            onClick={() => {
              navigate(item.path);
              setIsMobileMenuOpen(false);
            }}
          >
            {item.label}
          </Button>
        )
      ))}
    </>
  );

  return (
    <div className="modern-nav">
      <div className="container flex h-14 items-center">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/95 backdrop-blur-lg">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-3 mt-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="mr-4 hidden md:flex space-x-2">
          <NavLinks />
        </div>

        {/* Auth Section */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/auth")}
              className="bg-primary/10 hover:bg-primary/20 text-primary"
            >
              <Icons.login className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
