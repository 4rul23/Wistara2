import express from 'express';
import {
  register, login, logout, getCurrentUser, updateProfile
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isAuthenticated, getCurrentUser);
router.put('/profile', isAuthenticated, updateProfile);

export default router;
