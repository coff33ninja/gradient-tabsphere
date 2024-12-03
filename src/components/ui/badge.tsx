import * as React from "react";
import { badgeVariants } from "./badgeVariants"; // Update this line
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };