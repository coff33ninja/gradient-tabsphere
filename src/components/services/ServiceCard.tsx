import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import type { Database } from "@/integrations/supabase/types";
import { SERVICE_CONFIGS } from "./ServiceConfig";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const ServiceCard = ({ credentials }: Props) => {
  const config = SERVICE_CONFIGS[credentials.service];
  const Icon = Icons[config.icon];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span>{credentials.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{credentials.url}</p>
      </CardContent>
    </Card>
  );
};