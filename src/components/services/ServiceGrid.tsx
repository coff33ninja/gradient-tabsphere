import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { Button } from "@/components/ui/button";
import { CredentialDialog } from "@/components/CredentialDialog";
import type { Database } from "@/integrations/supabase/types";
import { SERVICE_CONFIGS, type ServiceCategory } from "./ServiceConfig";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"][];
};

export const ServiceGrid = ({ credentials }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "All">("All");

  const categories = Array.from(new Set(Object.values(SERVICE_CONFIGS).map(config => config.category)));
  
  const filteredCredentials = selectedCategory === "All" 
    ? credentials
    : credentials.filter(cred => SERVICE_CONFIGS[cred.service].category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>Add Service</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCredentials.map(cred => (
          <ServiceCard key={cred.id} credentials={cred} />
        ))}
      </div>

      <CredentialDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};