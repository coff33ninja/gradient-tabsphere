import { Spinner } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <Spinner className="h-8 w-8 animate-spin text-primary" />
  </div>
);