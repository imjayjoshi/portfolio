"use client";

interface SectionDividerProps {
  label?: string;
  className?: string;
}

/** Centered section label with gradient lines — replaces raw gradient-line + duplicate label rows */
export function SectionDivider({ label, className = "" }: SectionDividerProps) {
  if (!label) {
    return (
      <div className={`section-divider-wrap section-divider-wrap--line-only ${className}`}>
        <div className="gradient-line w-full max-w-4xl mx-auto" data-gsap-line />
      </div>
    );
  }

  return (
    <div className={`section-divider-wrap ${className}`}>
      <span className="section-divider-line section-divider-line--left" data-gsap-line />
      <span className="section-divider-label">{label}</span>
      <span className="section-divider-line section-divider-line--right" data-gsap-line />
    </div>
  );
}
