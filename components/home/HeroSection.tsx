"use client";

import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { usePortfolioStore } from "@/store/portfolioStore";

// Lazy load WebGL scene
const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((mod) => ({
      default: mod.HeroScene,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

export const HeroSection = () => {
  const { data } = usePortfolioStore();
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll to 0-1 for WebGL
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", setScrollValue);
    return () => unsubscribe();
  }, [scrollProgress]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
      {/* WebGL Scene - Desktop only */}
      {!isMobile && (
        <HeroScene scrollProgress={scrollValue} mousePosition={mousePosition} />
      )}

      {/* Mobile gradient fallback */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent -z-10" />
      )}

      {/* Content overlay */}
      <div className="container-main relative z-10 text-center px-6 pt-18 md:pt-0">
        {/* Identity line */}
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mb-6"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {nameChars}
        </h1>

        {/* Role */}
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {data.roles.map((role, index) => (
            <React.Fragment key={role}>
              {index > 0 && (
                <span className="text-muted-foreground mx-3">•</span>
              )}
              <span className="gradient-text">{role}</span>
            </React.Fragment>
          ))}
        </motion.h2>

        {/* Bio */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {data.summary}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link href="/projects" className="btn-primary group">
            View Projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a href="/resume.pdf" download className="btn-secondary">
            <Download className="mr-2 w-4 h-4" />
            Download Resume
          </a>

          <Link href="/contact" className="btn-secondary">
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
