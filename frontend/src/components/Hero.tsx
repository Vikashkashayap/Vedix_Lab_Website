import React from 'react';
import AnimatedCounter from './ui/AnimatedCounter';
import AnimatedLines from './ui/AnimatedLines';
import AnimatedGrid from './ui/AnimatedGrid';
import { useAudioFeedback } from '../hooks/useAudioFeedback';
import { useParallax } from '../hooks/useParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const { clickSound, hoverSound } = useAudioFeedback();

  // Parallax effects for different layers
  const backgroundParallax = useParallax<HTMLDivElement>({ speed: 0.3, direction: 'up' });
  const contentParallax = useParallax<HTMLDivElement>({ speed: 0.1, direction: 'up' });

  // Scroll animations for content sections
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const subtitleAnimation = useScrollAnimation<HTMLHeadingElement>({ delay: 300 });
  const buttonsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 500 });
  const statsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 700 });

  return (
    <section id="hero" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-24 pb-12">
      {/* Apple-style subtle gradient background */}
      <div
        ref={backgroundParallax.ref}
        className="absolute inset-0 bg-gradient-to-br from-vedix-black via-vedix-black to-vedix-black/95"
        style={{ transform: `translateY(${backgroundParallax.offset}px)` }}
      ></div>

      {/* Neural Network Grid - subtle background layer */}
      <AnimatedGrid />

      {/* AI Data Stream Animation - flowing lines layer */}
      <AnimatedLines />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={contentParallax.ref}
          className="max-w-5xl mx-auto text-center"
          style={{ transform: `translateY(${contentParallax.offset}px)` }}
        >
          {/* Centered Hero Content with Apple-style animations */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div ref={titleAnimation.ref} className="inline-flex items-center px-4 py-2 rounded-full apple-glass text-sm font-medium text-vedix-red">
                <span className="w-2 h-2 bg-vedix-red rounded-full mr-2 animate-apple-pulse"></span>
                AI Innovation Studio
              </div>

              <h1 ref={subtitleAnimation.ref} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
                <span className="text-vedix-white block">VedixLab (Vedix AI)</span>
                <span className="text-vedix-red block">Where Intelligence</span>
                <span className="text-vedix-white block">Meets Innovation</span>
              </h1>

              <p className="text-lg md:text-xl text-vedix-gray/80 leading-relaxed max-w-2xl mx-auto">
                We build and sell AI products, create AI-powered UPSC & education tools, and develop custom AI agents, automation, and intelligent websites for forward-thinking businesses.
              </p>
            </div>

            <div ref={buttonsAnimation.ref} className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  Build Your AI Solution
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
                  Explore AI Products
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-3-3m3 3l-3 3" />
                  </svg>
                </span>
              </button>
            </div>

            {/* AI Innovation Stats */}
            <div ref={statsAnimation.ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="text-center group">
                <div className="apple-glass rounded-2xl p-4 hover:scale-105 transition-all duration-300 hover:shadow-apple-medium touch-manipulation relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-2xl font-bold font-mono text-vedix-red mb-1">
                      <AnimatedCounter value={50} suffix="+" />
                    </div>
                    <div className="text-sm font-medium text-vedix-gray/90">AI Products Built</div>
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="apple-glass rounded-2xl p-4 hover:scale-105 transition-all duration-300 hover:shadow-apple-medium touch-manipulation relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-2xl font-bold font-mono text-vedix-red mb-1">
                      <AnimatedCounter value={98} suffix="%" />
                    </div>
                    <div className="text-sm font-medium text-vedix-gray/90">Accuracy Rate</div>
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="apple-glass rounded-2xl p-4 hover:scale-105 transition-all duration-300 hover:shadow-apple-medium touch-manipulation relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-2xl font-bold font-mono text-vedix-red mb-1">
                      <AnimatedCounter value={1000} suffix="+" />
                    </div>
                    <div className="text-sm font-medium text-vedix-gray/90">AI Interactions/Hour</div>
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

export default Hero

