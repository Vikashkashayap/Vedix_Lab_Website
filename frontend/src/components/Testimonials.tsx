const Testimonials = () => {
  // Client avatar images from Unsplash
  const clientAvatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  ]

  const testimonials = [
    {
      quote: 'Their AI automation saved us 40+ hours every week — insane productivity boost.',
      author: 'CEO',
      company: 'CloudWave',
      rating: 5,
      avatar: clientAvatars[0],
    },
    {
      quote: 'The SaaS dashboard they built is world-class. Super fast, super clean.',
      author: 'Founder',
      company: 'DigitalSquare',
      rating: 5,
      avatar: clientAvatars[1],
    },
    {
      quote: 'Exceptional service and cutting-edge solutions. Our revenue increased by 300% in 6 months.',
      author: 'CTO',
      company: 'TechFlow',
      rating: 5,
      avatar: clientAvatars[2],
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-electric-purple/0 group-hover:from-neon-blue/10 group-hover:to-electric-purple/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full border-2 border-neon-blue/50 object-cover"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-2xl text-neon-blue">⭐</span>
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed italic text-center">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-neon-blue/30 pt-4 text-center">
                  <p className="font-semibold text-neon-blue">{testimonial.author}</p>
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

