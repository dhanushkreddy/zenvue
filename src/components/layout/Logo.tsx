export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AdGram Logo"
    >
      <defs>
        <linearGradient
          id="logoGradient"
          x1="4"
          y1="4"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--primary))" />
          <stop offset="1" stopColor="#A020F0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#logoGradient)" strokeWidth="2.5" />
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="url(#logoGradient)" strokeWidth="2.5" />
      <circle cx="17" cy="7" r="1.5" fill="url(#logoGradient)" />
    </svg>
  );
}
