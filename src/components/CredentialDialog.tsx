import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { SERVICE_CONFIGS } from "./services/ServiceConfig";
import { ServiceSelect } from "./credentials/ServiceSelect";
import { ConnectionFields } from "./credentials/ConnectionFields";
import { AuthFields } from "./credentials/AuthFields";
import { LoadingSpinner } from "./LoadingSpinner";

type ServiceType = Database["public"]["Enums"]["service_type"];

interface CredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error saving credentials",
          description: "You must be logged in to save credentials",
          variant: "destructive",
        });
        return;
      }

      const formData = new FormData(e.currentTarget);
      const url = constructUrl(
        formData.get("domain") as string,
        formData.get("port") as string,
        selectedService
      );

      const credential = {
        service: selectedService,
        name: formData.get("name") as string,
        url,
        username: formData.get("username") as string || null,
        password: formData.get("password") as string || null,
        api_key: formData.get("api_key") as string || null,
        user_id: user.id,
      };

      const { error } = await supabase
        .from("credentials")
        .insert(credential);

      if (error) {
        console.error("Error saving credentials:", error);
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
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error saving credentials",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const serviceConfig = SERVICE_CONFIGS[selectedService];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Service Credentials</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ServiceSelect 
            selectedService={selectedService}
            onServiceChange={(service) => setSelectedService(service as ServiceType)}
          />

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>

          <ConnectionFields
            domain={domain}
            port={port}
            onDomainChange={setDomain}
            onPortChange={setPort}
          />

          <AuthFields
            requiresAuth={serviceConfig.requiresAuth}
            requiresApiKey={serviceConfig.requiresApiKey}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="min-w-[100px]">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner className="h-4 w-4" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
