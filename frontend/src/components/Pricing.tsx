import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import Skeleton from './ui/Skeleton';

interface PricingPlan {
  _id?: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
  order: number;
}

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: sectionRef, isIntersecting: sectionVisible } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await api.getPricing();
      if (response && response.data) {
        setPlans(response.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 px-4">
            <Skeleton className="h-12 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="glass rounded-2xl p-8 space-y-6">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-12 w-32" />
                <Skeleton variant="text" lines={4} />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 px-4 transition-all duration-1000 ${sectionVisible ? 'animate-slideInTop' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-vedix-red/20 text-sm font-medium text-vedix-red mb-6">
            <span className="w-2 h-2 bg-vedix-red rounded-full mr-3 animate-pulse"></span>
            Pricing
          </div>

          <h2 className="heading-large mb-6 text-balance">
            Choose Your <span className="text-vedix-red">Growth Plan</span>
          </h2>

          <p className="body-large max-w-3xl mx-auto text-vedix-white/70 text-balance">
            Transparent pricing designed to scale with your business. No hidden fees, no surprises.
          </p>
        </div>

        {plans.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {plans
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((plan, index) => {
                const delayClass = `animate-delay-${Math.min((index + 1) * 200, 600)}`;
                const animationClasses = sectionVisible ? `animate-slideInBottom ${delayClass}` : 'opacity-0 translate-y-10';

                return (
                  <div
                    key={plan._id || index}
                    className={`relative group ${animationClasses}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-vedix-red text-vedix-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className={`holographic-card hover:scale-[1.02] transition-all duration-500 ${plan.popular ? 'ring-2 ring-vedix-red/50 shadow-vedix-red/20' : ''}`}>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-heading font-semibold mb-2 text-vedix-white">
                          {plan.name}
                        </h3>
                        <p className="text-vedix-gray/70 text-sm mb-6">{plan.tagline}</p>

                        <div className="mb-6">
                          <span className="text-4xl font-mono font-bold text-vedix-red">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-vedix-gray/60 ml-1">/ {plan.period}</span>
                          )}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features && plan.features.length > 0 ? (
                          plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-vedix-red rounded-full flex-shrink-0"></div>
                              <span className="text-vedix-white/80 text-sm">{feature}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-vedix-gray/50 text-sm">No features listed</li>
                        )}
                      </ul>

                      <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.popular ? 'btn-red' : 'btn-outline-red'}`}>
                        {plan.cta || 'Get Started'}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-gray-400 text-lg mb-4">
                Pricing plans are being updated
              </p>
              <p className="text-gray-500 text-sm">
                Please check back soon or contact us for custom pricing
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Pricing

