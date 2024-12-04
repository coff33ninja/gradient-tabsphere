import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AuthFieldsProps {
  requiresAuth: boolean;
  requiresApiKey: boolean;
}

export function AuthFields({ requiresAuth, requiresApiKey }: AuthFieldsProps) {
  return (
    <>
      {requiresAuth && (
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

      {requiresApiKey && (
        <div className="space-y-2">
          <Label htmlFor="api_key">API Key</Label>
          <Input id="api_key" name="api_key" required />
        </div>
      )}
    </>
  );
}