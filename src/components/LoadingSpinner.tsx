import { Icons } from "@/components/icons";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <Icons.spinner className="h-8 w-8 animate-spin" />
    </div>
  );
};