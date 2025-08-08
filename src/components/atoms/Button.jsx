import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  loading = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-500 shadow-md hover:shadow-lg",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500 shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-md hover:shadow-lg",
    success: "bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 shadow-md hover:shadow-lg"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-body-sm rounded-md",
    md: "px-4 py-2.5 text-body-md rounded-lg",
    lg: "px-6 py-3 text-body-lg rounded-lg"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
        />
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;