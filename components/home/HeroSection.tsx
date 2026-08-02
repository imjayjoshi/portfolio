"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ModernButton } from "@/components/ui/ModernButton";
import { HeroGrid } from "./HeroGrid";
import { MagneticLetters } from "@/components/ui/MagneticLetters";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

const buttonStaggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const gsapDone = useRef(false);

  useEffect(() => {
    if (!contentRef.current || gsapDone.current) return;
    registerGsapPlugins();
    gsapDone.current = true;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-hero-tagline]", { opacity: 0, y: 20, duration: 0.7 })
      .from("[data-hero-sub]", { opacity: 0, y: 24, duration: 0.8 }, "-=0.35")
      .from("[data-hero-cta] > *", { opacity: 0, y: 20, stagger: 0.15, duration: 0.7 }, "-=0.4")
      .from("[data-hero-scroll]", { opacity: 0, duration: 0.6 }, "-=0.2");
  }, []);

  const handleScrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <HeroGrid />

      <div
        className="absolute top-0 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-56 h-56 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      />

      <div
        ref={contentRef}
        className="container-main relative z-10 text-center px-4 sm:px-6"
      >
        <div data-hero-tagline className="flex flex-col items-center mb-4 sm:mb-6">
          <p className="text-[11px] md:text-sm text-white/40 font-mono tracking-[0.3em] uppercase mb-1">
            Jay Joshi
          </p>
          <div className="flex items-center gap-4">
            <div
              className="h-[1px] w-8"
              style={{ background: "linear-gradient(90deg, transparent, #7c3aed)" }}
            />
            <span className="text-[10px] md:text-[11px] text-accent font-mono tracking-widest uppercase">
              Full Stack Developer • MERN • AI
            </span>
            <div
              className="h-[1px] w-8"
              style={{ background: "linear-gradient(90deg, #06b6d4, transparent)" }}
            />
          </div>
        </div>

        <MagneticLetters
          text={`I Build Scalable\nDigital Products`}
          as="h1"
          strength={0.5}
          radius={90}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 sm:mb-6 leading-[1.05] text-white"
        />

        <p
          data-hero-sub
          className="text-base sm:text-lg lg:text-xl text-white/50 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2 font-light"
        >
          Freelance-ready full stack developer — performance, AI integration, and products
          built for real users.
        </p>

        <motion.div
          data-hero-cta
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
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
              onClick={() => (window.location.href = "/hire")}
              variant="outline"
              className="w-full sm:w-auto min-w-[180px]"
            >
              Hire me
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
              className="w-full sm:w-auto min-w-[160px]"
            >
              Resume
            </ModernButton>
          </motion.div>
        </motion.div>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none"
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-[1px] h-12"
            style={{ background: "linear-gradient(to bottom, #7c3aed60, transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
};
