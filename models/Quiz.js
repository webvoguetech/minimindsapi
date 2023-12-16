import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  question: String,
  options: [String],
  correctAnswer: String,
  imageUrl: String,
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
