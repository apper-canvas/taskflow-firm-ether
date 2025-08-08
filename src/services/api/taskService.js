import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const taskService = {
  async getAll() {
    await delay();
    return [...tasks];
  },

  async getById(id) {
    await delay();
    return tasks.find(task => task.Id === parseInt(id));
  },

  async create(taskData) {
    await delay();
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      archived: false
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay();
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index !== -1) {
      // Handle completion status changes
      if (updates.completed !== undefined && updates.completed !== tasks[index].completed) {
        updates.completedAt = updates.completed ? new Date().toISOString() : null;
      }
      
      tasks[index] = { ...tasks[index], ...updates };
      return { ...tasks[index] };
    }
    throw new Error("Task not found");
  },

  async delete(id) {
    await delay();
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index !== -1) {
      const deletedTask = tasks[index];
      tasks.splice(index, 1);
      return deletedTask;
    }
    throw new Error("Task not found");
  },

  async getByCategory(category) {
    await delay();
    return tasks.filter(task => task.category === category);
  },

  async getByPriority(priority) {
    await delay();
    return tasks.filter(task => task.priority === priority);
  },

  async getCompleted() {
    await delay();
    return tasks.filter(task => task.completed);
  },

  async getPending() {
    await delay();
    return tasks.filter(task => !task.completed);
  },

  async getOverdue() {
    await delay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  },

  async getDueToday() {
    await delay();
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === today && !task.completed);
  },

  async search(query) {
    await delay();
    const lowerQuery = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery)
    );
  }
};