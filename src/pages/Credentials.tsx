import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Database } from "@/components/ui/database";
import { Key, Lock, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CredentialDialog } from "@/components/CredentialDialog";
import { useToast } from "@/components/ui/use-toast";
import type { Database as DbType } from "@/integrations/supabase/types";

type Credential = DbType["public"]["Tables"]["credentials"]["Row"];

export default function Credentials() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: credentials, isLoading } = useQuery({
    queryKey: ["credentials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("credentials")
        .select("*")
        .order("service", { ascending: true });

      if (error) {
        toast({
          title: "Error fetching credentials",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data as Credential[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin">
          <Settings className="h-8 w-8 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Service Credentials</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Key className="mr-2 h-4 w-4" />
          Add Credentials
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {credentials?.map((cred) => (
          <div
            key={cred.id}
            className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4" />
              <h3 className="font-semibold">{cred.name}</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">Service: {cred.service}</p>
              <p className="text-muted-foreground truncate">URL: {cred.url}</p>
              {cred.username && (
                <p className="text-muted-foreground">
                  Username: {cred.username}
                </p>
              )}
              {cred.api_key && (
                <p className="text-muted-foreground">
                  API Key: {cred.api_key.slice(0, 8)}...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <CredentialDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}