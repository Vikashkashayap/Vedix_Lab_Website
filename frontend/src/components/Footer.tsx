import React from 'react'

const Footer = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 110,
        behavior: 'smooth',
      })
    }
  }

  return (
    <footer className="relative border-t border-vedix-red/20 bg-gradient-to-b from-vedix-black via-vedix-black to-vedix-black/95 py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-vedix-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-vedix-red/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-5 sm:mb-6 md:mb-8">
              <img
                src="/assets/vedixLabLogo.png"
                alt="VedixLab Logo"
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain"
              />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-vedix-gray/70 leading-[1.7] max-w-lg mb-6 sm:mb-7 md:mb-8">
              VedixLab (Vedix AI) - AI Innovation Studio & Parent Company. We build and sell AI products, create AI-powered UPSC & education tools, and develop custom AI agents, automation, and intelligent websites.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://www.linkedin.com/company/vedixlab/"
                className="group relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl apple-glass hover:bg-vedix-red/10 transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-vedix-gray/60 group-hover:text-vedix-red transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="group relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl apple-glass hover:bg-vedix-red/10 transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-vedix-gray/60 group-hover:text-vedix-red transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="group relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl apple-glass hover:bg-vedix-red/10 transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-vedix-gray/60 group-hover:text-vedix-red transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Our Products Section */}
          <div>
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-vedix-white mb-4 sm:mb-5 md:mb-6">
              Our Products
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-sm sm:text-base text-vedix-gray/70 hover:text-vedix-red transition-all duration-200 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-vedix-red/50 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  AI Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-sm sm:text-base text-vedix-gray/70 hover:text-vedix-red transition-all duration-200 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-vedix-red/50 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-sm sm:text-base text-vedix-gray/70 hover:text-vedix-red transition-all duration-200 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-vedix-red/50 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-vedix-white mb-4 sm:mb-5 md:mb-6">
              Company
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm sm:text-base text-vedix-gray/70 hover:text-vedix-red transition-all duration-200 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-vedix-red/50 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  About VedixLab
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm sm:text-base text-vedix-gray/70 hover:text-vedix-red transition-all duration-200 hover:translate-x-1 inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-vedix-red/50 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-vedix-red/20 pt-6 sm:pt-7 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-xs sm:text-sm text-vedix-gray/60 text-center sm:text-left">
              &copy; {new Date().getFullYear()} <span className="text-vedix-red/80 font-medium">Sempiternity Technologies</span>. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-vedix-gray/50 text-center sm:text-right">
              Powered by{' '}
              <span className="text-vedix-red/80 font-medium">Vedix AI</span> - Where Intelligence Meets Innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
