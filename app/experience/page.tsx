"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useReveal } from "@/hooks/useReveal";
import { Briefcase, MapPin, Calendar } from "lucide-react";

// Lazy load WebGL scene
const ExperienceScene = dynamic(
  () =>
    import("@/components/three/ExperienceScene").then((mod) => ({
      default: mod.ExperienceScene,
    })),
  { ssr: false, loading: () => null }
);

export default function ExperiencePage() {
  const { data } = usePortfolioStore();
  const { ref: headerRef, isRevealed: headerRevealed } = useReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll progress for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth spring for the progress line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Mobile detection
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate which experience is active based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!experienceRefs.current.length) return;

      const windowCenter = window.innerHeight / 2;
      let newActiveIndex = 0;

      experienceRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;

          if (elementCenter < windowCenter + 100) {
            newActiveIndex = index;
          }
        }
      });

      setActiveIndex(newActiveIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.experiences.length]);

  return (
    <Layout>
      <PageTransition>
        <div className="relative min-h-screen">
          {/* WebGL Background */}
          <div className="fixed inset-0 z-0">
            {!isMobile && (
              <Suspense fallback={null}>
                <ExperienceScene />
              </Suspense>
            )}
            {isMobile && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-indigo-900/5" />
            )}
          </div>

          <section className="section-padding relative z-10">
            <div className="container-main">
              {/* Header */}
              <div
                ref={headerRef}
                className={`text-center md:text-left reveal ${
                  headerRevealed ? "revealed" : ""
                }`}
              >
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <Briefcase size={28} className="text-accent" />
                  <h1 className="font-display text-4xl md:text-6xl font-bold">
                    Work <span className="gradient-text">Experience</span>
                  </h1>
                </div>
                <p className="text-muted-foreground mb-16 max-w-2xl mx-auto md:mx-0 text-lg">
                  My professional journey and the impact I've made along the
                  way.
                </p>
              </div>

              {/* Timeline */}
              <div ref={containerRef} className="relative">
                {/* Static timeline line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/30 md:-translate-x-1/2" />

                {/* Animated progress line */}
                <motion.div
                  className="absolute left-6 md:left-1/2 top-0 w-px bg-accent md:-translate-x-1/2 origin-top"
                  style={{
                    scaleY: smoothProgress,
                    height: "100%",
                  }}
                />

                {data.experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    ref={(el) => {
                      experienceRefs.current[index] = el;
                    }}
                    className={`relative mb-16 md:w-1/2 pl-16 md:pl-0 ${
                      index % 2 === 0
                        ? "md:pr-16 md:ml-0"
                        : "md:pl-16 md:ml-auto"
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className={`absolute top-6 w-3 h-3 rounded-full border-2 border-background transition-colors duration-300 ${
                        index % 2 === 0
                          ? "left-[22px] md:left-auto md:right-0 md:translate-x-1/2"
                          : "left-[22px] md:left-0 md:-translate-x-1/2"
                      } ${activeIndex >= index ? "bg-accent" : "bg-muted"}`}
                      style={{ marginLeft: "-6px" }}
                      animate={{
                        scale: activeIndex === index ? 1.4 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />

                    <motion.div
                      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
                        activeIndex === index ? "ring-1 ring-accent/30" : ""
                      }`}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {/* Period badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={14} className="text-accent" />
                        <span className="text-sm text-accent font-medium">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-semibold mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-foreground/80 text-sm font-medium mb-1">
                        {exp.company}
                      </p>

                      {exp.location && (
                        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-4">
                          <MapPin size={12} />
                          {exp.location}
                        </div>
                      )}

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="text-muted-foreground text-sm mb-5 space-y-2">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-2.5 py-1 text-xs bg-accent/10 text-accent rounded-lg border border-accent/20"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Education Section */}
              <div className="mt-24">
                <motion.h2
                  className="font-display text-3xl md:text-4xl font-bold mb-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="gradient-text">Education</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {data.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="glass-card rounded-2xl p-6"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                    >
                      <span className="text-sm text-accent font-medium">
                        {edu.period}
                      </span>
                      <h3 className="font-display text-lg font-semibold mt-2 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {edu.institution}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm">
                        {edu.grade}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </Layout>
  );
}
