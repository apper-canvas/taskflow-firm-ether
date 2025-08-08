import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, showRetry = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-accent-500" />
      </div>
      <h3 className="text-heading-md font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-body-md text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="primary" className="gap-2">
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;