import { Router } from 'express';
import {
  getContent,
  getContentBySection,
  upsertContent,
  getServices,
  createService,
  updateService,
  deleteService
} from '../controllers/content.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getContent);
router.get('/section/:section', getContentBySection);
router.get('/services', getServices);

// Protected admin routes
router.post('/section', authenticate, upsertContent);
router.put('/section/:section', authenticate, upsertContent);
router.post('/services', authenticate, createService);
router.put('/services/:id', authenticate, updateService);
router.delete('/services/:id', authenticate, deleteService);

export default router;
