import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = null, 
  onRetry, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  categories = [],
  emptyTitle,
  emptyDescription,
  onAddTask
}) => {
  if (loading) {
    return <Loading type="skeleton" />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={onRetry}
        showRetry={!!onRetry}
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title={emptyTitle || "No tasks found"}
        description={emptyDescription || "Create your first task to get started organizing your day."}
        onAction={onAddTask}
        actionLabel="Add Task"
        icon="CheckSquare"
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ delay: index * 0.05 }}
            layout
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              categories={categories}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;