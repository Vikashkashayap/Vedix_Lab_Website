import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if user scrolled
      setScrolled(currentScrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const id = href.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        closeMenu()
      }
    } else {
      closeMenu()
    }
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
          ${scrolled
            ? 'apple-glass shadow-apple-subtle mt-2 mx-3 rounded-vedix-xl md:mt-[8px] md:mx-[12px]'
            : 'bg-transparent mt-0 mx-0'
          }
        `}
        style={{ width: scrolled ? "calc(100% - 24px)" : "100%" }}
      >
        <nav className="container mx-auto h-20 px-4 md:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="flex items-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/assets/vedixLabLogo.png"
              alt="VedixLab Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="relative hover:text-vedix-red transition-all duration-300 text-xs xl:text-sm group text-white">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vedix-red transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="relative hover:text-vedix-red transition-all duration-300 text-xs xl:text-sm group text-white">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vedix-red transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#products" onClick={(e) => handleNavClick(e, '#products')} className="relative hover:text-vedix-red transition-all duration-300 text-xs xl:text-sm group text-white">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vedix-red transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#ai-studio" onClick={(e) => handleNavClick(e, '#ai-studio')} className="relative hover:text-vedix-red transition-all duration-300 text-xs xl:text-sm group text-white">
              AI Studio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vedix-red transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#process" onClick={(e) => handleNavClick(e, '#process')} className="relative hover:text-vedix-red transition-all duration-300 text-xs xl:text-sm group text-white">
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vedix-red transition-all duration-300 group-hover:w-full"></span>
            </a>
            {/* <a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="relative hover:text-vedix-red transition-all duration-300 text-xs xl:text-sm group text-white">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vedix-red transition-all duration-300 group-hover:w-full"></span>
            </a> */}
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="relative hover:text-vedix-red transition-all duration-300 text-xs xl:text-sm group text-white">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vedix-red transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-vedix-red z-50 relative h-16 w-16 flex items-center justify-center hover:bg-vedix-red/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
            data-mobile-menu
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu - Apple-style Design */}
        <div className={`
          lg:hidden fixed inset-0 w-full h-screen
          bg-vedix-black/95 backdrop-blur-2xl
          transition-all duration-500 ease-out z-40
          ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={closeMenu}
              className="p-3 text-vedix-red hover:bg-vedix-red/10 rounded-full transition-all"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col items-center justify-center h-full space-y-4 px-6 pt-20 pb-32">
            {/* Mobile Logo */}
            <div className="flex items-center mb-6">
              <img
                src="/assets/vedixLabLogo.png"
                alt="VedixLab Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            <a
              onClick={(e) => handleNavClick(e, '#about')}
              href="#about"
              className="text-xl md:text-2xl text-white hover:text-vedix-red transition-all duration-300 hover:scale-105 font-medium"
            >
              About
            </a>
            <a
              onClick={(e) => handleNavClick(e, '#services')}
              href="#services"
              className="text-xl md:text-2xl text-white hover:text-vedix-red transition-all duration-300 hover:scale-105 font-medium"
            >
              Services
            </a>
            <a
              onClick={(e) => handleNavClick(e, '#products')}
              href="#products"
              className="text-xl md:text-2xl text-white hover:text-vedix-red transition-all duration-300 hover:scale-105 font-medium"
            >
              Products
            </a>
            <a
              onClick={(e) => handleNavClick(e, '#ai-studio')}
              href="#ai-studio"
              className="text-xl md:text-2xl text-white hover:text-vedix-red transition-all duration-300 hover:scale-105 font-medium"
            >
              AI Studio
            </a>
            <a
              onClick={(e) => handleNavClick(e, '#process')}
              href="#process"
              className="text-xl md:text-2xl text-white hover:text-vedix-red transition-all duration-300 hover:scale-105 font-medium"
            >
              Process
            </a>
            <a
              onClick={(e) => handleNavClick(e, '#portfolio')}
              href="#portfolio"
              className="text-xl md:text-2xl text-white hover:text-vedix-red transition-all duration-300 hover:scale-105 font-medium"
            >
              Portfolio
            </a>
            <a
              onClick={(e) => handleNavClick(e, '#contact')}
              href="#contact"
              className="text-xl md:text-2xl text-white hover:text-vedix-red transition-all duration-300 hover:scale-105 font-medium"
            >
              Contact
            </a>
          </div>
        </div>

      </header>
    </>
  )
}

export default Header
