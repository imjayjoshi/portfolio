"use client";

import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { usePortfolioStore } from "@/store/portfolioStore";
import { ModernButton } from "@/components/ui/ModernButton";

export const HeroSection = () => {
  const { data } = usePortfolioStore();
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.5,
        },
      );
    }
  }, []);

  const nameChars = data.name.split("").map((char, index) => (
    <span key={index} className="char inline-block py-1" style={{ opacity: 0 }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  // Navigation handlers
  const handleScrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="min-h-[70vh] md:min-h-[85vh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Content overlay */}
      <div className="container-main relative z-10 text-center px-4 sm:px-6 pt-20 sm:pt-24 md:pt-0">
        {/* Identity line */}
        <motion.p
          className="text-base sm:text-lg text-accent font-mono tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hey, I'm
        </motion.p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-4 sm:mb-6"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {nameChars}
        </h1>

        {/* Role */}
        <motion.h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-6 sm:mb-8 flex flex-wrap justify-center gap-1 sm:gap-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {data.roles.map((role, index) => (
            <React.Fragment key={role}>
              {index > 0 && (
                <span className="text-muted-foreground mx-1 sm:mx-2 md:mx-3">
                  •
                </span>
              )}
              <span className="gradient-text">{role}</span>
            </React.Fragment>
          ))}
        </motion.h2>

        {/* Bio */}
        <motion.p
          className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {data.summary}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <ModernButton
            onClick={handleScrollToProjects}
            showArrow
            className="w-full sm:w-auto min-w-[180px]"
          >
            View Projects
          </ModernButton>

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

          {/* <ModernButton
            onClick={handleScrollToContact}
            className="w-full sm:w-auto min-w-[180px]"
          >
            Contact Me
          </ModernButton> */}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
