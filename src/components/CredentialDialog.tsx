import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CredentialDialog({ open, onOpenChange }: CredentialDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const credential = {
      service: formData.get("service"),
      name: formData.get("name"),
      url: formData.get("url"),
      username: formData.get("username") || null,
      password: formData.get("password") || null,
      api_key: formData.get("api_key") || null,
    };

    const { error } = await supabase.from("credentials").insert([credential]);

    if (error) {
      toast({
        title: "Error saving credentials",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Credentials saved",
        description: "Your credentials have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      onOpenChange(false);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Service Credentials</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <select
              id="service"
              name="service"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            >
              <option value="sonarr">Sonarr</option>
              <option value="radarr">Radarr</option>
              <option value="prowlarr">Prowlarr</option>
              <option value="qbittorrent">qBittorrent</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" name="url" type="url" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username (optional)</Label>
            <Input id="username" name="username" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password (optional)</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api_key">API Key (optional)</Label>
            <Input id="api_key" name="api_key" />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}