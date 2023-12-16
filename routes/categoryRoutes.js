import express from 'express';
import categoryRepository from '../repositories/categoryRepository.js';
import Fileupload from '../middlewares/fileupload.middleware.js';
import { createCategory } from '../controllers/categoryController.js';
const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific category by ID
router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryRepository.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new category
router.post('/',Fileupload.single("image_url"), async (req, res) => {
  createCategory(req, res);
});

// Update a category by ID
router.put('/:categoryId', async (req, res) => {
  updateCategory(req, res);
});

// Delete a category by ID
router.delete('/:categoryId', async (req, res) => {

});

export default router;
