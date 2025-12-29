"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(210 100% 60%), hsl(230 80% 55%))",
        boxShadow: "0 0 10px hsl(210 100% 60% / 0.5)",
      }}
    />
  );
};
