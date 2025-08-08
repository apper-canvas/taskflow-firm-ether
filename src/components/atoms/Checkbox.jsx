import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <motion.div 
      className="relative inline-flex items-center"
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center",
          checked 
            ? "bg-gradient-to-r from-primary-500 to-secondary-500 border-primary-500" 
            : "bg-white border-gray-300 hover:border-primary-400",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
      >
        <motion.div
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;