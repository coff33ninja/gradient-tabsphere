import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { selectScrollButtonStyles } from "./styles"

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(selectScrollButtonStyles, className)}
    {...props}
  >
    <Icons.chevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName