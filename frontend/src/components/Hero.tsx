import React from 'react';
import AnimatedCounter from './ui/AnimatedCounter';

const Hero = () => {

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-x-hidden py-12 sm:py-16 md:py-20 lg:py-24"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-vedix-black via-vedix-black to-vedix-black/95" />

        {/* Subtle animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(225, 6, 0, 0.12), transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 50%, rgba(225, 6, 0, 0.08), transparent 45%),
              radial-gradient(ellipse 50% 30% at 0% 80%, rgba(255, 255, 255, 0.05), transparent 40%),
              radial-gradient(ellipse 40% 35% at 50% 100%, rgba(225, 6, 0, 0.06), transparent 50%)
            `,
          }}
        />

        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 139 143) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">

            {/* Badge - Enhanced */}
            <div>
              <div className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full apple-glass text-xs sm:text-sm font-semibold text-vedix-red relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-vedix-red rounded-full mr-2.5 sm:mr-3 animate-apple-pulse shadow-[0_0_8px_rgba(225,6,0,0.6)]" />
                  AI Innovation Studio
                </span>
              </div>
            </div>

            {/* Heading - Enhanced */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] tracking-tight px-2 sm:px-0">
              <span className="text-vedix-white block mb-1 sm:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                VedixLab <span className="text-vedix-gray/60">(Vedix AI)</span>
              </span>
              <span className="text-vedix-red block mb-1 sm:mb-2 relative">
                <span className="relative z-10">Where Intelligence</span>
                <span className="absolute inset-0 text-vedix-red/20 blur-xl -z-10">Where Intelligence</span>
              </span>
              <span className="text-vedix-white block drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                Meets Innovation
              </span>
            </h1>

            {/* Description - Enhanced */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-[1.6] text-vedix-gray/90 max-w-3xl mx-auto px-4 sm:px-6 md:px-0 mt-4 sm:mt-6">
              We build and sell <span className="text-vedix-white font-semibold">AI products</span>, create{' '}
              <span className="text-vedix-red/90 font-semibold">AI-powered UPSC & education tools</span>,
              and develop <span className="text-vedix-white font-semibold">custom AI agents</span>, automation, and intelligent websites
              for forward-thinking businesses.
            </p>

            {/* Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center overflow-hidden px-4 sm:px-0 mt-6 sm:mt-8">
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    window.scrollTo({
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="btn-red h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold overflow-hidden relative group shadow-apple-red-glow hover:shadow-apple-red-glow-hover transition-all duration-300 transform hover:scale-105 active:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Build Your AI Solution
                  <svg
                    className="ml-2.5 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) {
                    window.scrollTo({
                      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="btn-outline-red h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold overflow-hidden group shadow-apple-subtle hover:shadow-apple-medium transition-all duration-300 transform hover:scale-105 active:scale-100 border-2"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore AI Products
                  <svg
                    className="ml-2.5 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0l-3-3m3 3l-3 3" />
                  </svg>
                </span>
              </button>
            </div>

            {/* ================= STATS - Enhanced ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16 overflow-hidden px-4 sm:px-0">
              {[
                { value: 50, suffix: '+', label: 'AI Products Built', icon: '🚀' },
                { value: 98, suffix: '%', label: 'Accuracy Rate', icon: '🎯' },
                { value: 1000, suffix: '+', label: 'AI Interactions / Hour', icon: '⚡' },
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
