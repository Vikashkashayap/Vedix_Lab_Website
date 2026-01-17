import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export const useParallax = <T extends HTMLElement = HTMLElement>(options: UseParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', disabled = false } = options;
  const [offset, setOffset] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate parallax offset based on element position relative to viewport
      const scrollProgress = (scrollTop - elementTop + windowHeight) / (windowHeight + elementHeight);
      const parallaxOffset = (scrollProgress - 0.5) * speed * 100;

      setOffset(direction === 'up' ? -parallaxOffset : parallaxOffset);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed, direction, disabled]);

  return { ref, offset };
};
