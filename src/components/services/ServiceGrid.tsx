import { ServiceCard } from "./ServiceCard";
import type { Database } from "@/integrations/supabase/types";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"][];
};

export const ServiceGrid = ({ credentials }: Props) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Service Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {credentials.map((cred) => (
          <ServiceCard key={cred.id} credentials={cred} />
        ))}
        {credentials.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">
              No services configured yet. Add your first service to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};