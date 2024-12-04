import { Loader } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <Loader className="h-8 w-8 animate-spin text-primary" />
  </div>
);