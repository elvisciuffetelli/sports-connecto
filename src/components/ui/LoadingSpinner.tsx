
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'primary',
  className = '' 
}) => {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClass = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    white: 'border-white'
  };

  return (
    <div className={`${className} flex justify-center items-center`}>
      <div 
        className={`loading-spinner ${sizeClass[size]} rounded-full border-4 border-t-transparent ${colorClass[color]}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
