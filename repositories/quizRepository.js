import Quiz from '../models/Quiz.js';

class QuizRepository {
  async getQuizzesByCategory(categoryId, levels) {
    return Quiz.find({ category: categoryId, level:levels});
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

  async getlevels(categoryId){
    return Quiz.findOne({category: categoryId}).sort({ level: -1 }).limit(1).select({_id:0,level:1})
  }
}

export default new QuizRepository();
