import { Request, Response } from 'express';

const services = [
  {
    id: 1,
    icon: '🚀',
    title: 'Custom SaaS Development',
    description: 'Launch scalable SaaS platforms tailored to your vision with world-class architecture & performance.',
  },
  {
    id: 2,
    icon: '💻',
    title: 'Website & App Development',
    description: 'High-speed, SEO-optimized websites & mobile apps built with modern frameworks.',
  },
  {
    id: 3,
    icon: '🤖',
    title: 'AI Agents & Chatbot Automation',
    description: 'Smart conversational agents that automate customer support, sales & operations.',
  },
  {
    id: 4,
    icon: '📊',
    title: 'Admin Panels & Dashboards',
    description: 'Interactive dashboards with analytics, role-based access, and business automation.',
  },
  {
    id: 5,
    icon: '📈',
    title: 'SEO & Digital Marketing',
    description: 'AI-driven SEO, content automation, and digital marketing strategies for consistent growth.',
  },
  {
    id: 6,
    icon: '🎨',
    title: 'Branding & UI Design',
    description: 'Premium visuals, branding kits, and futuristic UI/UX for high conversion.',
  },
];

export const getServices = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
};

export const getServiceById = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const service = services.find(s => s.id === id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error: any) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service'
    });
  }
};

