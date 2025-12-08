import { Router } from 'express';
import {
  getPricingPlans,
  getPricingPlanById,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan
} from '../controllers/pricing.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getPricingPlans);
router.get('/:id', getPricingPlanById);

// Protected admin routes
router.post('/', authenticate, createPricingPlan);
router.put('/:id', authenticate, updatePricingPlan);
router.delete('/:id', authenticate, deletePricingPlan);

export default router;
