const Features = () => {
  const features = [
    { icon: '⚡', title: 'Ultra-Fast Delivery', description: 'Lightning-fast development cycles' },
    { icon: '🤖', title: 'AI-Powered Development', description: 'Leverage cutting-edge AI tools' },
    { icon: '🧩', title: 'Tailored SaaS Architecture', description: 'Custom solutions for your needs' },
    { icon: '🔐', title: 'Enterprise-Level Security', description: 'Bank-grade security standards' },
    { icon: '🛠', title: 'Continuous Support', description: 'Ongoing maintenance & updates' },
    { icon: '📈', title: 'Growth-Oriented Design', description: 'Built to scale with your business' },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 px-4">
            Why Businesses <span className="neon-text">Choose Us</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass glass-hover rounded-2xl p-8 text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vedix-red/0 to-vedix-red-light/0 group-hover:from-vedix-red/10 group-hover:to-vedix-red-light/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-3 text-vedix-red">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

