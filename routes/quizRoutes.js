import express from 'express';
import quizRepository from '../repositories/quizRepository.js';
import fileUploadMiddleware from '../middlewares/fileupload.middleware.js'; // Assuming you have a fileUpload middleware
import { createQuiz, deleteQuiz, getQuizzesByCategory, updateQuiz } from '../controllers/quizController.js';

const router = express.Router();

// Get quizzes by category
router.get('/:categoryId', async (req, res) => {
  getQuizzesByCategory(req, res);
});

// Create a new quiz
router.post('/', fileUploadMiddleware.single('image_url'), async (req, res) => {
  createQuiz(req, res);
});

// Update a quiz by ID
router.put('/:quizId', fileUploadMiddleware.single('image_url'), async (req, res) => {
  updateQuiz(req, res);
});

// Delete a quiz by ID
router.delete('/:quizId', async (req, res) => {
  deleteQuiz(req,res);
});

export default router;
