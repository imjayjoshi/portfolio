"use client";

import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { usePortfolioStore } from "@/store/portfolioStore";

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
        }
      );
    }
  }, []);

  const nameChars = data.name.split("").map((char, index) => (
    <span key={index} className="char inline-block" style={{ opacity: 0 }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[800px] sm:h-[600px] bg-accent/5 rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      {/* Content overlay */}
      <div className="container-main relative z-10 text-center px-4 sm:px-6 pt-20 sm:pt-24 md:pt-0">
        {/* Identity line */}
        <motion.p
          className="text-base sm:text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm
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
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link
            href="/projects"
            className="btn-primary group w-full sm:w-auto text-sm sm:text-base"
          >
            View Projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://docs.google.com/document/d/19ok9A6In6SKKw_XnyxSmgBTaz6-uiBpp8YJowNIvsRM/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto text-sm sm:text-base"
          >
            <ExternalLink className="mr-2 w-4 h-4" />
            Resume
          </a>

          <Link
            href="/contact"
            className="btn-secondary w-full sm:w-auto text-sm sm:text-base"
          >
            <Mail className="mr-2 w-4 h-4" />
            Contact Me
          </Link>
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
