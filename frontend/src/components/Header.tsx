import { useState, useEffect } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-neon-blue/20' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-heading font-bold neon-text">
            NextGen SaaS
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="hover:text-neon-blue transition-colors">Services</a>
            <a href="#about" className="hover:text-neon-blue transition-colors">About</a>
            <a href="#pricing" className="hover:text-neon-blue transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-neon-blue transition-colors">Contact</a>
            <button className="px-6 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-neon-blue transition-all duration-300 hover:scale-105">
              Get Started
            </button>
          </div>
          <button 
            onClick={toggleMenu}
            className="md:hidden text-neon-blue focus:outline-none z-50 relative"
            aria-label="Toggle menu"
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
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-space-black/95 backdrop-blur-lg transition-all duration-300 ease-in-out z-40 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            <a 
              href="#services" 
              onClick={closeMenu}
              className="text-2xl font-heading text-white hover:text-neon-blue transition-colors"
            >
              Services
            </a>
            <a 
              href="#about" 
              onClick={closeMenu}
              className="text-2xl font-heading text-white hover:text-neon-blue transition-colors"
            >
              About
            </a>
            <a 
              href="#pricing" 
              onClick={closeMenu}
              className="text-2xl font-heading text-white hover:text-neon-blue transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#contact" 
              onClick={closeMenu}
              className="text-2xl font-heading text-white hover:text-neon-blue transition-colors"
            >
              Contact
            </a>
            <button 
              onClick={closeMenu}
              className="px-8 py-3 bg-neon-blue text-space-black rounded-lg font-semibold text-lg hover:shadow-neon-blue transition-all duration-300 hover:scale-105 mt-4"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

