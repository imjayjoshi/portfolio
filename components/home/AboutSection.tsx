"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

export const AboutSection = () => {
  const { ref, isRevealed } = useReveal();

  return (
    <section ref={ref} className="section-padding relative" id="about">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-main relative">
        <div
          className={`max-w-3xl mx-auto text-center reveal ${
            isRevealed ? "revealed" : ""
          }`}
        >
          <motion.span
            className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
            This is how I <span className="gradient-text">think</span>
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              I'm a{" "}
              <span className="text-foreground font-medium">
                Full Stack Developer
              </span>{" "}
              who enjoys building complete products — from clean UI to scalable
              backend systems.
            </p>
            <p>
              I focus on{" "}
              <span className="text-foreground font-medium">
                MERN stack applications
              </span>
              , AI-powered features, and performance-driven architecture that
              solves real problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
