import { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast, parseISO } from "date-fns";
import { toast } from "react-toastify";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import CategoryTag from "@/components/molecules/CategoryTag";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  categories = [] 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await onToggleComplete(task.Id, !task.completed);
      if (!task.completed) {
        toast.success("Task completed! 🎉", {
          position: "top-right",
          autoClose: 2000
        });
      }
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(task.Id);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const category = categories.find(c => c.name === task.category);
  const categoryColor = category?.color || "#5B47E0";

  const isOverdue = task.dueDate && isPast(parseISO(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(parseISO(task.dueDate));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-task border border-gray-100 transition-all duration-200",
        "hover:shadow-task-hover hover:border-gray-200",
        task.completed && "task-completed",
        task.priority === "high" && !task.completed && "ring-2 ring-accent-100"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isCompleting}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className={cn(
              "text-heading-sm font-semibold text-gray-800 task-title",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: showActions ? 1 : 0,
                scale: showActions ? 1 : 0.8
              }}
              className="flex items-center gap-1"
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(task)}
                className="p-1 h-8 w-8"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDelete}
                className="p-1 h-8 w-8 text-accent-500 hover:text-accent-600 hover:bg-accent-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Description */}
          {task.description && (
            <p className={cn(
              "text-body-md text-gray-600 mb-4 line-clamp-2",
              task.completed && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}

          {/* Tags and Due Date */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <PriorityBadge priority={task.priority} />
              <CategoryTag 
                category={task.category}
                color={categoryColor}
                showIcon={false}
              />
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-body-sm",
                isOverdue && !task.completed && "text-accent-600 font-medium",
                isDueToday && !task.completed && "text-warning-600 font-medium",
                !isOverdue && !isDueToday && "text-gray-500",
                task.completed && "text-gray-400"
              )}>
                <ApperIcon 
                  name={isOverdue && !task.completed ? "AlertTriangle" : "Calendar"} 
                  className="w-4 h-4" 
                />
                <span>
                  {isDueToday ? "Due today" : format(parseISO(task.dueDate), "MMM dd")}
                  {isOverdue && !task.completed && " (Overdue)"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion Animation Overlay */}
      {isCompleting && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 bg-success-500/10 rounded-xl flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          >
            <ApperIcon name="Loader2" className="w-6 h-6 text-success-500" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskCard;