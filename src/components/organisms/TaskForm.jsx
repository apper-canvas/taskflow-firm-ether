import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel, 
  categories = [],
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "work",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});

useEffect(() => {
    if (task) {
      // Handle category lookup - task.category might be an object or string
      const taskCategoryName = task.category?.Name || task.category || "work";
      
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        category: taskCategoryName,
        dueDate: task.due_date || ""
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    
    if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    try {
      await onSubmit(formData);
      toast.success(task ? "Task updated successfully!" : "Task created successfully!");
    } catch (error) {
      toast.error("Failed to save task. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const isEditing = !!task;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-6 shadow-elevated border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-md font-semibold text-gray-800 flex items-center gap-2">
          <ApperIcon name={isEditing ? "Edit3" : "Plus"} className="w-5 h-5 text-primary-500" />
          {isEditing ? "Edit Task" : "Create New Task"}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="p-2 h-8 w-8"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <FormField
          label="Task Title"
          required
          error={errors.title}
          id="title"
        >
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter task title..."
            error={!!errors.title}
            autoFocus={!isEditing}
          />
        </FormField>

        {/* Description */}
        <FormField
          label="Description"
          error={errors.description}
          id="description"
        >
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add task description (optional)..."
            rows={3}
            error={!!errors.description}
          />
        </FormField>

        {/* Priority and Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Priority"
            id="priority"
          >
            <Select
              id="priority"
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </FormField>

          <FormField
            label="Category"
            id="category"
          >
            <Select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.Id} value={category.name}>
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        {/* Due Date */}
        <FormField
          label="Due Date"
          error={errors.dueDate}
          id="dueDate"
        >
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            error={!!errors.dueDate}
            min={new Date().toISOString().split('T')[0]}
          />
        </FormField>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!formData.title.trim()}
            className="gap-2"
          >
            <ApperIcon name={isEditing ? "Save" : "Plus"} className="w-4 h-4" />
            {isEditing ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;