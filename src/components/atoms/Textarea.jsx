import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  error = false,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-body-md",
        "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        "transition-colors duration-200 resize-none",
        error && "border-accent-500 focus:ring-accent-500",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;