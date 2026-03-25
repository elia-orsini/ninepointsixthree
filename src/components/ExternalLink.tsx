import { ReactNode } from "react";

const ExternalLinkIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      d="M0 6.37598V2.37695C0 1.61562 0.618223 1.00293 1.37402 1.00293H2.87402C3.08113 1.00293 3.24902 1.17082 3.24902 1.37793C3.24887 1.58491 3.08104 1.75293 2.87402 1.75293H1.37402C1.03062 1.75293 0.75 2.03165 0.75 2.37695V6.37598C0.75 6.71938 1.02872 7 1.37402 7H5.37305C5.71645 7 5.99707 6.72128 5.99707 6.37598V4.87598C5.99707 4.66896 6.16509 4.50113 6.37207 4.50098C6.57918 4.50098 6.74707 4.66887 6.74707 4.87598V6.37598C6.74707 7.13731 6.12885 7.75 5.37305 7.75H1.37402C0.612694 7.75 0 7.13178 0 6.37598ZM7.75 2.625C7.75 2.83211 7.58211 3 7.375 3C7.16789 3 7 2.83211 7 2.625V1.28027L4.88867 3.3916C4.74223 3.53805 4.50485 3.53805 4.3584 3.3916C4.21195 3.24515 4.21195 3.00777 4.3584 2.86133L6.46875 0.75H5.125C4.91789 0.75 4.75 0.582107 4.75 0.375C4.75 0.167893 4.91789 0 5.125 0H7.375C7.58211 0 7.75 0.167893 7.75 0.375V2.625Z"
      fill="currentColor"
    />
  </svg>
);

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className = "" }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-x-0.5 text-[#8E8E8E] underline ${className}`.trim()}
    >
      {children}
      <ExternalLinkIcon />
    </a>
  );
}
