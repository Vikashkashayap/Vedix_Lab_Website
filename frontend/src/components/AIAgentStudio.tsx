import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

interface AgentType {
  title: string;
  description: string;
  capabilities: string[];
  useCases: string[];
  icon: string;
  color: string;
}

const AIAgentStudio = () => {
  const { clickSound, hoverSound } = useAudioFeedback();

  // Scroll animations
  const headerAnimation = useScrollAnimation({ delay: 100 });
  const agentsAnimation = useScrollAnimation({ delay: 300 });
  const processAnimation = useScrollAnimation({ delay: 500 });

  const agentTypes: AgentType[] = [
    {
      title: 'Conversational Agents',
      description: 'Intelligent chatbots and virtual assistants that understand context, maintain conversation flow, and provide personalized responses.',
      capabilities: ['Natural Language Processing', 'Context Awareness', 'Multi-turn Conversations', 'Personality Customization'],
      useCases: ['Customer Support', 'Lead Generation', 'Internal Help Desk', 'Virtual Sales Assistant'],
      icon: '💬',
      color: 'text-blue-400'
    },
    {
      title: 'Task Automation Agents',
      description: 'Specialized agents designed to automate complex workflows, data processing, and repetitive business operations.',
      capabilities: ['Workflow Orchestration', 'API Integration', 'Decision Making', 'Error Handling'],
      useCases: ['Data Processing', 'Invoice Management', 'Quality Control', 'Report Generation'],
      icon: '⚙️',
      color: 'text-green-400'
    },
    {
      title: 'Analytical Agents',
      description: 'AI agents that analyze data patterns, generate insights, and provide predictive analytics for strategic decision making.',
      capabilities: ['Data Analysis', 'Predictive Modeling', 'Trend Detection', 'Real-time Monitoring'],
      useCases: ['Business Intelligence', 'Risk Assessment', 'Performance Analytics', 'Market Research'],
      icon: '📊',
      color: 'text-purple-400'
    },
    {
      title: 'Creative Agents',
      description: 'AI agents focused on content creation, design assistance, and innovative problem-solving across creative domains.',
      capabilities: ['Content Generation', 'Design Assistance', 'Idea Generation', 'Style Adaptation'],
      useCases: ['Marketing Copy', 'Visual Design', 'Product Innovation', 'Content Strategy'],
      icon: '🎨',
      color: 'text-pink-400'
    },
    {
      title: 'Industry-Specific Agents',
      description: 'Tailored AI agents built for specific industries with domain expertise and specialized knowledge bases.',
      capabilities: ['Domain Knowledge', 'Regulatory Compliance', 'Industry Standards', 'Custom Workflows'],
      useCases: ['Healthcare', 'Legal Services', 'Financial Services', 'Education'],
      icon: '🏢',
      color: 'text-orange-400'
    },
    {
      title: 'Integration Agents',
      description: 'AI agents that seamlessly connect different systems, APIs, and platforms to create unified intelligent workflows.',
      capabilities: ['Multi-platform Integration', 'Data Synchronization', 'Event Processing', 'System Orchestration'],
      useCases: ['ERP Integration', 'CRM Automation', 'IoT Management', 'Cloud Services'],
      icon: '🔗',
      color: 'text-cyan-400'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description: 'We analyze your requirements, identify automation opportunities, and design the optimal AI agent architecture.'
    },
    {
      step: '02',
      title: 'AI Model Development',
      description: 'Our team builds and trains custom AI models using state-of-the-art machine learning techniques and frameworks.'
    },
    {
      step: '03',
      title: 'Integration & Testing',
      description: 'Seamless integration with your existing systems, followed by comprehensive testing and quality assurance.'
    },
    {
      step: '04',
      title: 'Deployment & Training',
      description: 'Production deployment with continuous learning capabilities and team training for optimal utilization.'
    },
    {
      step: '05',
      title: 'Monitoring & Optimization',
      description: 'Ongoing performance monitoring, A/B testing, and continuous improvement based on real-world usage data.'
    }
  ];

  return (
    <section id="ai-studio" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={headerAnimation.ref} className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full apple-glass text-sm font-medium text-vedix-red mb-6">
            <span className="w-2 h-2 bg-vedix-red rounded-full mr-3 animate-apple-pulse"></span>
            AI Agent Studio
          </div>

          <h2 className="heading-large mb-6 text-balance">
            Custom <span className="text-vedix-red">AI Agents</span> Built for Your Business
          </h2>

          <p className="body-large max-w-3xl mx-auto text-vedix-white/70 text-balance">
            Our AI Agent Studio specializes in creating intelligent agents that understand your business, automate complex tasks, and deliver measurable results. From conversational assistants to analytical powerhouses, we build AI that works.
          </p>
        </div>

        {/* Agent Types Grid */}
        <div ref={agentsAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {agentTypes.map((agent, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="apple-glass p-6 h-full hover:scale-[1.02] transition-all duration-500 hover:shadow-apple-medium relative overflow-hidden">
                <div className="relative z-10">
                  {/* Icon and Title */}
                  <div className="flex items-start mb-4">
                    <div className={`text-3xl mr-3 ${agent.color}`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold mb-2 text-vedix-white group-hover:text-vedix-red transition-colors duration-300">
                        {agent.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-vedix-gray/80 leading-relaxed text-sm mb-6">
                    {agent.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-vedix-red mb-2">Capabilities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((capability, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-vedix-red/10 text-vedix-red text-xs rounded-full"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h4 className="text-sm font-semibold text-vedix-gray mb-2">Use Cases:</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.useCases.map((useCase, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-vedix-gray/10 text-vedix-gray text-xs rounded-full"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Development Process */}
        <div ref={processAnimation.ref} className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold mb-4">
              Our <span className="text-vedix-red">AI Development</span> Process
            </h3>
            <p className="text-vedix-gray/70 max-w-2xl mx-auto">
              A systematic approach to building production-ready AI agents that deliver real business value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden xl:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-vedix-red to-transparent z-0"></div>
                )}

                <div className="apple-glass p-6 text-center relative z-10">
                  <div className="text-2xl font-bold font-mono text-vedix-red mb-3">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-heading font-semibold mb-3 text-vedix-white">
                    {step.title}
                  </h4>
                  <p className="text-vedix-gray/80 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="apple-glass p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Ready to Build Your <span className="text-vedix-red">Custom AI Agent?</span>
            </h3>
            <p className="text-vedix-gray/80 mb-8 leading-relaxed">
              Let's discuss your requirements and create an AI agent that transforms your business operations. Our team of AI experts is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                className="btn-red min-h-[52px] px-8 text-base font-semibold tracking-wide touch-manipulation group relative overflow-hidden shadow-apple-red-glow hover:shadow-apple-red-glow-hover transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Start Your AI Agent Project
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => {
                  clickSound();
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    const offset = 100;
                    const elementPosition = servicesSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                onMouseEnter={() => hoverSound()}
                className="btn-outline-red min-h-[52px] px-8 text-base font-semibold tracking-wide touch-manipulation group shadow-apple-subtle hover:shadow-apple-medium transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Explore Agent Types
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-3-3m3 3l-3 3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentStudio;
