import { Request, Response } from 'express';

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
}

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, projectType, budgetRange, message }: ContactFormData = req.body;

    // Validation
    if (!name || !email || !projectType || !budgetRange || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Here you can add:
    // - Send email using nodemailer
    // - Save to database
    // - Send notification
    
    console.log('Contact form submission:', {
      name,
      email,
      projectType,
      budgetRange,
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate async operation (e.g., saving to database)
    await new Promise(resolve => setTimeout(resolve, 500));

    res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      data: {
        name,
        email,
        projectType,
        budgetRange
      }
    });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
};

