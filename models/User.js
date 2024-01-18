import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  currentLevel: {
    type: String,
    default: '1',
  },
});

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  levels: [levelSchema],
});




const User = mongoose.model('User', userSchema);

export default User;
