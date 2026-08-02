"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderGlowColor?: string;
  intensity?: number;
  showBorder?: boolean;
}

export const SpotlightCard = ({
  children,
  className = "",
  glowColor = "rgba(124, 58, 237, 0.12)",
  borderGlowColor = "rgba(124, 58, 237, 0.45)",
  intensity = 400,
  showBorder = true,
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end feel
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Background and border style transitions
  const background = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(${intensity}px circle at ${x}px ${y}px, rgba(124,58,237,0.10), rgba(6,182,212,0.05) 50%, transparent 80%)`,
  );

  const borderBackground = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(${intensity / 2}px circle at ${x}px ${y}px, ${borderGlowColor}, transparent 70%)`
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden group border border-white/5 bg-[#0a0b0f]/80 backdrop-blur-xl ${className}`}
      transition={{ duration: 0.3 }}
    >
      {/* Dynamic Glow Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />

      {/* Dynamic Border Layer */}
      {showBorder && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            padding: "1.5px",
            background: borderBackground,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Content wrapper to stay above background glow */}
      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
};
