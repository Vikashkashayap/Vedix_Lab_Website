import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface Service {
  _id?: string
  icon: string
  title: string
  description: string
  image: string
  order: number
}

const Services = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 })
  const servicesAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 })

  useEffect(() => {
    fetchServices()
  }, [])

  const defaultServices: Service[] = [
    {
      icon: '🤖',
      title: 'Custom AI Agents',
      description:
        'Intelligent AI agents tailored to your business needs - from customer support to workflow automation and data analysis.',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
      order: 0,
    },
    {
      icon: '⚡',
      title: 'AI Automation Solutions',
      description:
        'Streamline operations with intelligent automation that learns and adapts to your business processes.',
      image:
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80',
      order: 1,
    },
    {
      icon: '🌐',
      title: 'AI-Powered Websites',
      description:
        'Intelligent websites with dynamic content, personalized user experiences, and AI-driven functionality.',
      image:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80',
      order: 2,
    },
    {
      icon: '🎓',
      title: 'AI Education Tools',
      description:
        'Advanced AI-powered tools for UPSC preparation, personalized learning, and educational content creation.',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      order: 3,
    },
    {
      icon: '📊',
      title: 'AI Analytics & Insights',
      description:
        'Deep learning-powered analytics that uncover patterns, predict trends, and drive data-driven decisions.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
      order: 4,
    },
    {
      icon: '🔧',
      title: 'AI Product Development',
      description:
        'End-to-end development of AI products from concept to market, including ML model training and deployment.',
      image:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80',
      order: 5,
    },
  ]

  const fetchServices = async () => {
    try {
      const response = await api.getServices()
      setServices(response.data)
    } catch {
      setServices(defaultServices)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-vedix-red">Loading services...</div>
        </div>
      </section>
    )
  }

  const displayServices = services.length ? services : defaultServices

  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ================= HEADER ================= */}
        <div ref={headerAnimation.ref} className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-glass text-xs sm:text-sm font-medium text-vedix-red mb-4 sm:mb-5 md:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vedix-red rounded-full mr-2 sm:mr-3 animate-apple-pulse" />
            AI Innovation Services
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] mb-4 sm:mb-5 md:mb-6">
            Our <span className="text-vedix-red">AI-Powered</span> Solutions
          </h2>

          <p className="text-base sm:text-lg md:text-xl leading-[1.7] max-w-3xl mx-auto text-vedix-white/70 px-4 sm:px-0">
            From custom AI agents to intelligent automation and AI-driven
            websites, we deliver cutting-edge solutions that transform businesses
            through artificial intelligence.
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div
          ref={servicesAnimation.ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-hidden"
        >
          {displayServices.map((service, index) => {
            const serviceId =
              service._id ||
              service.title.toLowerCase().replace(/\s+/g, '-')

            return (
              <div
                key={service._id || index}
                onClick={() => navigate(`/service/${serviceId}`)}
                className="relative cursor-pointer overflow-hidden"
              >
                {/* CARD */}
                <div className="apple-glass p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl overflow-hidden h-full">
                  {/* SCALE INNER ONLY */}
                  <div className="relative z-10 transform transition-transform duration-200 will-change-transform hover:scale-[1.03] h-full flex flex-col">
                    <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 md:mb-6 text-vedix-red/80">
                      {service.icon}
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-[1.35] mb-3 sm:mb-4 md:mb-5 text-vedix-white">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base md:text-lg leading-[1.7] text-vedix-gray/80 flex-grow mb-4 sm:mb-5 md:mb-6">
                      {service.description}
                    </p>

                    <div className="mt-auto flex items-center text-vedix-red/70">
                      <span className="text-xs sm:text-sm font-medium">Learn more</span>
                      <svg
                        className="ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
