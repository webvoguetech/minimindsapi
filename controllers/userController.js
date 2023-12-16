// controllers/userController.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userRepository from '../repositories/userRepository.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: '637619515875-850vfpag4m1ovkbd2ua182bms3ukomrg.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/user/auth/google/callback',
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
