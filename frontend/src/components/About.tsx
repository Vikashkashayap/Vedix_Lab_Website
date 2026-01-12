import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  // AI innovation studio image from Unsplash
  const aiStudioImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"

  // Scroll animations
  const imageAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const contentAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 });
  const highlightsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 500 });

  const highlights = [
    { text: 'AI Innovation Studio & Parent Company', icon: '🤖' },
    { text: 'Custom AI Agents & Automation Solutions', icon: '⚡' },
    { text: 'AI-Powered UPSC & Education Tools', icon: '🎓' },
    { text: 'Intelligent Website Development', icon: '🌐' },
  ]

  return (
    <section id="about" className="py-24 relative bg-gradient-to-br from-vedix-gray/5 to-transparent">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div ref={contentAnimation.ref} className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-vedix-red/10 rounded-full">
                <span className="text-vedix-red font-semibold text-sm uppercase tracking-wider">About VedixLab</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Revolutionizing AI <span className="text-vedix-red">Innovation</span>
              </h2>
              <div className="space-y-4 text-lg text-vedix-gray/90 leading-relaxed">
                <p>
                  VedixLab (Vedix AI) is an AI innovation studio and parent company at the forefront of artificial intelligence. We build and sell cutting-edge AI products, create AI-powered tools for UPSC preparation and education.
                </p>
                <p>
                  Our mission is to democratize AI technology, making sophisticated artificial intelligence accessible and practical for businesses of all sizes. We combine deep technical expertise with creative innovation to deliver AI solutions that transform industries.
                </p>
              </div>
            </div>

            <div ref={highlightsAnimation.ref} className="space-y-4">
              <h3 className="text-2xl font-heading font-semibold text-vedix-red mb-6">
                Our AI Expertise:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="apple-glass rounded-xl p-5 hover:shadow-apple-medium transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl text-vedix-red">{highlight.icon}</span>
                      <span className="text-base font-medium text-vedix-gray/90 leading-tight">{highlight.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - AI Innovation Studio */}
          <div ref={imageAnimation.ref} className="relative lg:order-2 order-1">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-vedix-red/20 to-transparent rounded-3xl blur-xl opacity-50"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-vedix-red/10 rounded-full blur-2xl"></div>

              {/* Main image container */}
              <div className="apple-glass rounded-3xl p-6 shadow-apple-large relative overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <img
                    src={aiStudioImage}
                    alt="AI Innovation Studio - VedixLab"
                    className="w-full h-auto rounded-2xl object-cover shadow-lg"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                </div>

                {/* Floating stats */}
                <div className="absolute -bottom-4 -left-4 apple-glass rounded-xl p-4 shadow-apple-medium">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vedix-red">100+</div>
                    <div className="text-xs text-vedix-gray/70 uppercase tracking-wider">AI Projects</div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 apple-glass rounded-xl p-4 shadow-apple-medium">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vedix-red">24/7</div>
                    <div className="text-xs text-vedix-gray/70 uppercase tracking-wider">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

