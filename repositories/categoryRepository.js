import Category from '../models/Category.js';

class CategoryRepository {
  async getAllCategories() {
    return Category.find();
  }

  async getCategoryById(categoryId) {
    return Category.findById(categoryId);
  }

  async createCategory(categoryData) {
    const category = new Category(categoryData);
    return await category.save();
  }

  async updateCategory(categoryId, updatedCategoryData) {
    return Category.findByIdAndUpdate(categoryId, updatedCategoryData, { new: true });
  }

  async deleteCategory(categoryId) {
    return Category.findByIdAndDelete(categoryId);
  }
}

export default new CategoryRepository();
