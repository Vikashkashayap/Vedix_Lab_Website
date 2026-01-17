import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'vedix-red' | 'vedix-red-light' | 'gradient';
  className?: string;
  showPercentage?: boolean;
  duration?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'vedix-red',
  className = '',
  showPercentage = true,
  duration = 1500
}) => {
  const [progress, setProgress] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (isIntersecting) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

        setProgress(easeOutCubic * percentage);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isIntersecting, percentage, duration]);

  const getColorClasses = () => {
    switch (color) {
      case 'vedix-red-light':
        return 'bg-vedix-red-light';
      case 'gradient':
        return 'bg-gradient-to-r from-vedix-red to-vedix-red-light';
      default:
        return 'bg-vedix-red';
    }
  };

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-mono text-vedix-red">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-vedix-card/50 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${getColorClasses()} transition-all duration-300 ease-out relative`}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
