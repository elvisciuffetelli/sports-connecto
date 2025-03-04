
import React, { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  animation?: 'fade-in' | 'slide-in-right' | 'scale-in' | 'float';
  className?: string;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  delay = 0,
  animation = 'fade-in',
  className = ''
}) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      case 'scale-in':
        return 'animate-scale-in';
      case 'float':
        return 'animate-float';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={`${getAnimationClass()} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default MotionWrapper;
