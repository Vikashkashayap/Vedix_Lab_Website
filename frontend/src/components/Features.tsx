import React from 'react'

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Ultra-Fast Delivery',
      description: 'Lightning-fast development cycles',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Development',
      description: 'Leverage cutting-edge AI tools',
    },
    {
      icon: '🧩',
      title: 'Tailored SaaS Architecture',
      description: 'Custom solutions for your needs',
    },
    {
      icon: '🔐',
      title: 'Enterprise-Level Security',
      description: 'Bank-grade security standards',
    },
    {
      icon: '🛠',
      title: 'Continuous Support',
      description: 'Ongoing maintenance & updates',
    },
    {
      icon: '📈',
      title: 'Growth-Oriented Design',
      description: 'Built to scale with your business',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
            Why Businesses <span className="text-vedix-red">Choose Us</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-vedix-gray/70 leading-[1.7] px-4 sm:px-0">
            We combine AI innovation, speed, and enterprise-grade reliability to
            deliver future-ready SaaS solutions.
          </p>
        </div>

        {/* ================= FEATURES GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden"
            >
              {/* CARD */}
              <div className="apple-glass rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 h-full overflow-hidden">
                {/* SAFE SCALE WRAPPER */}
                <div className="relative z-10 text-center h-full transform transition-transform duration-200 hover:scale-[1.04] will-change-transform flex flex-col">
                  {/* ICON */}
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 md:mb-6 transition-transform duration-200 hover:scale-110">
                    {feature.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-5 text-vedix-red">
                    {feature.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm sm:text-base md:text-lg text-vedix-gray/80 leading-[1.65] flex-grow">
                    {feature.description}
                  </p>
                </div>

                {/* HOVER GRADIENT */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-vedix-red/0 to-vedix-red-light/0 hover:from-vedix-red/10 hover:to-vedix-red-light/10 transition-all duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
