"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ParticleTransitionProps {
  active: boolean;
  onComplete?: () => void;
  direction?: "in" | "out";
}

export const ParticleTransition = ({
  active,
  onComplete,
  direction = "in",
}: ParticleTransitionProps) => {
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
    }, 600);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active && !isVisible) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none bg-[#0b0d10]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Center glow effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="w-32 h-32 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ParticleTransition;
