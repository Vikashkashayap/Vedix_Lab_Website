import { Request, Response } from 'express';
import Pricing from '../models/Pricing.model.js';

export const getPricingPlans = async (req: Request, res: Response) => {
  try {
    const plans = await Pricing.find().sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      data: plans,
      count: plans.length
    });
  } catch (error: any) {
    console.error('Error fetching pricing plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing plans',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getPricingPlanById = async (req: Request, res: Response) => {
  try {
    const plan = await Pricing.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error: any) {
    console.error('Error fetching pricing plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing plan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const createPricingPlan = async (req: Request, res: Response) => {
  try {
    const plan = new Pricing(req.body);
    await plan.save();

    res.status(201).json({
      success: true,
      message: 'Pricing plan created successfully',
      data: plan
    });
  } catch (error: any) {
    console.error('Error creating pricing plan:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create pricing plan',
      error: error.message
    });
  }
};

export const updatePricingPlan = async (req: Request, res: Response) => {
  try {
    const plan = await Pricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pricing plan updated successfully',
      data: plan
    });
  } catch (error: any) {
    console.error('Error updating pricing plan:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update pricing plan',
      error: error.message
    });
  }
};

export const deletePricingPlan = async (req: Request, res: Response) => {
  try {
    const plan = await Pricing.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pricing plan deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting pricing plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete pricing plan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
