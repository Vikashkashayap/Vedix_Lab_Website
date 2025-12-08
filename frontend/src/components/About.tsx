const About = () => {
  // Team/tech image from Unsplash
  const teamImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"

  const highlights = [
    { text: '50+ Business Workflows Automated', icon: '✔' },
    { text: '100% Modern Tech Stack', icon: '✔' },
    { text: 'AI-Integrated Solutions', icon: '✔' },
    { text: 'End-to-End Support & Maintenance', icon: '✔' },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Team Image */}
          <div className="relative">
            <div className="glass rounded-2xl p-4 shadow-neon-blue/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-electric-purple/20 opacity-50"></div>
              <img 
                src={teamImage} 
                alt="Our Tech Team" 
                className="relative z-10 w-full h-auto rounded-lg object-cover"
              />
              {/* Holographic effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent animate-pulse pointer-events-none"></div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                About <span className="neon-text">Us</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                We are a next-generation tech studio building intelligent digital products that help brands automate, scale, and dominate their market. Our blend of AI, SaaS engineering, and futuristic design delivers unmatched performance.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-semibold text-neon-blue mb-4">
                Highlights:
              </h3>
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 glass rounded-lg p-4 glass-hover"
                >
                  <span className="text-2xl text-neon-blue">{highlight.icon}</span>
                  <span className="text-lg text-gray-300">{highlight.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

