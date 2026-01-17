import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useAudioFeedback } from '../hooks/useAudioFeedback'

interface Product {
  id: string
  title: string
  description: string
  features: string[]
  image: string
  category: 'agent' | 'tool' | 'platform'
  cta: 'View Demo' | 'Buy Now' | 'Coming Soon'
}

const Products = () => {
  const { clickSound, hoverSound } = useAudioFeedback()

  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 })
  const productsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 })

  const products: Product[] = [
    {
      id: 'ai-customer-agent',
      title: 'AI Customer Support Agent',
      description:
        'Intelligent customer support agent that handles inquiries, resolves issues, and learns from every interaction.',
      features: ['24/7 Support', 'Multi-language', 'CRM Integration', 'Analytics'],
      image:
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80',
      category: 'agent',
      cta: 'Buy Now',
    },
    {
      id: 'upsc-ai-coach',
      title: 'UPSC AI Coach',
      description:
        'Personalized AI-powered coaching system for UPSC preparation with adaptive learning and analytics.',
      features: ['Adaptive Learning', 'Mock Tests', 'Study Analytics'],
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      category: 'tool',
      cta: 'View Demo',
    },
    {
      id: 'ai-content-generator',
      title: 'AI Content Generator',
      description:
        'Advanced content creation tool powered by GPT models for blogs, marketing, and documentation.',
      features: ['SEO Ready', 'Brand Voice', 'Bulk Generation'],
      image:
        'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&q=80',
      category: 'tool',
      cta: 'View Demo',
    },
  ]

  const getCategoryColor = (category: Product['category']) => {
    switch (category) {
      case 'agent':
        return 'text-blue-400'
      case 'tool':
        return 'text-green-400'
      case 'platform':
        return 'text-purple-400'
      default:
        return 'text-vedix-red'
    }
  }

  const getCtaButton = (cta: Product['cta']) => {
    if (cta === 'Coming Soon') {
      return (
        <button className="btn-outline-red h-11 px-6 text-sm font-semibold opacity-60 cursor-not-allowed">
          Coming Soon
        </button>
      )
    }

    return (
      <button
        onClick={clickSound}
        onMouseEnter={hoverSound}
        className="btn-red h-11 px-6 text-sm font-semibold group relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center">
          {cta}
          <svg
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </button>
    )
  }

  return (
    <section
      id="products"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ================= HEADER ================= */}
        <div ref={headerAnimation.ref} className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-glass text-xs sm:text-sm font-medium text-vedix-red mb-4 sm:mb-5 md:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vedix-red rounded-full mr-2 sm:mr-3 animate-apple-pulse" />
            Our AI Products
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
            Ready-to-Use <span className="text-vedix-red">AI Solutions</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-vedix-white/70 leading-[1.7] px-4 sm:px-0">
            Discover our portfolio of AI products designed to solve real business
            challenges.
          </p>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div
          ref={productsAnimation.ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-hidden"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* CARD */}
              <div className="apple-glass rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 h-full overflow-hidden">
                {/* SCALE INNER ONLY */}
                <div className="h-full flex flex-col transform transition-transform duration-200 hover:scale-[1.03] will-change-transform">
                  {/* IMAGE */}
                  <div className="mb-4 sm:mb-5 md:mb-6 relative overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <div
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-1 rounded-full text-xs font-medium bg-vedix-card/80 backdrop-blur-sm ${getCategoryColor(
                        product.category
                      )}`}
                    >
                      {product.category.toUpperCase()}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 mb-4 sm:mb-5 md:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-vedix-white hover:text-vedix-red transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-sm sm:text-base md:text-lg text-vedix-gray/80 mb-3 sm:mb-4 leading-[1.7]">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {product.features.slice(0, 2).map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 sm:py-1 bg-vedix-red/10 text-vedix-red text-xs rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                      {product.features.length > 2 && (
                        <span className="px-2 py-0.5 sm:py-1 bg-vedix-gray/10 text-vedix-gray text-xs rounded-full">
                          +{product.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">{getCtaButton(product.cta)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center mt-12 sm:mt-14 md:mt-16 lg:mt-20">
          <p className="text-sm sm:text-base md:text-lg text-vedix-gray/70 mb-4 sm:mb-5 md:mb-6 leading-[1.7] px-4 sm:px-0">
            Need a custom AI solution? Let's build something extraordinary.
          </p>
          <button
            onClick={clickSound}
            onMouseEnter={hoverSound}
            className="btn-outline-red h-11 px-6 text-sm font-semibold group"
          >
            <span className="flex items-center">
              Discuss Custom Solution
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Products
