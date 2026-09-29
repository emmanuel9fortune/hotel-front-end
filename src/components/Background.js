export default function WorldcrestBackground() {
  return (
      <div className="wc-background">
        <div className="wc-gradient" />
        <div className="wc-stars" />

        {/* Glow Arc */}
        <svg
          className="wc-glow"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="goldGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFD08A" />
              <stop offset="50%" stopColor="#FFB84D" />
              <stop offset="100%" stopColor="#FF9F1A" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main glow line */}
          <path
            d="M -200 420 Q 600 120 1400 280"
            stroke="url(#goldGlow)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#glow)"
          />

          {/* Glow dots */}
          <circle cx="200" cy="350" r="4" fill="#FFD08A" filter="url(#glow)" />
          <circle cx="420" cy="260" r="3" fill="#FFB84D" filter="url(#glow)" />
          <circle cx="680" cy="210" r="4" fill="#FFD08A" filter="url(#glow)" />
          <circle cx="950" cy="240" r="3" fill="#FFB84D" filter="url(#glow)" />
        </svg>
      </div>

  );
}
