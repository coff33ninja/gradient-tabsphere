import { Loader } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <Loader className="animate-spin h-6 w-6" />
  </div>
);