import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ServiceType = Database["public"]["Enums"]["service_type"];

interface CredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ServiceConfig {
  defaultPort: number;
  requiresApiKey: boolean;
  requiresAuth: boolean;
  baseUrlPath?: string;
}

const SERVICE_CONFIGS: Record<ServiceType, ServiceConfig> = {
  sonarr: { defaultPort: 8989, requiresApiKey: true, requiresAuth: false },
  radarr: { defaultPort: 7878, requiresApiKey: true, requiresAuth: false },
  prowlarr: { defaultPort: 9696, requiresApiKey: true, requiresAuth: false },
  lidarr: { defaultPort: 8686, requiresApiKey: true, requiresAuth: false },
  readarr: { defaultPort: 8787, requiresApiKey: true, requiresAuth: false },
  qbittorrent: { defaultPort: 8080, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/api' },
  transmission: { defaultPort: 9091, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/transmission/rpc' },
  deluge: { defaultPort: 8112, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/json' },
  rtorrent: { defaultPort: 8000, requiresApiKey: false, requiresAuth: true, baseUrlPath: '/RPC2' },
};

export function CredentialDialog({ open, onOpenChange }: CredentialDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>("sonarr");
  const [domain, setDomain] = useState("");
  const [port, setPort] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    if (selectedService) {
      setPort(SERVICE_CONFIGS[selectedService].defaultPort.toString());
    }
  }, [selectedService]);

  const constructUrl = (domain: string, port: string, service: ServiceType) => {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const baseUrl = `http://${cleanDomain}:${port}`;
    return baseUrl + (SERVICE_CONFIGS[service].baseUrlPath || '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error saving credentials",
        description: "You must be logged in to save credentials",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const url = constructUrl(
      formData.get("domain") as string,
      formData.get("port") as string,
      formData.get("service") as ServiceType
    );

    const credential = {
      service: formData.get("service") as ServiceType,
      name: formData.get("name") as string,
      url,
      username: formData.get("username") as string | null,
      password: formData.get("password") as string | null,
      api_key: formData.get("api_key") as string | null,
      user_id: user.id,
    };

    const { error } = await supabase.from("credentials").insert(credential);

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

  const serviceConfig = SERVICE_CONFIGS[selectedService];

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
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value as ServiceType)}
              aria-label="Select a service"
            >
              <option value="sonarr">Sonarr</option>
              <option value="radarr">Radarr</option>
              <option value="prowlarr">Prowlarr</option>
              <option value="lidarr">Lidarr</option>
              <option value="readarr">Readarr</option>
              <option value="qbittorrent">qBittorrent</option>
              <option value="transmission">Transmission</option>
              <option value="deluge">Deluge</option>
              <option value="rtorrent">rTorrent</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain/IP</Label>
            <Input 
              id="domain" 
              name="domain" 
              placeholder="e.g., localhost or 192.168.1.100"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input 
              id="port" 
              name="port" 
              type="number"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              required 
            />
          </div>

          {serviceConfig.requiresAuth && (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </>
          )}

          {serviceConfig.requiresApiKey && (
            <div className="space-y-2">
              <Label htmlFor="api_key">API Key</Label>
              <Input id="api_key" name="api_key" required />
            </div>
          )}

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