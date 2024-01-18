// controllers/userController.js
import dotenv from "dotenv"
dotenv.config()
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userRepository from '../repositories/userRepository.js';
import mongoose from "mongoose"
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userRepository.findOrCreateUser(profile);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});



const userController = {
  googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),

  googleLoginCallback: passport.authenticate('google', { failureRedirect: '/' }),

  // Add more controller methods as needed
  // Assuming userId is the user's MongoDB ID and newLevel is the level to be updated
  updateUserLevel: async (req, res) => {
    const { userId, categoryId,newLevel } = req.params;

  try {
    const user = await userRepository.findUser(userId);
    if (!user) {
      // Handle the case where the user is not found
      res.status(404).json({ success: false, message: `User not Found` });
    }

    // user.currentLevel = newLevel;
    // await user.save();

     // Assuming user.levels is an array of objects with categoryId and currentLevel
     const categoryIdObj = new mongoose.Types.ObjectId(categoryId);

     // Find the index of the level in the levels array
     const categoryIndex = user.levels.findIndex((level) => level.categoryId.equals(categoryIdObj));
     if (categoryIndex !== -1) {
       user.levels[categoryIndex].currentLevel = newLevel;
     } else {
       // If the category is not found, add it to the levels array
       user.levels.push({ categoryId, currentLevel: newLevel });
     }

     await user.save();
    res.status(200).json({ success: true, message: 'User level updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error updating user level: ${error.message}` });
  }
}

};

export default userController;
