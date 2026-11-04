import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'navy';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'navy', 
  showTagline = false, 
  size = 'md',
  className = '' 
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern Architectural & Connected Network Mark */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-lg flex items-center justify-center shadow-sm overflow-hidden bg-gradient-to-br from-[#0B3D91] to-[#082a66]`}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]"></div>
        
        {/* Modern geometric building & connected node icon */}
        <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6 z-10">
          {/* Real estate structure */}
          <path d="M6 28V15L18 6L30 15V28H6Z" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 28V20H22V28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Interconnected Golden nodes symbolizing referral sharing */}
          <circle cx="18" cy="14" r="3.2" fill="#F4B400" />
          <line x1="18" y1="14" x2="10" y2="20" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="14" x2="26" y2="20" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="20" r="2.2" fill="#F4B400" />
          <circle cx="26" cy="20" r="2.2" fill="#F4B400" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-tight font-extrabold leading-none">
          <span className={`${textSizes[size]} ${isLight ? 'text-white' : 'text-[#0B3D91]'}`}>
            BIZ
          </span>
          <span className={`${textSizes[size]} text-[#F4B400]`}>
            SHARE
          </span>
        </div>
        {showTagline && (
          <span className={`font-medium tracking-wide uppercase mt-0.5 ${taglineSizes[size]} ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            A Platform of Mutual Working
          </span>
        )}
      </div>
    </div>
  );
};
