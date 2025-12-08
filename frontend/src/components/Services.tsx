import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Service {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

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
            <div className="text-neon-blue">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            What We <span className="neon-text">Build & Power</span> With AI
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to transform your business with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => (
            <div
              key={service._id || index}
              className="glass glass-hover rounded-2xl p-8 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-electric-purple/0 group-hover:from-neon-blue/10 group-hover:to-electric-purple/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-4 text-neon-blue group-hover:text-neon-blue/80 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
              {/* Neon border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-neon-blue/50 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

