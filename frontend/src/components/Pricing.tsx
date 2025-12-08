import { useState, useEffect } from 'react';
import { api } from '../utils/api';

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
          <div className="text-center">
            <div className="text-neon-blue">Loading pricing plans...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            Choose Your <span className="neon-text">Growth Plan</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 px-4">
            Flexible pricing options designed to scale with your business
          </p>
        </div>

        {plans.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            {plans
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((plan, index) => (
                <div
                  key={plan._id || index}
                  className={`glass rounded-2xl p-8 relative overflow-hidden ${
                    plan.popular ? 'border-2 border-neon-blue shadow-neon-blue' : ''
                  } glass-hover`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-neon-blue text-space-black text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className={`${plan.popular ? 'pt-8' : ''}`}>
                    <div className="mb-6">
                      <h3 className="text-3xl font-heading font-bold mb-2 text-neon-blue">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 mb-4">{plan.tagline}</p>
                      <div className="flex items-baseline mb-2">
                        <span className="text-4xl font-mono font-bold text-white">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-gray-400 ml-2">/ {plan.period}</span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features && plan.features.length > 0 ? (
                        plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <span className="text-neon-blue mt-1">✓</span>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 text-sm">No features listed</li>
                      )}
                    </ul>

                    <button
                      className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        plan.popular
                          ? 'bg-neon-blue text-space-black hover:shadow-neon-blue hover:scale-105'
                          : 'border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10'
                      }`}
                    >
                      {plan.cta || 'Get Started'}
                    </button>
                  </div>
                </div>
              ))}
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

