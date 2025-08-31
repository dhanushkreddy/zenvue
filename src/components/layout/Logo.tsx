export function Logo({ className }: { className?: string }) {
    return (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Zenvue Logo"
      >
        <defs>
          <linearGradient
            id="logoGradient"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="hsl(var(--primary))" />
            <stop offset="1" stopColor="hsl(var(--primary) / 0.5)" />
          </linearGradient>
        </defs>
        <path
          d="M20 20 L40 80 L60 20"
          stroke="url(#logoGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 80 L80 20"
          stroke="url(#logoGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  