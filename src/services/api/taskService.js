import { toast } from 'react-toastify';

// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'task';

// Helper function to identify lookup fields
const lookupFields = ['category'];

// Helper function to prepare lookup fields for create/update
const prepareLookupFields = (data) => {
  const prepared = { ...data };
  lookupFields.forEach(fieldName => {
    if (prepared[fieldName] !== undefined && prepared[fieldName] !== null) {
      // Handle both object and direct value inputs
      if (typeof prepared[fieldName] === 'object' && prepared[fieldName].Name) {
        // For category lookup, find the category by name and use its Id
        prepared[fieldName] = prepared[fieldName].Id || prepared[fieldName];
      } else if (typeof prepared[fieldName] === 'string') {
        // If it's a category name string, we need to handle this appropriately
        // For now, pass it as is - the UI should handle category selection properly
        prepared[fieldName] = prepared[fieldName];
      }
    }
  });
  return prepared;
};

export const taskService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "category" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "archived" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Handle empty results
      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "category" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "archived" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(taskData) {
    try {
      const preparedData = prepareLookupFields({
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority,
        category: taskData.category,
        due_date: taskData.dueDate || null,
        completed: false,
        created_at: new Date().toISOString(),
        completed_at: null,
        archived: false
      });

      const params = {
        records: [preparedData]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to create task");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const preparedUpdates = prepareLookupFields({
        Id: parseInt(id),
        ...updates
      });

      // Handle completion status changes
      if (updates.completed !== undefined) {
        preparedUpdates.completed_at = updates.completed ? new Date().toISOString() : null;
      }

      // Map dueDate to due_date if provided
      if (updates.dueDate !== undefined) {
        preparedUpdates.due_date = updates.dueDate;
        delete preparedUpdates.dueDate;
      }

      const params = {
        records: [preparedUpdates]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update task ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      throw new Error("Failed to update task");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete task ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  // Additional methods for filtering - these now use the main getAll and filter client-side
  // In a production app, you might want to implement server-side filtering

  async getByCategory(category) {
    const allTasks = await this.getAll();
    return allTasks.filter(task => {
      const taskCategory = task.category?.Name || task.category;
      return taskCategory === category;
    });
  },

  async getByPriority(priority) {
    const allTasks = await this.getAll();
    return allTasks.filter(task => task.priority === priority);
  },

  async getCompleted() {
    const allTasks = await this.getAll();
    return allTasks.filter(task => task.completed);
  },

  async getPending() {
    const allTasks = await this.getAll();
    return allTasks.filter(task => !task.completed);
  },

  async getOverdue() {
    const allTasks = await this.getAll();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return allTasks.filter(task => {
      if (!task.due_date || task.completed) return false;
      const dueDate = new Date(task.due_date);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  },

  async getDueToday() {
    const allTasks = await this.getAll();
    const today = new Date().toISOString().split('T')[0];
    return allTasks.filter(task => task.due_date === today && !task.completed);
  },

  async search(query) {
    const allTasks = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return allTasks.filter(task => 
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery)
    );
  }
};