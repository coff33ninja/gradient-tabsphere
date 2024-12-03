import { ReactNode } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import type { Database } from "@/types/database";

type UserRole = Database["public"]["Enums"]["user_role"];

interface RoleBasedContentProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export const RoleBasedContent = ({ children, allowedRoles }: RoleBasedContentProps) => {
  const { data: userRole } = useUserRole();

  if (!userRole || !allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};