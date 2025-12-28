"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export const Tilt3DCard = ({
  children,
  className = "",
  glowColor = "hsl(var(--accent))",
  intensity = 10,
}: Tilt3DCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      setTransform({ rotateX, rotateY });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        y: isHovering ? -8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${
            transform.rotateY * 10 + 50
          }% ${
            transform.rotateX * -10 + 50
          }%, ${glowColor} / 0.15, transparent 50%)`,
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};
