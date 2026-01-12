import React from 'react'

const Testimonials = () => {

  const testimonials = [
    {
      quote: 'Their AI automation saved us 40+ hours every week — insane productivity boost.',
      author: 'CEO',
      company: 'CloudWave',
      rating: 5,
    },
    {
      quote: 'The SaaS dashboard they built is world-class. Super fast, super clean.',
      author: 'Founder',
      company: 'DigitalSquare',
      rating: 5,
    },
    {
      quote: 'Exceptional service and cutting-edge solutions. Our revenue increased by 300% in 6 months.',
      author: 'CTO',
      company: 'TechFlow',
      rating: 5,
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            What Our <span className="neon-text">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vedix-red/0 to-vedix-red-light/0 group-hover:from-vedix-red/10 group-hover:to-vedix-red-light/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-vedix-red/20 to-vedix-red-light/20 border-4 border-vedix-red/60 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group-hover:border-vedix-red">
                      <svg className="w-12 h-12 text-vedix-red group-hover:text-vedix-red-light transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-vedix-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md animate-pulse">
                      ✓
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-2xl text-vedix-red">⭐</span>
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed italic text-center">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-vedix-red/30 pt-4 text-center">
                  <p className="font-semibold text-vedix-red">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

