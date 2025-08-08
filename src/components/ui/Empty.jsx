import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started organizing your day.",
  actionLabel = "Add Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </motion.div>
      <h3 className="text-heading-md font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-body-md text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      {onAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={onAction} variant="primary" size="lg" className="gap-2">
            <ApperIcon name="Plus" className="w-4 h-4" />
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;