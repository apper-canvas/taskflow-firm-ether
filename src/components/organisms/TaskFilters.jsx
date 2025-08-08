import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryTag from "@/components/molecules/CategoryTag";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskFilters = ({ 
  categories = [], 
  currentCategory = null,
  currentPriority = null,
  onFilterChange,
  taskCounts = {}
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const filterOptions = [
    {
      type: "status",
      label: "All Tasks",
      value: "all",
      icon: "List",
      count: taskCounts.total || 0,
      active: !currentCategory && !currentPriority && !location.pathname.includes("/")
    },
    {
      type: "status", 
      label: "Due Today",
      value: "today",
      icon: "Calendar",
      count: taskCounts.today || 0,
      active: location.pathname === "/today"
    },
    {
      type: "status",
      label: "Overdue",
      value: "overdue", 
      icon: "AlertTriangle",
      count: taskCounts.overdue || 0,
      active: location.pathname === "/overdue"
    },
    {
      type: "status",
      label: "Completed",
      value: "completed",
      icon: "CheckCircle",
      count: taskCounts.completed || 0,
      active: location.pathname === "/completed"
    }
  ];

  const priorityOptions = [
    { label: "High Priority", value: "high", color: "#FF6B6B" },
    { label: "Medium Priority", value: "medium", color: "#FFE66D" },
    { label: "Low Priority", value: "low", color: "#4ECDC4" }
  ];

  const handleStatusFilter = (value) => {
    if (value === "all") {
      navigate("/");
    } else {
      navigate(`/${value}`);
    }
    onFilterChange({ type: "status", value });
  };

  const handleCategoryFilter = (category) => {
    if (currentCategory === category) {
      navigate("/");
      onFilterChange({ type: "category", value: null });
    } else {
      navigate(`/category/${category}`);
      onFilterChange({ type: "category", value: category });
    }
  };

  const handlePriorityFilter = (priority) => {
    if (currentPriority === priority) {
      navigate("/");
      onFilterChange({ type: "priority", value: null });
    } else {
      navigate(`/priority/${priority}`);
      onFilterChange({ type: "priority", value: priority });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card border border-white/20 space-y-6"
    >
      {/* Status Filters */}
      <div>
        <h3 className="text-body-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Status
        </h3>
        <div className="space-y-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={option.active ? "primary" : "ghost"}
              size="sm"
              onClick={() => handleStatusFilter(option.value)}
              className={cn(
                "w-full justify-between text-left",
                option.active && "shadow-md"
              )}
            >
              <div className="flex items-center gap-2">
                <ApperIcon name={option.icon} className="w-4 h-4" />
                <span>{option.label}</span>
              </div>
              <span className={cn(
                "text-body-sm px-2 py-1 rounded-full min-w-[1.5rem] text-center",
                option.active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              )}>
                {option.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <h3 className="text-body-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryTag
              key={category.Id}
              category={category.name}
              color={category.color}
              active={currentCategory === category.name}
              onClick={() => handleCategoryFilter(category.name)}
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Priority Filters */}
      <div>
        <h3 className="text-body-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Priority
        </h3>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((priority) => (
            <Button
              key={priority.value}
              variant={currentPriority === priority.value ? "primary" : "secondary"}
              size="sm"
              onClick={() => handlePriorityFilter(priority.value)}
              className="capitalize"
              style={{
                backgroundColor: currentPriority === priority.value ? priority.color : undefined,
                borderColor: priority.color
              }}
            >
              {priority.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(currentCategory || currentPriority) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigate("/");
              onFilterChange({ type: "clear", value: null });
            }}
            className="w-full gap-2 text-gray-600 hover:text-gray-800"
          >
            <ApperIcon name="X" className="w-4 h-4" />
            Clear Filters
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskFilters;