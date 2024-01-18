// repositories/userRepository.js
import mongoose from 'mongoose';
import User from '../models/User.js';

class UserRepository {
  async findOrCreateUser(profile) {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          // Set other user-related fields here
        });

        await user.save();
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUser(userId){
    return  await User.findById(userId);
  }
}

export default new UserRepository();
