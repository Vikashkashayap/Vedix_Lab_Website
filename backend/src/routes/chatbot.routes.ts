import { Router } from 'express';
import { chatWithBot } from '../controllers/chatbot.controller.js';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for chatbot - more restrictive since it's AI-powered
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: 'Too many chatbot requests. Please wait a moment before trying again.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Test route to verify chatbot routes are working
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Chatbot routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Public route - anyone can use the chatbot
router.post('/chat', chatLimiter, chatWithBot);

export default router;

