// controllers/quizController.js
import quizRepository from '../repositories/quizRepository.js';
const getQuizzesByCategory = async (req, res) => {
  try {
    const { categoryId,level } = req.params;
    const quizzes = await quizRepository.getQuizzesByCategory(categoryId,level);
    if(quizzes.length > 0){
      return res.status(200).json(quizzes);
    }
    res.status(404).json({ success : false,error: 'Questions not Found' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createQuiz = async (req, res) => {
  try {
    const quizData = req.body;
    const quiz = await quizRepository.createQuiz(quizData);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const existingquiz = await quizRepository.getQuizzesById(quizId);

    if (existingquiz.length <= 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    const quizData = req.body;
    const updatedQuiz = await quizRepository.updateQuiz(quizId, quizData);
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    await quizRepository.deleteQuiz(quizId);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getQuizzesCategoryLevels = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const result = await quizRepository.getlevels(category_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getQuizzesByCategory, createQuiz, updateQuiz, deleteQuiz,getQuizzesCategoryLevels };
