import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const ServiceCard = ({ credentials }: Props) => {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      "hover:shadow-lg hover:border-primary/30",
      "bg-background/60 backdrop-blur-lg"
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          {credentials.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Service: {credentials.service}</p>
          <p className="truncate">URL: {credentials.url}</p>
        </div>
      </CardContent>
    </Card>
  );
};