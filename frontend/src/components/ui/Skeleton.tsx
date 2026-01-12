import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'circle';
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'default',
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-vedix-card/50 via-vedix-red/10 to-vedix-card/50 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]';

  if (variant === 'card') {
    return (
      <div className={`glass rounded-2xl p-8 space-y-4 ${className}`}>
        <div className={`${baseClasses} h-48 rounded-lg`}></div>
        <div className={`${baseClasses} h-8 rounded w-3/4`}></div>
        <div className={`${baseClasses} h-4 rounded w-full`}></div>
        <div className={`${baseClasses} h-4 rounded w-2/3`}></div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} h-4 rounded`}
            style={{ width: index === lines - 1 ? '60%' : '100%' }}
          ></div>
        ))}
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div className={`${baseClasses} rounded-full ${className}`}></div>
    );
  }

  return <div className={`${baseClasses} rounded ${className}`}></div>;
};

export default Skeleton;
