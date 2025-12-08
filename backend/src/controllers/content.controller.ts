import { Request, Response } from 'express';
import Content from '../models/Content.model.js';
import Service from '../models/Service.model.js';

// Get all content sections
export const getContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.find();
    const services = await Service.find().sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      data: {
        content,
        services
      }
    });
  } catch (error: any) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get content by section
export const getContentBySection = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOne({ section: req.params.section });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content section not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error: any) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create or update content section
export const upsertContent = async (req: Request, res: Response) => {
  try {
    const { section } = req.body;

    const content = await Content.findOneAndUpdate(
      { section },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: content
    });
  } catch (error: any) {
    console.error('Error updating content:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update content',
      error: error.message
    });
  }
};

// Service management
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error: any) {
    console.error('Error creating service:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create service',
      error: error.message
    });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update service',
      error: error.message
    });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
