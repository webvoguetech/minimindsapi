// controllers/userController.js
import dotenv from "dotenv"
dotenv.config()
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userRepository from '../repositories/userRepository.js';

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
};

export default userController;
