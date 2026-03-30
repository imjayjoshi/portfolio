"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioStore } from "@/store/portfolioStore";
import { ModernButton } from "@/components/ui/ModernButton";
import { HeroGrid } from "./HeroGrid";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const subtextVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonStaggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const HeroSection = () => {
  const { data } = usePortfolioStore();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const handleScrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="min-h-[70vh] md:min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-[#0B0C0F]"
    >
      <HeroGrid />

      <motion.div
        className="container-main relative z-10 text-center px-4 sm:px-6 pt-20 sm:pt-24 md:pt-0"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <motion.p
            className="text-[11px] md:text-sm text-white/40 font-mono tracking-[0.3em] uppercase mb-1"
            variants={fadeUpVariant}
          >
            Jay Joshi
          </motion.p>
          <motion.div className="flex items-center gap-4" variants={fadeUpVariant}>
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-accent/50" />
            <span className="text-[10px] md:text-[11px] text-accent font-mono tracking-widest uppercase">
              Full Stack Developer • MERN • AI
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-accent/50" />
          </motion.div>
        </div>

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 sm:mb-8 leading-[1.05] text-white"
          style={{ fontFamily: "'Raleway', sans-serif" }}
          variants={fadeUpVariant}
        >
          I Build Scalable <br className="hidden md:block" /> Digital Products
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg lg:text-xl text-white/50 max-w-2xl mx-auto mb-12 sm:mb-14 md:mb-16 leading-relaxed px-2 font-light"
          variants={subtextVariant}
        >
          Focused on performance, AI integration, and real-world impact.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
          <motion.div variants={buttonStaggerVariants}>
            <ModernButton
              onClick={handleScrollToProjects}
              showArrow
              className="w-full sm:w-auto min-w-[180px]"
            >
              View Work
            </ModernButton>
          </motion.div>

          <motion.div variants={buttonStaggerVariants}>
            <ModernButton
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1fxboKbaALo1_2bfdnPnY1_y4vZ8rv1xK/view?usp=sharing",
                  "_blank",
                )
              }
              className="w-full sm:w-auto min-w-[180px]"
            >
              Resume
            </ModernButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
