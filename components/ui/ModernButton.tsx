"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  showArrow?: boolean;
}

export const ModernButton = ({
  children,
  className,
  variant = "default",
  showArrow = false,
  ...props
}: ModernButtonProps) => {
  return (
    <button
      className={cn(
        "group relative flex items-center justify-center px-8 py-4 rounded-full border-[1.5px] border-blue-500/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/5 overflow-hidden active:scale-95 shadow-[0_0_0_1px_inset_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
        className
      )}
      {...props}
    >
      {/* Smooth Fill Animation */}
      <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-3">
        <span className="text-base font-bold tracking-wide text-blue-500 group-hover:text-blue-400 transition-colors">
          {children}
        </span>
        {showArrow && (
          <span className="inline-block text-blue-500 group-hover:text-blue-400 transition-all">
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
  );
};
