import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'Their AI automation saved us 40+ hours every week — insane productivity boost.',
      author: 'CEO',
      company: 'CloudWave',
      rating: 5,
    },
    {
      quote:
        'The SaaS dashboard they built is world-class. Super fast, super clean.',
      author: 'Founder',
      company: 'DigitalSquare',
      rating: 5,
    },
    {
      quote:
        'Exceptional service and cutting-edge solutions. Our revenue increased by 300% in 6 months.',
      author: 'CTO',
      company: 'TechFlow',
      rating: 5,
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
            What Our <span className="text-vedix-red">Clients Say</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-vedix-gray/70 leading-[1.7] px-4 sm:px-0">
            Real feedback from founders and leaders building the future with
            VedixLab.
          </p>
        </div>

        {/* ================= TESTIMONIALS GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative overflow-hidden"
            >
              {/* CARD */}
              <div className="apple-glass rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 h-full overflow-hidden">
                {/* SAFE SCALE WRAPPER */}
                <div className="relative z-10 h-full transform transition-transform duration-200 hover:scale-[1.04] will-change-transform flex flex-col">
                  {/* AVATAR */}
                  <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-vedix-red/20 to-vedix-red-light/20 border-4 border-vedix-red/60 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-vedix-red"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                        </svg>
                      </div>

                      <div className="absolute -bottom-1 -right-1 bg-vedix-red text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-xs md:text-sm font-bold shadow-md animate-pulse">
                        ✓
                      </div>
                    </div>
                  </div>

                  {/* RATING */}
                  <div className="flex justify-center mb-3 sm:mb-4 md:mb-5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="text-lg sm:text-xl md:text-2xl text-vedix-red"
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* QUOTE */}
                  <p className="text-sm sm:text-base md:text-lg leading-[1.7] text-vedix-gray/80 mb-4 sm:mb-5 md:mb-6 italic text-center flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* AUTHOR */}
                  <div className="border-t border-vedix-red/30 pt-3 sm:pt-4 md:pt-5 text-center mt-auto">
                    <p className="font-semibold text-vedix-red text-xs sm:text-sm md:text-base">
                      {testimonial.author}
                    </p>
                    <p className="text-vedix-gray/70 text-xs sm:text-sm mt-1">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* HOVER GLOW */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-vedix-red/0 to-vedix-red-light/0 hover:from-vedix-red/10 hover:to-vedix-red-light/10 transition-all duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
