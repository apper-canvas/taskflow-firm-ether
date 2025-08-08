import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, showIcon = true, className }) => {
  const priorityConfig = {
    high: {
      label: "High",
      variant: "high",
      icon: "AlertTriangle",
      animate: true
    },
    medium: {
      label: "Medium",
      variant: "medium", 
      icon: "Minus",
      animate: false
    },
    low: {
      label: "Low",
      variant: "low",
      icon: "ArrowDown",
      animate: false
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  const BadgeContent = () => (
    <Badge variant={config.variant} className={className}>
      <div className="flex items-center gap-1">
        {showIcon && <ApperIcon name={config.icon} className="w-3 h-3" />}
        {config.label}
      </div>
    </Badge>
  );

  if (config.animate && priority === "high") {
    return (
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <BadgeContent />
      </motion.div>
    );
  }

  return <BadgeContent />;
};

export default PriorityBadge;