export function Logo({ className }: { className?: string }) {
    return (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Zenvue Logo"
      >
        <path d="M20 20 L80 20 L20 80 L80 80" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  