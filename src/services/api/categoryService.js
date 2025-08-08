import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = () => new Promise(resolve => setTimeout(resolve, 200));

export const categoryService = {
  async getAll() {
    await delay();
    return [...categories];
  },

  async getById(id) {
    await delay();
    return categories.find(category => category.Id === parseInt(id));
  },

  async create(categoryData) {
    await delay();
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      ...categoryData,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay();
    const index = categories.findIndex(category => category.Id === parseInt(id));
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates };
      return { ...categories[index] };
    }
    throw new Error("Category not found");
  },

  async delete(id) {
    await delay();
    const index = categories.findIndex(category => category.Id === parseInt(id));
    if (index !== -1) {
      const deletedCategory = categories[index];
      categories.splice(index, 1);
      return deletedCategory;
    }
    throw new Error("Category not found");
  },

  async updateTaskCount(categoryName, count) {
    await delay();
    const category = categories.find(c => c.name === categoryName);
    if (category) {
      category.taskCount = count;
      return { ...category };
    }
    return null;
  }
};