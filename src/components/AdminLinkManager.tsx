import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import { LinkEditor } from "./admin/LinkEditor";
import { LinkDisplay } from "./admin/LinkDisplay";
import { useLinks } from "@/hooks/useLinks";

export const AdminLinkManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { links, isLoading } = useLinks();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Icons.spinner className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Links</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          Add Link
        </Button>
      </div>

      {isEditing ? (
        <LinkEditor onClose={() => setIsEditing(false)} />
      ) : (
        <LinkDisplay links={links} />
      )}
    </div>
  );
};