import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Products', id: 'products' },
  { label: 'Features', id: 'features' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('hero')
  const location = useLocation()

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Scroll spy
      const sections = NAV_ITEMS.map(i => document.getElementById(i.id)).filter(Boolean)
      for (const section of sections) {
        const rect = section!.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveId(section!.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 110,
        behavior: 'smooth',
      })
    }
    setMenuOpen(false)
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'apple-glass shadow-apple-medium mt-2 mx-3 rounded-2xl'
          : 'bg-transparent'
        }
      `}
      style={{ width: scrolled ? 'calc(100% - 24px)' : '100%' }}
    >
      <nav className="container mx-auto h-16 sm:h-20 md:h-24 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center hover:scale-[1.04] transition-transform"
        >
          <img
            src="/assets/vedixLabLogo.png"
            alt="VedixLab"
            className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative text-xs xl:text-sm 2xl:text-base font-medium transition-all px-1 py-2
                ${activeId === item.id
                  ? 'text-vedix-red'
                  : 'text-white hover:text-vedix-red'}
              `}
            >
              {item.label}
              <span
                className={`
                  absolute -bottom-1 left-0 h-[2px] bg-vedix-red transition-all duration-300
                  ${activeId === item.id ? 'w-full' : 'w-0'}
                `}
              />
            </button>
          ))}
        </div>

        {/* ================= HEADER CTA ================= */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-red h-9 xl:h-11 px-4 xl:px-6 text-xs xl:text-sm font-semibold shadow-apple-red-glow hover:shadow-apple-red-glow-hover transition-all"
          >
            Talk to Experts
          </button>
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl text-vedix-red hover:bg-vedix-red/10 transition-colors"
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 bg-vedix-black/95 backdrop-blur-2xl
          transition-all duration-500
          ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 sm:gap-5 md:gap-6 px-4">
          <img src="/assets/vedixLabLogo.png" className="h-12 sm:h-16 md:h-20 mb-2 sm:mb-4" />

          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-white hover:text-vedix-red transition-all hover:scale-[1.05] py-2"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => scrollToSection('contact')}
            className="btn-red h-10 sm:h-11 px-6 sm:px-8 text-xs sm:text-sm font-semibold mt-2 sm:mt-4 md:mt-6"
          >
            Talk to Experts
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
