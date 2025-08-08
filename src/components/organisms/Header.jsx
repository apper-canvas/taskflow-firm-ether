import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  onSearch, 
  onAddTask, 
  searchQuery = "",
  totalTasks = 0,
  completedTasks = 0 
}) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md"
            >
              <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-heading-lg font-bold gradient-text">
                TaskFlow
              </h1>
              <p className="text-body-sm text-gray-600">
                {totalTasks > 0 
                  ? `${completedTasks}/${totalTasks} tasks completed (${completionRate}%)`
                  : "Ready to organize your day"
                }
              </p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden sm:block w-80">
              <SearchBar
                onSearch={onSearch}
                placeholder="Search tasks..."
                className="w-full"
              />
            </div>

            {/* Add Task Button */}
            <Button
              variant="primary"
              onClick={onAddTask}
              className="gap-2 shadow-md hover:shadow-lg"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden mt-4">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;