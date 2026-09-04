import React from 'react';

interface BhumiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  isDark?: boolean;
}

export const BhumiLogo: React.FC<BhumiLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  isDark = false,
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-sm' },
    md: { icon: 34, text: 'text-lg' },
    lg: { icon: 54, text: 'text-2xl' },
    xl: { icon: 84, text: 'text-4xl' },
  };

  const { icon } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon Emblem */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <defs>
          <linearGradient id="bhumiGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="35%" stopColor="#10B981" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="bhumiBodyGradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="40%" stopColor="#15803D" />
            <stop offset="75%" stopColor="#0F3443" />
            <stop offset="100%" stopColor="#001F3F" />
          </linearGradient>

          <linearGradient id="bhumiNavyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A5F" />
            <stop offset="100%" stopColor="#07192F" />
          </linearGradient>
          
          <clipPath id="bShapeClip">
            {/* Standard bold B glyph shape */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 10 H56 C74 10 84 21 84 34 C84 43 78 50 68 53 C80 56 86 64 86 76 C86 90 74 100 55 100 H18 V10 Z M38 28 V43 H53 C60 43 65 39 65 35.5 C65 32 60 28 53 28 H38 Z M38 59 V82 H55 C62 82 67 78 67 70.5 C67 63 62 59 55 59 H38 Z"
            />
          </clipPath>
        </defs>

        {/* Outer Group with B silhouette clipping */}
        <g clipPath="url(#bShapeClip)">
          {/* Main filled B with top-to-bottom green to deep navy gradient */}
          <rect x="0" y="0" width="100" height="100" fill="url(#bhumiBodyGradient)" />

          {/* Lower dark quadrant depth */}
          <path d="M 0 50 L 100 45 L 100 100 L 0 100 Z" fill="url(#bhumiNavyGradient)" opacity="0.88" />

          {/* White stylized negative space X cutout bars that slice across the B */}
          <path
            d="M 12 95 L 68 32 L 82 46 L 26 108 Z"
            fill={isDark ? '#0B1117' : '#FFFFFF'}
          />
          <path
            d="M 68 95 L 14 34 L 28 20 L 82 81 Z"
            fill={isDark ? '#0B1117' : '#FFFFFF'}
          />

          {/* Top highlight glow */}
          <ellipse cx="50" cy="18" rx="35" ry="18" fill="url(#bhumiGreenGradient)" opacity="0.35" />
        </g>
      </svg>

      {/* Optional Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight font-bold font-sans">
            <span
              className={`text-xl tracking-tight transition-colors ${
                isDark ? 'text-white' : 'text-[#0F1D2B]'
              }`}
            >
              bhumi
            </span>
            <span className="text-xl text-[#10B981] font-extrabold ml-0.5">
              x
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
