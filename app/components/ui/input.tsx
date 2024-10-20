import * as React from "react"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endIcon?: LucideIcon;
  onClickIcon?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, endIcon, onClickIcon, ...props }, ref) => {
    const EndIcon = endIcon;

    return (
      <div className="w-full relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div 
            onClick={onClickIcon}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer">
            <EndIcon className="text-muted-foreground" size={18} />
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
