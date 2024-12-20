import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-foreground">
        Admin Settings
      </h1>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSignOut}
        className="text-muted-foreground hover:text-foreground gap-2"
      >
        <Icons.logOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
};