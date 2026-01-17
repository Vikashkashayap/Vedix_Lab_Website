import React from 'react';
import AnimatedCounter from './ui/AnimatedCounter';
import AnimatedLines from './ui/AnimatedLines';
import AnimatedGrid from './ui/AnimatedGrid';
import { useAudioFeedback } from '../hooks/useAudioFeedback';
import { useParallax } from '../hooks/useParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const { clickSound, hoverSound } = useAudioFeedback();

  // Parallax effects
  const backgroundParallax = useParallax<HTMLDivElement>({ speed: 0.3, direction: 'up' });
  const contentParallax = useParallax<HTMLDivElement>({ speed: 0.1, direction: 'up' });

  // Scroll animations
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const subtitleAnimation = useScrollAnimation<HTMLHeadingElement>({ delay: 300 });
  const buttonsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 500 });
  const statsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 700 });

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-x-hidden py-12 sm:py-16 md:py-20 lg:py-24"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={backgroundParallax.ref}
          className="absolute inset-0 bg-gradient-to-br from-vedix-black via-vedix-black to-vedix-black/95"
          style={{ transform: `translateY(${backgroundParallax.offset}px)` }}
        />

        <AnimatedGrid />
        <AnimatedLines />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div
          ref={contentParallax.ref}
          className="max-w-5xl mx-auto text-center"
          style={{ transform: `translateY(${contentParallax.offset}px)` }}
        >
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">

            {/* Badge */}
            <div ref={titleAnimation.ref}>
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-glass text-xs sm:text-sm font-medium text-vedix-red">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vedix-red rounded-full mr-2 sm:mr-3 animate-apple-pulse" />
                AI Innovation Studio
              </div>
            </div>

            {/* Heading */}
            <h1
              ref={subtitleAnimation.ref}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.15] tracking-tight px-2 sm:px-0"
            >
              <span className="text-vedix-white block">VedixLab (Vedix AI)</span>
              <span className="text-vedix-red block">Where Intelligence</span>
              <span className="text-vedix-white block">Meets Innovation</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-[1.5] text-vedix-gray/80 max-w-2xl mx-auto px-4 sm:px-6 md:px-0">
              We build and sell AI products, create AI-powered UPSC & education tools,
              and develop custom AI agents, automation, and intelligent websites
              for forward-thinking businesses.
            </p>

            {/* Buttons */}
            <div
              ref={buttonsAnimation.ref}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center overflow-hidden px-4 sm:px-0"
            >
              <button
                onClick={() => {
                  clickSound();
                  const el = document.getElementById('contact');
                  if (el) {
                    window.scrollTo({
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                      behavior: 'smooth',
                    });
                  }
                }}
                onMouseEnter={hoverSound}
                className="btn-red h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm font-semibold overflow-hidden relative group shadow-apple-red-glow hover:shadow-apple-red-glow-hover transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Build Your AI Solution
                  <svg
                    className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => {
                  clickSound();
                  const el = document.getElementById('services');
                  if (el) {
                    window.scrollTo({
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                      behavior: 'smooth',
                    });
                  }
                }}
                onMouseEnter={hoverSound}
                className="btn-outline-red h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm font-semibold overflow-hidden group shadow-apple-subtle hover:shadow-apple-medium transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore AI Products
                  <svg
                    className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-3-3m3 3l-3 3" />
                  </svg>
                </span>
              </button>
            </div>

            {/* ================= STATS (FIXED) ================= */}
            <div
              ref={statsAnimation.ref}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-12 overflow-hidden px-4 sm:px-0"
            >
              {[
                { value: 50, suffix: '+', label: 'AI Products Built' },
                { value: 98, suffix: '%', label: 'Accuracy Rate' },
                { value: 1000, suffix: '+', label: 'AI Interactions / Hour' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="apple-glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 overflow-hidden">
                    {/* SCALE ONLY INNER CONTENT */}
                    <div className="transform transition-transform duration-200 will-change-transform hover:scale-[1.03]">
                      <div className="relative z-10">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-vedix-red mb-1 sm:mb-2">
                          <AnimatedCounter value={item.value} suffix={item.suffix} />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base font-medium text-vedix-gray/90">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
