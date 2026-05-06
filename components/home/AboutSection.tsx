"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HeroGrid } from "./HeroGrid";

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-padding relative px-4 sm:px-6"
      id="about"
    >
      <HeroGrid />
      <div className="container-main relative px-2 sm:px-0">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Label with line animation */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            variants={itemVariants}
          >
            <motion.span
              className="h-[1px] bg-gradient-to-r from-transparent to-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span className="text-sm font-medium text-accent uppercase tracking-[0.3em]">
              About Me
            </span>
            <motion.span
              className="h-[1px] bg-gradient-to-l from-transparent to-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Heading with perspective reveal */}
          <motion.div
            className="overflow-hidden mb-6 sm:mb-8 md:mb-10"
            style={{ perspective: "1000px" }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
              variants={textRevealVariants}
            >
              This is how I{" "}
              <motion.span
                className="gradient-text inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                think
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Paragraphs with stagger */}
          <motion.div
            className="space-y-4 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            variants={containerVariants}
          >
            <motion.p variants={itemVariants}>
              I'm a{" "}
              <motion.span
                className="text-foreground font-medium relative inline-block"
                whileInView={{
                  background: [
                    "linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent)) 0%)",
                    "linear-gradient(90deg, hsl(var(--accent)) 100%, transparent 100%)",
                  ],
                  backgroundClip: "text",
                }}
              >
                Full Stack Developer
              </motion.span>{" "}
              who enjoys building complete products from clean UI to scalable
              backend systems.
            </motion.p>

            <motion.p variants={itemVariants}>
              I focus on{" "}
              <span className="text-foreground font-medium">
                MERN stack applications
              </span>
              , AI-powered features, and performance-driven architecture that
              solves real problems.
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          {/* <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full mx-auto flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div className="w-1 h-2 bg-accent rounded-full mt-2" />
            </motion.div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};
