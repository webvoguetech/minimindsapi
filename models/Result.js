import mongoose from 'mongoose';
const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  // Add more fields as needed
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
