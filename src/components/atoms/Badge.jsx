import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  className, 
  variant = "default",
  size = "md"
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-warning-100 text-warning-800",
    danger: "bg-accent-100 text-accent-800",
    high: "bg-accent-100 text-accent-800 border border-accent-200",
    medium: "bg-warning-100 text-warning-800 border border-warning-200",
    low: "bg-success-100 text-success-800 border border-success-200"
  };

  const sizes = {
    sm: "px-2 py-1 text-caption",
    md: "px-2.5 py-1 text-body-sm",
    lg: "px-3 py-1.5 text-body-md"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;