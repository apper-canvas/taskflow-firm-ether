import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  children, 
  error, 
  required = false, 
  className,
  id
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-body-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-body-sm text-accent-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;