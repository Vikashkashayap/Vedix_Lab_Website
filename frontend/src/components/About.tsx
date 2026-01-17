import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import AnimatedCounter from './ui/AnimatedCounter'

const About = () => {
  const aiStudioImage = '/assets/about.png'

  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 })
  const imageAnimation = useScrollAnimation<HTMLDivElement>({ delay: 200 })
  const contentAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 })
  const highlightsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 500 })
  const statsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 700 })

  const highlights = [
    { text: 'AI Innovation Studio & Parent Company', icon: '🤖' },
    { text: 'Custom AI Agents & Automation Solutions', icon: '⚡' },
    { text: 'AI-Powered UPSC & Education Tools', icon: '🎓' },
    { text: 'Intelligent Website Development', icon: '🌐' },
  ]

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-vedix-black via-vedix-black to-vedix-black/95" />
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-vedix-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-vedix-red/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        {/* ================= HEADER ================= */}
        <div
          ref={headerAnimation.ref}
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-glass text-xs sm:text-sm font-medium text-vedix-red mb-4 sm:mb-5 md:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vedix-red rounded-full mr-2 sm:mr-3 animate-apple-pulse" />
            About VedixLab
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-4 sm:mb-5 md:mb-6">
            Revolutionizing AI <span className="text-vedix-red">Innovation</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl leading-[1.7] text-vedix-white/70 px-4 sm:px-0">
            At the forefront of artificial intelligence, transforming businesses
            through cutting-edge AI solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div
            ref={contentAnimation.ref}
            className="space-y-8 sm:space-y-10 md:space-y-12 order-2 lg:order-1"
          >
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg leading-[1.7] text-vedix-white/80">
              <p>
                VedixLab (Vedix AI) is an AI innovation studio and parent company
                at the forefront of artificial intelligence. We build and sell
                cutting-edge AI products and create AI-powered tools for UPSC
                preparation and education.
              </p>
              <p>
                Our mission is to democratize AI technology, making sophisticated
                artificial intelligence accessible and practical for businesses
                of all sizes.
              </p>
            </div>

            {/* ================= HIGHLIGHTS ================= */}
            <div ref={highlightsAnimation.ref} className="space-y-4 sm:space-y-5 md:space-y-6">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-vedix-red">
                Our AI Expertise
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 overflow-hidden">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className="apple-glass rounded-xl p-4 sm:p-5 md:p-6 overflow-hidden"
                  >
                    {/* SCALE ONLY INNER */}
                    <div className="flex items-start gap-2 sm:gap-3 transform transition-transform duration-200 will-change-transform hover:scale-[1.03]">
                      <span className="text-xl sm:text-2xl md:text-3xl text-vedix-red flex-shrink-0">
                        {item.icon}
                      </span>
                      <span className="text-sm sm:text-base md:text-lg font-medium text-vedix-white/90 leading-[1.5]">
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div
            ref={imageAnimation.ref}
            className="relative order-1 lg:order-2 overflow-hidden"
          >
            <div className="relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -inset-4 sm:-inset-5 md:-inset-6 bg-gradient-to-r from-vedix-red/20 via-vedix-red/10 to-transparent rounded-2xl sm:rounded-3xl blur-2xl opacity-60" />

              {/* Image Card */}
              <div className="apple-glass rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-apple-large overflow-hidden">
                {/* SCALE INNER ONLY */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl transform transition-transform duration-300 will-change-transform hover:scale-[1.03]">
                  <img
                    src={aiStudioImage}
                    alt="AI Innovation Studio - VedixLab"
                    className="w-full h-auto object-cover rounded-xl sm:rounded-2xl"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Shine */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
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
