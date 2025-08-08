import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className, 
  children, 
  error = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-body-md",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          "transition-colors duration-200",
          error && "border-accent-500 focus:ring-accent-500",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;