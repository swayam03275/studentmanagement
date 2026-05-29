import { Router } from 'express';
import { login, getProfile } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { loginSchema } from '../validators/authValidator.js';

const router = Router();

// Public route — authenticate and receive a JWT
router.post('/login', validate(loginSchema), login);

// Protected route — get the logged-in admin's profile
router.get('/profile', protect, getProfile);

export default router;
