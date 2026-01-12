import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  results: string[];
  challenge: string;
  solution: string;
  impact: string;
  client: string;
}

const Portfolio = () => {
  const { clickSound, hoverSound } = useAudioFeedback();

  // Scroll animations
  const headerAnimation = useScrollAnimation({ delay: 100 });
  const projectsAnimation = useScrollAnimation({ delay: 300 });

  const projects: Project[] = [
    {
      id: 'ai-customer-support',
      title: 'AI Customer Support Agent',
      category: 'Conversational AI',
      description: 'Intelligent customer support system that handles 80% of customer inquiries automatically, providing 24/7 support with human-like responses.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80',
      technologies: ['GPT-4', 'Natural Language Processing', 'Machine Learning', 'Node.js', 'React'],
      results: ['80% query resolution rate', '24/7 availability', '60% cost reduction', '95% customer satisfaction'],
      challenge: 'Company was overwhelmed with customer support tickets and needed scalable solution for round-the-clock service.',
      solution: 'Built custom AI agent using advanced NLP models with continuous learning capabilities and seamless CRM integration.',
      impact: 'Reduced support costs by 60% while improving response quality and customer satisfaction scores.',
      client: 'E-commerce Platform'
    },
    {
      id: 'predictive-analytics-suite',
      title: 'Predictive Analytics Suite',
      category: 'Business Intelligence',
      description: 'Comprehensive analytics platform that predicts customer behavior, optimizes inventory, and provides actionable business insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      technologies: ['Python', 'TensorFlow', 'Apache Spark', 'PostgreSQL', 'Tableau'],
      results: ['35% inventory optimization', '25% revenue increase', '50% faster decision making', 'Real-time insights'],
      challenge: 'Retail chain struggled with inventory management and lacked predictive capabilities for demand forecasting.',
      solution: 'Developed ML-powered analytics platform with real-time data processing and automated reporting dashboards.',
      impact: 'Transformed business operations with data-driven decision making and significant cost savings.',
      client: 'Retail Chain'
    },
    {
      id: 'ai-upsc-coach',
      title: 'AI-Powered UPSC Coach',
      category: 'Education Technology',
      description: 'Personalized learning platform for UPSC preparation with adaptive testing, intelligent study planning, and performance analytics.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
      technologies: ['React', 'Python', 'Machine Learning', 'NLP', 'MongoDB'],
      results: ['40% improvement in pass rates', 'Personalized learning paths', 'Real-time progress tracking', '24/7 doubt clearing'],
      challenge: 'UPSC aspirants needed personalized coaching but traditional methods were expensive and not scalable.',
      solution: 'Created AI-driven platform with adaptive learning algorithms, comprehensive question bank, and intelligent assessment system.',
      impact: 'Democratized quality UPSC preparation, making expert-level coaching accessible and affordable.',
      client: 'Education Startup'
    },
    {
      id: 'automated-workflow-engine',
      title: 'Automated Workflow Engine',
      category: 'Process Automation',
      description: 'Intelligent workflow automation platform that streamlines business processes, reduces manual work, and improves operational efficiency.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80',
      technologies: ['Node.js', 'Python', 'RPA', 'API Integration', 'Docker'],
      results: ['75% reduction in manual tasks', '50% faster processing', '99.9% uptime', 'Multi-system integration'],
      challenge: 'Manufacturing company had complex manual processes across multiple departments causing delays and errors.',
      solution: 'Built intelligent workflow engine with AI-powered decision making and seamless integration across all business systems.',
      impact: 'Revolutionized operations with automated processes, eliminating bottlenecks and improving overall efficiency.',
      client: 'Manufacturing Company'
    },
    {
      id: 'intelligent-content-platform',
      title: 'Intelligent Content Platform',
      category: 'Content AI',
      description: 'AI-powered content creation and management platform that generates, optimizes, and distributes content across multiple channels.',
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&q=80',
      technologies: ['GPT-4', 'Content AI', 'SEO Optimization', 'Social Media APIs', 'Analytics'],
      results: ['10x content creation speed', '300% engagement increase', '50+ content pieces/week', 'Multi-platform distribution'],
      challenge: 'Marketing agency struggled to scale content production while maintaining quality and consistency.',
      solution: 'Developed AI content platform with brand voice learning, automated distribution, and performance analytics.',
      impact: 'Scaled content operations dramatically while maintaining brand consistency and improving engagement metrics.',
      client: 'Marketing Agency'
    },
    {
      id: 'ai-healthcare-assistant',
      title: 'AI Healthcare Assistant',
      category: 'Healthcare AI',
      description: 'Intelligent healthcare assistant for patient triage, appointment scheduling, and medical record management with HIPAA compliance.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
      technologies: ['Healthcare AI', 'NLP', 'HIPAA Compliant', 'Electronic Health Records', 'Voice AI'],
      results: ['60% faster patient triage', '30% reduction in wait times', '99% accuracy rate', 'Full HIPAA compliance'],
      challenge: 'Healthcare provider needed to improve patient experience and optimize resource allocation in busy medical practice.',
      solution: 'Created HIPAA-compliant AI assistant with voice capabilities, intelligent triage, and seamless EHR integration.',
      impact: 'Enhanced patient care quality and operational efficiency while ensuring complete regulatory compliance.',
      client: 'Medical Practice'
    }
  ];


  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={headerAnimation.ref} className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full apple-glass text-sm font-medium text-vedix-red mb-6">
            <span className="w-2 h-2 bg-vedix-red rounded-full mr-3 animate-apple-pulse"></span>
            Our AI Portfolio
          </div>

          <h2 className="heading-large mb-6 text-balance">
            Transforming Businesses with <span className="text-vedix-red">AI Innovation</span>
          </h2>

          <p className="body-large max-w-3xl mx-auto text-vedix-white/70 text-balance">
            Explore our portfolio of successful AI implementations across diverse industries. Each project demonstrates our commitment to delivering measurable business value through intelligent automation and AI-powered solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="apple-glass p-6 h-full hover:scale-[1.02] transition-all duration-500 hover:shadow-apple-medium relative overflow-hidden">
                <div className="relative z-10">
                  {/* Project Image */}
                  <div className="mb-6 relative overflow-hidden rounded-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-vedix-red/90 backdrop-blur-sm text-vedix-white text-xs rounded-full">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-heading font-semibold mb-2 text-vedix-white group-hover:text-vedix-red transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-vedix-gray/80 leading-relaxed text-sm mb-3">
                      {project.description}
                    </p>
                    <p className="text-vedix-gray/60 text-xs italic">
                      Client: {project.client}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-vedix-red/10 text-vedix-red text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-vedix-gray/10 text-vedix-gray text-xs rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Results */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-vedix-red mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {project.results.slice(0, 2).map((result, idx) => (
                        <li key={idx} className="text-xs text-vedix-gray/70 flex items-center">
                          <span className="w-1 h-1 bg-vedix-red rounded-full mr-2"></span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => clickSound()}
                    onMouseEnter={() => hoverSound()}
                    className="w-full btn-outline-red min-h-[36px] text-sm font-medium tracking-wide touch-manipulation group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      View Case Study
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="apple-glass p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Ready to Join Our <span className="text-vedix-red">Success Stories?</span>
            </h3>
            <p className="text-vedix-gray/80 mb-8 leading-relaxed">
              Every AI project is unique. Let's discuss your specific challenges and create a custom solution that transforms your business. Our track record speaks for itself.
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
                  Start Your AI Project
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => {
                  clickSound();
                  const processSection = document.getElementById('process');
                  if (processSection) {
                    const offset = 100;
                    const elementPosition = processSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                onMouseEnter={() => hoverSound()}
                className="btn-outline-red min-h-[52px] px-8 text-base font-semibold tracking-wide touch-manipulation group shadow-apple-subtle hover:shadow-apple-medium transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Learn Our Process
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

export default Portfolio;
