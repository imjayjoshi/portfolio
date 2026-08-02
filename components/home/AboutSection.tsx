"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HeroGrid } from "./HeroGrid";
import { SectionDivider } from "@/components/ui/SectionDivider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1] },
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
      <SectionDivider label="About Me" />
      <HeroGrid />
      <div className="container-main relative px-2 sm:px-0 -mt-2 md:-mt-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="overflow-hidden mb-8 sm:mb-10 md:mb-12"
            style={{ perspective: "1000px" }}
            variants={itemVariants}
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
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                think
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            variants={containerVariants}
            data-gsap-reveal
          >
            <motion.p variants={itemVariants}>
              I&apos;m a{" "}
              <span className="text-foreground font-medium">Full Stack Developer</span> who
              enjoys building complete products from clean UI to scalable backend systems.
            </motion.p>
            <motion.p variants={itemVariants}>
              I focus on{" "}
              <span className="text-foreground font-medium">MERN stack applications</span>,
              AI-powered features, and performance-driven architecture that solves real
              problems — for employers and freelance clients alike.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
