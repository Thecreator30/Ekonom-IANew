import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white';
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  showText = true, 
  size = 'md',
  variant = 'color'
}) => {
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-4xl"
  };

  // Gradient definitions for SVG
  const gradientId = "logo_gradient_" + Math.random().toString(36).substr(2, 9);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
           <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" /> {/* Primary Blue */}
              <stop offset="1" stopColor="#D946EF" /> {/* Secondary Purple */}
            </linearGradient>
            <linearGradient id={`${gradientId}_dark`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F3F4F6" />
            </linearGradient>
          </defs>

          {/* Main Background Shape - Squircle */}
          <rect 
            width="40" 
            height="40" 
            rx="12" 
            fill={variant === 'white' ? 'white' : `url(#${gradientId})`} 
            className="transition-all"
          />
          
          {/* Abstract E + Graph + Spark symbol */}
          {/* A path representing an upward trend that creates an 'E' shape and ends in a spark */}
          <path 
            d="M12 14H20M12 20H18M12 26H22L26 22" 
            stroke={variant === 'white' ? 'url(#' + gradientId + ')' : 'white'} 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* The AI Spark (Star) at the top right of the graph */}
          <path 
            d="M27 11L28.5 14L30 11L28.5 8L27 11Z" 
            fill={variant === 'white' ? 'url(#' + gradientId + ')' : 'white'} 
          />
          <path 
            d="M22 8L23 10L24 8L23 6L22 8Z" 
            fill={variant === 'white' ? 'url(#' + gradientId + ')' : 'white'} 
            fillOpacity="0.8"
          />
        </svg>
      </div>

      {/* Text Mark */}
      {showText && (
        <div className={`font-sans font-extrabold tracking-tight leading-none ${textSizeClasses[size]}`}>
          <span className={variant === 'white' ? 'text-white' : 'text-gray-900 dark:text-white'}>
            Ekonom
          </span>
          <span className={variant === 'white' ? 'text-white opacity-90' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'}>
            -IA
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;