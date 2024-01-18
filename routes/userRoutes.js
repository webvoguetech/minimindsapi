// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Route for initiating Google login
router.get('/auth/google', userController.googleLogin);
router.get('/updatelevel/:userId/:categoryId/:newLevel', userController.updateUserLevel);

// Callback route for handling Google login redirection
router.get('/auth/google/callback', userController.googleLoginCallback, (req, res) => {
  // Redirect to the desired page after successful login
  res.redirect('/');
});

// Example protected route that requires authentication
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // Redirect to the login page if not authenticated
  res.redirect('/');
}

export default router;
