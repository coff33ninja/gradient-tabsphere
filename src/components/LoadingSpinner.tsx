import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <Loader2 className="animate-spin h-6 w-6" />
  </div>
);