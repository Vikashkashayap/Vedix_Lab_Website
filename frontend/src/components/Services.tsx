import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Service {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll animations for different sections
  const headerAnimation = useScrollAnimation({ delay: 100 });
  const servicesAnimation = useScrollAnimation({ delay: 300 });

  useEffect(() => {
    fetchServices();
  }, []);

  const defaultServices: Service[] = [
    {
      icon: '🤖',
      title: 'Custom AI Agents',
      description: 'Intelligent AI agents tailored to your business needs - from customer support to workflow automation and data analysis.',
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      order: 0,
    },
    {
      icon: '⚡',
      title: 'AI Automation Solutions',
      description: 'Streamline operations with intelligent automation that learns and adapts to your business processes.',
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80",
      order: 1,
    },
    {
      icon: '🌐',
      title: 'AI-Powered Websites',
      description: 'Intelligent websites with dynamic content, personalized user experiences, and AI-driven functionality.',
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80",
      order: 2,
    },
    {
      icon: '🎓',
      title: 'AI Education Tools',
      description: 'Advanced AI-powered tools for UPSC preparation, personalized learning, and educational content creation.',
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
      order: 3,
    },
    {
      icon: '📊',
      title: 'AI Analytics & Insights',
      description: 'Deep learning-powered analytics that uncover patterns, predict trends, and drive data-driven decisions.',
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      order: 4,
    },
    {
      icon: '🔧',
      title: 'AI Product Development',
      description: 'End-to-end development of AI products from concept to market, including ML model training and deployment.',
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80",
      order: 5,
    },
  ];

  const fetchServices = async () => {
    try {
      const response = await api.getServices();
      setServices(response.data);
    } catch (error) {
      // Fallback to default services if API fails
      setServices(defaultServices);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-vedix-red">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div ref={headerAnimation.ref} className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full apple-glass text-sm font-medium text-vedix-red mb-6">
            <span className="w-2 h-2 bg-vedix-red rounded-full mr-3 animate-apple-pulse"></span>
            AI Innovation Services
          </div>

          <h2 className="heading-large mb-6 text-balance">
            Our <span className="text-vedix-red">AI-Powered</span> Solutions
          </h2>

          <p className="body-large max-w-3xl mx-auto text-vedix-white/70 text-balance">
            From custom AI agents to intelligent automation and AI-driven websites, we deliver cutting-edge solutions that transform businesses through artificial intelligence
          </p>
        </div>

        <div ref={servicesAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const serviceId = service._id || service.title.toLowerCase().replace(/\s+/g, '-');
            return (
            <div
              key={service._id || index}
              onClick={() => navigate(`/service/${serviceId}`)}
              className="group cursor-pointer relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="apple-glass p-6 hover:scale-[1.02] transition-all duration-500 hover:shadow-apple-medium">
                <div className="relative z-10">
                  <div className="text-5xl mb-6 text-vedix-red/80 group-hover:text-vedix-red transition-colors duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-heading font-semibold mb-4 text-vedix-white group-hover:text-vedix-red transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-vedix-gray/80 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center text-vedix-red/60 group-hover:text-vedix-red transition-colors duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Services

