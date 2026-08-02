"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

interface ModernButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  bold?: boolean;
  variant?: "gradient" | "outline";
}

export const ModernButton = ({
  children,
  className,
  showArrow = false,
  bold = false,
  variant = "gradient",
  ...props
}: ModernButtonProps) => {
  return (
    <Magnetic strength={0.2} radius={100}>
      <motion.button
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium text-sm transition-shadow duration-300",
          variant === "gradient"
            ? "text-white shadow-[0_0_20px_#7c3aed30]"
            : "border border-[#7c3aed50] text-[#a78bfa] hover:border-[#7c3aed] hover:shadow-[0_0_16px_#7c3aed20]",
          bold ? "font-bold" : "font-medium",
          className,
        )}
        style={
          variant === "gradient"
            ? { background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }
            : { background: "transparent" }
        }
        {...props}
      >
        <span>{children}</span>
        {showArrow && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </motion.button>
    </Magnetic>
  );
};
