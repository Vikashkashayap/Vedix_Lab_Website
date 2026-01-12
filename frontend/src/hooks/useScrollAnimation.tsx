import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  delay?: number;
  disabled?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    animationClass = 'animate-apple-fade-in',
    delay = 0,
    disabled = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    // Add will-change for performance optimization
    element.style.willChange = 'transform, opacity';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Use requestAnimationFrame for smooth animation
          requestAnimationFrame(() => {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
                setHasAnimated(true);
                element.classList.add(animationClass);
                // Remove will-change after animation completes
                setTimeout(() => {
                  element.style.willChange = 'auto';
                }, 1000);
              }, delay);
            } else {
              setIsVisible(true);
              setHasAnimated(true);
              element.classList.add(animationClass);
              setTimeout(() => {
                element.style.willChange = 'auto';
              }, 1000);
            }
          });
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      element.style.willChange = 'auto';
    };
  }, [threshold, rootMargin, animationClass, delay, disabled, hasAnimated]);

  return { ref, isVisible, hasAnimated };
};
