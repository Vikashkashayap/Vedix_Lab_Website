import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  category: 'agent' | 'tool' | 'platform';
  cta: 'View Demo' | 'Buy Now' | 'Coming Soon';
}

const Products = () => {
  const { clickSound, hoverSound } = useAudioFeedback();

  // Scroll animations
  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const productsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 });

  const products: Product[] = [
    {
      id: 'ai-customer-agent',
      title: 'AI Customer Support Agent',
      description: 'Intelligent customer support agent that handles inquiries, resolves issues, and learns from every interaction to improve service quality.',
      features: ['24/7 Support', 'Multi-language', 'CRM Integration', 'Analytics Dashboard'],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80',
      category: 'agent',
      cta: 'Buy Now'
    },
    {
      id: 'upsc-ai-coach',
      title: 'UPSC AI Coach',
      description: 'Personalized AI-powered coaching system for UPSC preparation with adaptive learning, mock tests, and intelligent study planning.',
      features: ['Adaptive Learning', 'Mock Tests', 'Study Analytics', 'Expert Guidance'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      category: 'tool',
      cta: 'View Demo'
    },
  
    {
      id: 'ai-content-generator',
      title: 'AI Content Generator',
      description: 'Advanced content creation tool powered by GPT-4 and custom models for marketing, blogs, social media, and technical documentation.',
      features: ['Multi-format Output', 'Brand Voice', 'SEO Optimization', 'Bulk Generation'],
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&q=80',
      category: 'tool',
      cta: 'View Demo'
    },
   
  ];

  const getCategoryColor = (category: Product['category']) => {
    switch (category) {
      case 'agent': return 'text-blue-400';
      case 'tool': return 'text-green-400';
      case 'platform': return 'text-purple-400';
      default: return 'text-vedix-red';
    }
  };

  const getCtaButton = (cta: Product['cta']) => {
    const baseClasses = "btn-red min-h-[44px] px-6 text-sm font-semibold tracking-wide touch-manipulation group relative overflow-hidden";

    if (cta === 'Coming Soon') {
      return (
        <button className="btn-outline-red min-h-[44px] px-6 text-sm font-semibold tracking-wide opacity-60 cursor-not-allowed">
          Coming Soon
        </button>
      );
    }

    return (
      <button
        onClick={() => clickSound()}
        onMouseEnter={() => hoverSound()}
        className={baseClasses}
      >
        <span className="relative z-10 flex items-center">
          {cta}
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    );
  };

  return (
    <section id="products" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div ref={headerAnimation.ref} className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full apple-glass text-sm font-medium text-vedix-red mb-6">
            <span className="w-2 h-2 bg-vedix-red rounded-full mr-3 animate-apple-pulse"></span>
            Our AI Products
          </div>

          <h2 className="heading-large mb-6 text-balance">
            Ready-to-Use <span className="text-vedix-red">AI Solutions</span>
          </h2>

          <p className="body-large max-w-3xl mx-auto text-vedix-white/70 text-balance">
            Discover our portfolio of AI products designed to solve real business challenges. From intelligent agents to automation platforms, find the perfect AI solution for your needs.
          </p>
        </div>

        <div ref={productsAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="apple-glass p-6 h-full hover:scale-[1.02] transition-all duration-500 hover:shadow-apple-medium relative overflow-hidden">
                <div className="relative z-10 h-full flex flex-col">
                  {/* Product Image */}
                  <div className="mb-6 relative overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-vedix-card/80 backdrop-blur-sm ${getCategoryColor(product.category)}`}>
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold mb-3 text-vedix-white group-hover:text-vedix-red transition-colors duration-300">
                      {product.title}
                    </h3>

                    <p className="text-vedix-gray/80 leading-relaxed text-sm mb-4 flex-1">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-vedix-red/10 text-vedix-red text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 2 && (
                          <span className="px-2 py-1 bg-vedix-gray/10 text-vedix-gray text-xs rounded-full">
                            +{product.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    {getCtaButton(product.cta)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-vedix-gray/70 mb-6">
            Need a custom AI solution? Let's build something extraordinary together.
          </p>
          <button
            onClick={() => {
              clickSound();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                const offset = 100;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => hoverSound()}
            className="btn-outline-red min-h-[52px] px-8 text-base font-semibold tracking-wide touch-manipulation group"
          >
            <span className="relative z-10 flex items-center">
              Discuss Custom Solution
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
