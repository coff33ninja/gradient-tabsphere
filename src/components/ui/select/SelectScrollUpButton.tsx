import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { selectScrollButtonStyles } from "./styles"

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(selectScrollButtonStyles, className)}
    {...props}
  >
    <Icons.chevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName