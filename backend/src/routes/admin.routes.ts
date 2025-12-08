import { Router } from 'express';
import { login, verifyToken } from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/verify', authenticate, verifyToken);

export default router;
