import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import Header from './Header';
import Footer from './Footer';

interface Service {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultServices: Service[] = [
    {
      icon: '🚀',
      title: 'Custom SaaS Development',
      description: 'Launch scalable SaaS platforms tailored to your vision with world-class architecture & performance.',
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      order: 0,
    },
    {
      icon: '💻',
      title: 'Website & App Development',
      description: 'High-speed, SEO-optimized websites & mobile apps built with modern frameworks.',
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80",
      order: 1,
    },
    {
      icon: '🤖',
      title: 'AI Agents & Chatbot Automation',
      description: 'Smart conversational agents that automate customer support, sales & operations.',
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      order: 2,
    },
    {
      icon: '📊',
      title: 'Admin Panels & Dashboards',
      description: 'Interactive dashboards with analytics, role-based access, and business automation.',
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      order: 3,
    },
    {
      icon: '📈',
      title: 'SEO & Digital Marketing',
      description: 'AI-driven SEO, content automation, and digital marketing strategies for consistent growth.',
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2d1f6?w=400&q=80",
      order: 4,
    },
    {
      icon: '🎨',
      title: 'Branding & UI Design',
      description: 'Premium visuals, branding kits, and futuristic UI/UX for high conversion.',
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
      order: 5,
    },
  ];

  // Detailed descriptions for each service
  const detailedDescriptions: { [key: string]: string } = {
    'Custom SaaS Development': `Transform your business idea into a powerful, scalable Software-as-a-Service platform. Our expert team specializes in building custom SaaS solutions that are designed to grow with your business.

We leverage cutting-edge technologies and best practices to create robust, secure, and high-performance applications. From initial concept to deployment and beyond, we ensure your SaaS platform delivers exceptional user experiences while maintaining enterprise-level security and scalability.

Our approach includes:
• Custom architecture tailored to your specific needs
• Scalable infrastructure that grows with your business
• Modern tech stack for optimal performance
• Comprehensive security measures
• Ongoing support and maintenance
• Seamless integrations with third-party services`,

    'Website & App Development': `Create stunning, high-performance websites and mobile applications that captivate your audience and drive results. We combine modern design principles with cutting-edge development practices to deliver exceptional digital experiences.

Whether you need a responsive website, a native mobile app, or a progressive web application, our team has the expertise to bring your vision to life. We focus on speed, SEO optimization, and user experience to ensure your digital presence stands out.

Key features:
• Lightning-fast load times and optimized performance
• SEO-friendly architecture for better search rankings
• Responsive design that works on all devices
• Modern frameworks (React, Next.js, Vue, etc.)
• Mobile-first approach
• Cross-platform compatibility`,

    'AI Agents & Chatbot Automation': `Revolutionize your customer interactions with intelligent AI-powered chatbots and automation agents. Our AI solutions automate customer support, sales processes, and operational tasks, freeing up your team to focus on strategic initiatives.

We build conversational AI agents that understand context, learn from interactions, and provide personalized experiences. From simple FAQ bots to complex multi-agent systems, we create AI solutions that enhance productivity and customer satisfaction.

Capabilities include:
• Natural language processing and understanding
• 24/7 automated customer support
• Sales automation and lead qualification
• Multi-channel integration (web, mobile, messaging apps)
• Learning and improvement over time
• Seamless handoff to human agents when needed`,

    'Admin Panels & Dashboards': `Get powerful insights into your business with custom admin panels and interactive dashboards. We create intuitive, data-rich interfaces that help you make informed decisions and manage your operations efficiently.

Our dashboards provide real-time analytics, role-based access control, and automation capabilities. Whether you need to monitor KPIs, manage users, or automate workflows, we build solutions that streamline your operations.

Features:
• Real-time data visualization and analytics
• Role-based access control and permissions
• Customizable widgets and reports
• Business process automation
• Integration with existing systems
• Mobile-responsive admin interfaces`,

    'SEO & Digital Marketing': `Boost your online presence and drive consistent growth with our AI-powered SEO and digital marketing strategies. We combine data-driven insights with cutting-edge automation to help you reach your target audience and achieve your business goals.

Our comprehensive approach covers everything from technical SEO optimization to content creation and social media marketing. We use AI tools to analyze trends, optimize content, and automate marketing workflows.

Services include:
• Technical SEO audits and optimization
• AI-driven content creation and optimization
• Keyword research and strategy
• Link building and outreach
• Social media marketing automation
• Performance tracking and analytics`,

    'Branding & UI Design': `Create a memorable brand identity and stunning user interfaces that convert visitors into customers. Our design team specializes in creating premium visuals, comprehensive branding kits, and futuristic UI/UX designs that leave a lasting impression.

We understand that great design is more than just aesthetics—it's about creating experiences that resonate with your audience and drive action. From logo design to complete brand guidelines, we help you build a cohesive visual identity.

What we deliver:
• Complete branding packages and style guides
• Modern, conversion-focused UI/UX designs
• Prototyping and user testing
• Design system creation
• Responsive design for all devices
• Premium visual assets and graphics`
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          // Try to fetch from API first
          const response = await api.getServices();
          const foundService = response.data.find((s: Service) => 
            s._id === id || s.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
          );
          
          if (foundService) {
            setService(foundService);
          } else {
            // Fallback to default services
            const defaultService = defaultServices.find(s => 
              s.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase() ||
              s._id === id
            );
            setService(defaultService || null);
          }
        }
      } catch (error) {
        // Fallback to default services
        const defaultService = defaultServices.find(s => 
          s.title.toLowerCase().replace(/\s+/g, '-') === id?.toLowerCase() ||
          s._id === id
        );
        setService(defaultService || null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-vedix-black">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="text-vedix-red">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-vedix-black">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-vedix-red mb-4">Service Not Found</h1>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-vedix-red text-vedix-white rounded-lg font-semibold hover:bg-vedix-red/80 transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const detailedDescription = detailedDescriptions[service.title] || service.description;

  return (
    <div className="min-h-screen bg-vedix-black">
      <Header />
      <div className="container mx-auto px-6 py-12 md:py-20">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-vedix-red hover:text-vedix-red/80 transition-colors group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Services
        </button>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Icon and Title */}
            <div className="flex items-center mb-6">
              <div className="text-6xl mr-4">{service.icon}</div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-vedix-red">
                {service.title}
              </h1>
            </div>

            {/* Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {detailedDescription}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 pt-8 border-t border-vedix-red/20">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-vedix-red to-vedix-red-light text-vedix-white rounded-lg font-semibold hover:shadow-vedix-red transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-4 glass text-vedix-red rounded-lg font-semibold hover:bg-vedix-card/70 transition-all duration-300"
                >
                  View All Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;

