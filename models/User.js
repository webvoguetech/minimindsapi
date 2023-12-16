import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  // Add any other user-related fields you need
});

const User = mongoose.model('User', userSchema);

export default User;
