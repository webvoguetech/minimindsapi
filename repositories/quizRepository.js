import Quiz from '../models/Quiz.js';

class QuizRepository {
  async getQuizzesByCategory(categoryId) {
    return Quiz.find({ category: categoryId });
  }
  async getQuizzesById(quizId) {
    return Quiz.findOne({ _id: quizId });
  }


  async createQuiz(quizData) {
    const quiz = new Quiz(quizData);
    return quiz.save();
  }

  async updateQuiz(quizId, updatedQuizData) {
    return Quiz.findByIdAndUpdate(quizId, updatedQuizData, { new: true });
  }

  async deleteQuiz(quizId) {
    return Quiz.findByIdAndDelete(quizId);
  }
}

export default new QuizRepository();
