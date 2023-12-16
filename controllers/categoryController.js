import categoryRepository from '../repositories/categoryRepository.js';
import path from "path"
import fs from "fs/promises"
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCategory = async (req, res) => {
  try {
    if (req.file) {
      const normalizedPath = path.normalize(req.file.path);
      req.body.imageUrl = normalizedPath;
    } 
    const category = await categoryRepository.createCategory(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  
  const existingCategory = await categoryRepository.getCategoryById(categoryId);

  if (existingCategory.length <= 0) {
    return res.status(404).json({ error: 'Category not found' });
  }
  if (req.file) {

    const normalizedPath = path.normalize(req.file.path);
    req.body.imageUrl = normalizedPath;
    const oldImagePath = existingCategory?.image_url;
    if (oldImagePath) {
      const oldImagePathOnDisk = path.resolve(oldImagePath);
      await fs.unlink(oldImagePathOnDisk);
    }
  } 
  const updatedCategoryData = req.body;

  try {
    const updatedCategory = await categoryRepository.updateCategory(categoryId, updatedCategoryData);

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Add more controller methods as needed

export { getAllCategories, createCategory, updateCategory };
