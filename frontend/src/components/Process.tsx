import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
}

const Process = () => {
  // Scroll animations
  const headerAnimation = useScrollAnimation({ delay: 100 });
  const processAnimation = useScrollAnimation({ delay: 300 });
  const methodologyAnimation = useScrollAnimation({ delay: 500 });

  const processSteps: ProcessStep[] = [
    {
      step: '01',
      title: 'AI Readiness Assessment',
      description: 'We evaluate your current systems, data infrastructure, and business processes to determine AI readiness and identify high-impact opportunities.',
      details: [
        'Technical infrastructure audit',
        'Data quality and availability assessment',
        'Business process analysis',
        'ROI potential evaluation'
      ],
      icon: '🔍',
      color: 'text-blue-400'
    },
    {
      step: '02',
      title: 'AI Strategy & Planning',
      description: 'Collaborative strategy development defining AI use cases, technology stack, implementation roadmap, and success metrics.',
      details: [
        'AI use case prioritization',
        'Technology stack selection',
        'Implementation timeline planning',
        'Success metrics definition'
      ],
      icon: '🎯',
      color: 'text-green-400'
    },
    {
      step: '03',
      title: 'Data Preparation & Engineering',
      description: 'Building robust data pipelines, cleaning datasets, and creating the foundation for AI model training and deployment.',
      details: [
        'Data pipeline development',
        'Data cleaning and preprocessing',
        'Feature engineering',
        'Data security and compliance'
      ],
      icon: '🗄️',
      color: 'text-purple-400'
    },
    {
      step: '04',
      title: 'AI Model Development',
      description: 'Custom AI model development using state-of-the-art machine learning techniques, fine-tuning, and validation.',
      details: [
        'Model architecture design',
        'Training and fine-tuning',
        'Performance optimization',
        'Model validation and testing'
      ],
      icon: '🧠',
      color: 'text-red-400'
    },
    {
      step: '05',
      title: 'Integration & Deployment',
      description: 'Seamless integration with existing systems, production deployment, and establishment of monitoring infrastructure.',
      details: [
        'API development and integration',
        'Production deployment',
        'Performance monitoring setup',
        'Scalability configuration'
      ],
      icon: '🚀',
      color: 'text-yellow-400'
    },
    {
      step: '06',
      title: 'Continuous Learning & Optimization',
      description: 'Ongoing model improvement through continuous learning, A/B testing, and performance optimization based on real-world usage.',
      details: [
        'Performance monitoring',
        'Model retraining and updates',
        'A/B testing and experimentation',
        'ROI measurement and reporting'
      ],
      icon: '📈',
      color: 'text-cyan-400'
    }
  ];

  const methodologyPrinciples = [
    {
      title: 'Human-Centered AI',
      description: 'We design AI systems that augment human capabilities, not replace them, ensuring ethical and responsible AI deployment.',
      icon: '👥'
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Every AI solution is backed by rigorous data analysis, statistical validation, and measurable business outcomes.',
      icon: '📊'
    },
    {
      title: 'Scalable Architecture',
      description: 'Our AI systems are built for scale from day one, ensuring performance and reliability as your business grows.',
      icon: '⚡'
    },
    {
      title: 'Continuous Innovation',
      description: 'We stay at the forefront of AI research and technology, continuously improving our solutions with the latest advancements.',
      icon: '🔬'
    },
    {
      title: 'Security First',
      description: 'AI security and data privacy are paramount, with enterprise-grade security measures built into every solution.',
      icon: '🔒'
    },
    {
      title: 'Measurable Results',
      description: 'We focus on delivering quantifiable business value through clear KPIs, ROI tracking, and performance metrics.',
      icon: '🎯'
    }
  ];

  return (
    <section id="process" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerAnimation.ref} className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-glass text-xs sm:text-sm font-medium text-vedix-red mb-4 sm:mb-5 md:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vedix-red rounded-full mr-2 sm:mr-3 animate-apple-pulse"></span>
            Our AI Development Process
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] mb-4 sm:mb-5 md:mb-6 text-balance">
            Systematic <span className="text-vedix-red">AI Innovation</span> Methodology
          </h2>

          <p className="text-base sm:text-lg md:text-xl leading-[1.7] max-w-3xl mx-auto text-vedix-white/70 text-balance px-4 sm:px-0">
            Our proven 6-step AI development process ensures successful deployment of intelligent solutions that deliver measurable business value and scale with your growth.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={processAnimation.ref} className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-vedix-red/50 to-transparent z-0 transform translate-x-0 max-w-[calc(100%-1rem)]"></div>
                )}

                <div className="apple-glass p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl h-full hover:scale-[1.02] transition-all duration-200 hover:shadow-apple-medium relative z-10">
                  <div className="relative h-full flex flex-col">
                    {/* Step Number and Icon */}
                    <div className="flex items-center mb-3 sm:mb-4 md:mb-5">
                      <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-vedix-red/10 rounded-full mr-3 sm:mr-4">
                        <span className={`text-base sm:text-lg md:text-xl ${step.color}`}>{step.icon}</span>
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-vedix-red">
                        {step.step}
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-[1.35] mb-2 sm:mb-3 md:mb-4 text-vedix-white group-hover:text-vedix-red transition-colors duration-200">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base md:text-lg leading-[1.7] text-vedix-gray/80 mb-3 sm:mb-4 md:mb-5 flex-grow">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-1.5 sm:space-y-2 mt-auto">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center text-xs sm:text-sm">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-vedix-red rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                          <span className="text-vedix-gray/70">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Principles */}
        <div ref={methodologyAnimation.ref}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.2] mb-3 sm:mb-4 md:mb-5">
              Our <span className="text-vedix-red">AI Development</span> Principles
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-[1.7] text-vedix-gray/70 max-w-2xl mx-auto px-4 sm:px-0">
              Core principles that guide every AI project we undertake, ensuring ethical, scalable, and impactful solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {methodologyPrinciples.map((principle, index) => (
              <div
                key={index}
                className="apple-glass p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl text-center group hover:scale-[1.02] transition-all duration-200 hover:shadow-apple-medium h-full flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-5 text-vedix-red/80 group-hover:text-vedix-red transition-colors duration-200">
                  {principle.icon}
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-semibold leading-[1.35] mb-2 sm:mb-3 md:mb-4 text-vedix-white">
                  {principle.title}
                </h4>
                <p className="text-sm sm:text-base md:text-lg leading-[1.7] text-vedix-gray/80 flex-grow">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-14 md:mt-16 lg:mt-20">
          <div className="apple-glass p-6 sm:p-7 md:p-8 lg:p-10 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-[1.2] mb-3 sm:mb-4 md:mb-5">
              Ready to Start Your <span className="text-vedix-red">AI Journey?</span>
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-[1.7] text-vedix-gray/80 mb-6 sm:mb-7 md:mb-8">
              Our systematic approach ensures your AI project delivers real business value. Let's discuss how we can transform your operations with intelligent automation.
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const offset = 100;
                  const elementPosition = contactSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="btn-red h-11 px-6 text-sm font-semibold touch-manipulation group relative overflow-hidden shadow-apple-red-glow hover:shadow-apple-red-glow-hover transition-all duration-200"
            >
              <span className="relative z-10 flex items-center">
                Begin Your AI Transformation
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
