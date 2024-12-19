import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { selectTriggerStyles } from "./styles"

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerStyles, className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icons.chevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName