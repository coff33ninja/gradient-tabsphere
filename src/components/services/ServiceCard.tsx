import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import type { Database } from "@/integrations/supabase/types";
import { SERVICE_CONFIGS } from "./ServiceConfig";

type Props = {
  credentials: Database["public"]["Tables"]["credentials"]["Row"];
};

export const ServiceCard = ({ credentials }: Props) => {
  const config = SERVICE_CONFIGS[credentials.service];
  const Icon = Icons[config.icon as keyof typeof Icons];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 bg-white/5 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-[#8B5CF6] group-hover:text-[#D946EF] transition-colors" />
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
            {credentials.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{credentials.url}</p>
      </CardContent>
    </Card>
  );
};