import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { ThemeSettings } from './ThemeSettings';
import { Footer } from './Footer';

export const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-24 right-4 z-50 bg-background/95 backdrop-blur-sm shadow-lg border border-border/50 hover:bg-accent"
          >
            <Palette className="h-[1.2rem] w-[1.2rem] text-primary animate-gradient" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsThemeDialogOpen(true)}>
            Theme Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/credentials')}>
            Credentials
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isThemeDialogOpen} onOpenChange={setIsThemeDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto z-60">
          <DialogHeader>
            <DialogTitle>Theme Settings</DialogTitle>
          </DialogHeader>
          <ThemeSettings />
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};