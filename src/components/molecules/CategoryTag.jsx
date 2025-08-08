import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategoryTag = ({ 
  category, 
  color = "#5B47E0", 
  onClick, 
  active = false,
  showIcon = true,
  className 
}) => {
  const categoryIcons = {
    work: "Briefcase",
    personal: "User",
    urgent: "Zap",
    health: "Heart",
    finance: "DollarSign",
    shopping: "ShoppingCart",
    home: "Home"
  };

  const icon = categoryIcons[category] || "Tag";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-body-sm font-medium transition-all duration-200",
        "border-2 hover:shadow-md",
        active 
          ? "text-white shadow-md" 
          : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white",
        className
      )}
      style={{
        backgroundColor: active ? color : undefined,
        borderColor: color,
        color: active ? "white" : color
      }}
    >
      {showIcon && (
        <ApperIcon 
          name={icon} 
          className="w-3.5 h-3.5" 
          style={{ color: active ? "white" : color }}
        />
      )}
      <span className="capitalize">{category}</span>
    </motion.button>
  );
};

export default CategoryTag;