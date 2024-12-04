import { Label } from "@/components/ui/label";
import { SERVICE_CONFIGS } from "../services/ServiceConfig";

interface ServiceSelectProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

export function ServiceSelect({ selectedService, onServiceChange }: ServiceSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="service">Service</Label>
      <select
        id="service"
        name="service"
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        required
        value={selectedService}
        onChange={(e) => onServiceChange(e.target.value)}
        aria-label="Select a service"
      >
        {Object.keys(SERVICE_CONFIGS).map((service) => (
          <option key={service} value={service}>
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}