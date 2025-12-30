"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlassWipeProps {
  active: boolean;
  onComplete?: () => void;
  direction?: "left" | "right";
}

export const GlassWipe = ({
  active,
  onComplete,
  direction = "left",
}: GlassWipeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // Complete after animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, 300);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active && !isVisible) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Simple fade transition */}
          <motion.div
            className="absolute inset-0 bg-[#0b0d10]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlassWipe;
