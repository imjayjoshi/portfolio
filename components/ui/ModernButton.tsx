"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  showArrow?: boolean;
  bold?: boolean;
}

export const ModernButton = ({
  children,
  className,
  variant = "default",
  showArrow = false,
  bold = false,
  ...props
}: ModernButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!buttonRef.current || !fillRef.current) return;

    const button = buttonRef.current;
    const fill = fillRef.current;

    const handleMouseEnter = (e: MouseEvent) => {
      const { left, top } = button.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Reset and position fill (Force centered on entry point)
      gsap.set(fill, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 1,
      });

      // Expand fill (Majestic, slow-motion liquid expansion)
      gsap.to(fill, {
        scale: 6,
        duration: 1.8,
        ease: "power2.out",
      });

      // Switch colors to white (Instant feel for legibility)
      if (textRef.current) gsap.to(textRef.current, { color: "#ffffff", duration: 0.2, ease: "linear" });
      if (arrowRef.current) gsap.to(arrowRef.current, { color: "#ffffff", duration: 0.2, ease: "linear" });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const { left, top } = button.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Contract fill towards exit point
      gsap.to(fill, {
        x,
        y,
        scale: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => { gsap.set(fill, { opacity: 0 }); },
      });

      // Reset colors to primary blue
      if (textRef.current) gsap.to(textRef.current, { color: "#3b82f6", duration: 0.2, ease: "linear" });
      if (arrowRef.current) gsap.to(arrowRef.current, { color: "#3b82f6", duration: 0.2, ease: "linear" });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Magnetic strength={0.2} radius={100}>
      <button
        ref={buttonRef}
        className={cn(
          "group relative flex items-center justify-center px-8 py-4 rounded-full border-[1.5px] border-blue-500/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-blue-400/60 overflow-hidden active:scale-95 shadow-[0_0_0_1px_inset_rgba(59,130,246,0.1)]",
          className
        )}
        {...props}
      >
        {/* GSAP Liquid Fill Layer */}
        <span
          ref={fillRef}
          className="absolute top-0 left-0 w-[150px] h-[150px] bg-blue-600 rounded-full pointer-events-none opacity-0 z-0"
        />

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-3">
          <span
            ref={textRef}
            className={cn(
              "text-base tracking-wide text-blue-500 pointer-events-none",
              bold ? "font-bold" : "font-medium"
            )}
          >
            {children}
          </span>
          {showArrow && (
            <span
              ref={arrowRef}
              className="inline-block text-blue-500 pointer-events-none"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </span>
      </button>
    </Magnetic>
  );
};
