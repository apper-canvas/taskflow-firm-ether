import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { isPast, isToday, parseISO } from "date-fns";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import TaskFilters from "@/components/organisms/TaskFilters";
import TaskStats from "@/components/molecules/TaskStats";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskListPage = () => {
  // State management
const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL params
  const { categoryName, priorityLevel } = useParams();
  const location = useLocation();

  // Load data on component mount
  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);

  // Filter tasks based on URL and search
  useEffect(() => {
    filterTasks();
  }, [tasks, categoryName, priorityLevel, location.pathname, searchQuery]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

const filterTasks = () => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Apply URL-based filters
    if (categoryName) {
      // Handle category lookup - compare with category name from lookup object or direct string
      filtered = filtered.filter(task => {
        const taskCategory = task.category?.Name || task.category;
        return taskCategory === categoryName;
      });
    } else if (priorityLevel) {
      filtered = filtered.filter(task => task.priority === priorityLevel);
    } else {
      // Handle special routes
      const path = location.pathname;
      switch (path) {
        case "/today":
          filtered = filtered.filter(task => 
            task.due_date && isToday(parseISO(task.due_date)) && !task.completed
          );
          break;
        case "/overdue":
          filtered = filtered.filter(task => {
            if (!task.due_date || task.completed) return false;
            const dueDate = parseISO(task.due_date);
            return isPast(dueDate) && !isToday(dueDate);
          });
          break;
        case "/completed":
          filtered = filtered.filter(task => task.completed);
          break;
        case "/upcoming":
          filtered = filtered.filter(task => {
            if (!task.due_date || task.completed) return false;
            const dueDate = parseISO(task.due_date);
            return !isPast(dueDate) || isToday(dueDate);
          });
          break;
        default:
          // Show all pending tasks by default
          filtered = filtered.filter(task => !task.completed);
      }
    }

    // Sort tasks: high priority first, then by due date, then by created date
    filtered.sort((a, b) => {
      // Priority order: high > medium > low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Due date order (nulls last)
      if (a.due_date && b.due_date) {
        return new Date(a.due_date) - new Date(b.due_date);
      }
      if (a.due_date) return -1;
      if (b.due_date) return 1;

      // Created date order (newest first)
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setFilteredTasks(filtered);
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.update(taskId, { completed });
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      throw new Error("Failed to update task");
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      const newTask = await taskService.create(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setShowTaskForm(false);
    } catch (err) {
      throw new Error("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      const updatedTask = await taskService.update(editingTask.Id, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        )
      );
      setEditingTask(null);
      setShowTaskForm(false);
    } catch (err) {
      throw new Error("Failed to update task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
    } catch (err) {
      throw new Error("Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleCancelForm = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    // This is handled by URL navigation in TaskFilters component
    console.log("Filter changed:", filter);
  };

  // Calculate task counts for stats and filters
const taskCounts = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => {
      if (!task.due_date || task.completed) return false;
      const dueDate = parseISO(task.due_date);
      return isPast(dueDate) && !isToday(dueDate);
    }).length,
    today: tasks.filter(task => 
      task.due_date && isToday(parseISO(task.due_date)) && !task.completed
    ).length
  };

  // Get page title based on current filter
  const getPageTitle = () => {
    if (categoryName) return `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Tasks`;
    if (priorityLevel) return `${priorityLevel.charAt(0).toUpperCase() + priorityLevel.slice(1)} Priority Tasks`;
    
    const path = location.pathname;
    switch (path) {
      case "/today": return "Due Today";
      case "/overdue": return "Overdue Tasks";
      case "/completed": return "Completed Tasks";
      case "/upcoming": return "Upcoming Tasks";
      default: return "All Tasks";
    }
  };

  const getEmptyState = () => {
    if (searchQuery) {
      return {
        title: "No tasks found",
        description: `No tasks match "${searchQuery}". Try adjusting your search terms.`
      };
    }

    if (categoryName) {
      return {
        title: `No ${categoryName} tasks`,
        description: `You don't have any tasks in the ${categoryName} category yet.`
      };
    }

    if (priorityLevel) {
      return {
        title: `No ${priorityLevel} priority tasks`,
        description: `You don't have any ${priorityLevel} priority tasks at the moment.`
      };
    }

    const path = location.pathname;
    switch (path) {
      case "/today":
        return {
          title: "Nothing due today",
          description: "Great! You don't have any tasks due today. Enjoy your free time!"
        };
      case "/overdue":
        return {
          title: "No overdue tasks",
          description: "Excellent! You're all caught up with your deadlines."
        };
      case "/completed":
        return {
          title: "No completed tasks yet",
          description: "Complete some tasks to see them here. You've got this!"
        };
      case "/upcoming":
        return {
          title: "No upcoming tasks",
          description: "You don't have any upcoming deadlines. Perfect time to plan ahead!"
        };
      default:
        return {
          title: "No tasks yet",
          description: "Create your first task to get started organizing your day."
        };
    }
  };

  const emptyState = getEmptyState();

  return (
    <div className="min-h-screen">
      <Header
        onSearch={handleSearch}
        onAddTask={handleAddTask}
        searchQuery={searchQuery}
        totalTasks={taskCounts.total}
        completedTasks={taskCounts.completed}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-display-sm font-bold text-gray-800 mb-2">
            {getPageTitle()}
          </h2>
          <p className="text-body-lg text-gray-600">
            {searchQuery 
              ? `${filteredTasks.length} result${filteredTasks.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''}`
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <TaskFilters
              categories={categories}
              currentCategory={categoryName}
              currentPriority={priorityLevel}
              onFilterChange={handleFilterChange}
              taskCounts={taskCounts}
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Task Stats */}
            <TaskStats
              totalTasks={taskCounts.total}
              completedTasks={taskCounts.completed}
              pendingTasks={taskCounts.pending}
              overdueTasks={taskCounts.overdue}
            />

            {/* Task Form */}
            {showTaskForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <TaskForm
                  task={editingTask}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={handleCancelForm}
                  categories={categories}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onRetry={loadTasks}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              categories={categories}
              emptyTitle={emptyState.title}
              emptyDescription={emptyState.description}
onAddTask={handleAddTask}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;