import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ConnectionFieldsProps {
  domain: string;
  port: string;
  onDomainChange: (domain: string) => void;
  onPortChange: (port: string) => void;
}

export function ConnectionFields({ domain, port, onDomainChange, onPortChange }: ConnectionFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="domain">Domain/IP</Label>
        <Input 
          id="domain" 
          name="domain" 
          placeholder="e.g., localhost or 192.168.1.100"
          value={domain}
          onChange={(e) => onDomainChange(e.target.value)}
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
          onChange={(e) => onPortChange(e.target.value)}
          required 
        />
      </div>
    </>
  );
}